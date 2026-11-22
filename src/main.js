import { searchRecipes, getRecipes, addRecipe, deleteRecipe } from "./api.js";
import { displayRecipes } from "./affichage.js";
import { validationName, validationCuisine, validationDifficulty, validationTime } from "./validation.js";

const recipes = document.querySelector("#recipes");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const showAllBtn = document.querySelector("#show-all-btn");
const addRecipeBtn = document.querySelector("#add-recipe-btn");

const recipeForm = document.querySelector("#recipe-form");
const recipeName = document.querySelector("#recipe-name");
const recipeCuisine = document.querySelector("#recipe-cuisine");
const recipeDifficulty = document.querySelector("#recipe-difficulty");
const recipeTime = document.querySelector("#recipe-time");

const nameError = document.querySelector("#name-error");
const cuisineError = document.querySelector("#cuisine-error");
const difficultyError = document.querySelector("#difficulty-error");
const timeError = document.querySelector("#time-error");

const formSuccess = document.querySelector("#form-success");

const loadingMessage = document.querySelector("#loading-message");
const errorMessage = document.querySelector("#error-message");
const retryBtn = document.querySelector("#retry-btn");
const errorContainer = document.querySelector("#error-container");

let recipesData = [];
let isLoaded = false;
let lastRequest = null;

const getErrorMessage = function (error) {
  if (error.response) {
    if (error.response.status === 404) return "Recette introuvable (404)";
    if (error.response.status === 500) return "Erreur du serveur (500)";
    return "Une erreur inattendue est survenue.";
  }
  if (error.request) return "Serveur injoignable. Vérifiez votre connexion";
  return "Une erreur inattendue est survenue.";
};

const showError = function (error) {
  errorMessage.textContent = getErrorMessage(error);
  errorContainer.classList.remove("hidden");
};

const showFormMessage = function (text, isError = false) {
  formSuccess.textContent = text;
  formSuccess.classList.remove("hidden", "text-green-600", "text-red-600");
  formSuccess.classList.add(isError ? "text-red-600" : "text-green-600");
};

const hideFormMessage = function () {
  formSuccess.textContent = "";
  formSuccess.classList.add("hidden");
};

const load = async function (requestFn, isAll = false) {
  lastRequest = () => load(requestFn, isAll);
  loadingMessage.classList.remove("hidden");
  errorContainer.classList.add("hidden");

  try {
    const data = await requestFn();
    if (isAll) {
      recipesData = data;
      isLoaded = true;
    }
    displayRecipes(data);
  } catch (error) {
    showError(error);
  } finally {
    loadingMessage.classList.add("hidden");
  }
};

load(getRecipes, true);

const search = function () {
  const keyword = searchInput.value.trim();
  if (keyword === "") return;
  load(() => searchRecipes(keyword));
};

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  search();
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    search();
  }
});

showAllBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchInput.value = "";
  errorContainer.classList.add("hidden");
  displayRecipes(recipesData);
});

recipeForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!isLoaded) {
    errorMessage.textContent = "Impossible d'ajouter une recette. Veuillez réessayer le chargement";
    errorContainer.classList.remove("hidden");
    return;
  }

  const nameValid = validationName(recipeName.value);
  const cuisineValide = validationCuisine(recipeCuisine.value);
  const difficultyValide = validationDifficulty(recipeDifficulty.value);
  const timeValide = validationTime(recipeTime.value);

  nameError.textContent = nameValid ? "" : "Le nom doit contenir entre 3 et 60 caractères";
  cuisineError.textContent = cuisineValide ? "" : "Veuillez choisir une cuisine";
  difficultyError.textContent = difficultyValide ? "" : "Veuillez choisir une difficulté";
  timeError.textContent = timeValide ? "" : "Le temps doit être un nombre entier entre 1 et 300 minutes";

  if (!nameValid || !cuisineValide || !difficultyValide || !timeValide) return;

  const recipe = {
    name: recipeName.value.trim(),
    cuisine: recipeCuisine.value.trim(),
    difficulty: recipeDifficulty.value,
    prepTimeMinutes: Number(recipeTime.value),
  };

  hideFormMessage();
  addRecipeBtn.disabled = true;

  try {
    const newRecipe = await addRecipe(recipe);
    recipesData.unshift(newRecipe);
    searchInput.value = "";
    displayRecipes(recipesData);
    recipeForm.reset();
    showFormMessage("Recette ajoutée avec succès !");
  } catch (error) {
    console.error(error);
    showFormMessage(getErrorMessage(error), true);
  } finally {
    addRecipeBtn.disabled = false;
  }
});

recipes.addEventListener("click", async (event) => {
  const deleteBtn = event.target.closest(".delete-btn");
  if (!deleteBtn) return;

  if (!isLoaded) {
    errorMessage.textContent = "Impossible de supprimer une recette. Veuillez réessayer le chargement";
    errorContainer.classList.remove("hidden");
    return;
  }

  const id = Number(deleteBtn.dataset.id);
  if (!confirm("Voulez-vous vraiment supprimer cette recette ?")) return;

  deleteBtn.disabled = true;
  hideFormMessage();

  try {
    await deleteRecipe(id);
    recipesData = recipesData.filter((element) => element.id !== id);
    displayRecipes(recipesData);
    showFormMessage("Recette supprimée avec succès !");
  } catch (error) {
    console.error(error);
    showFormMessage(getErrorMessage(error), true);
    deleteBtn.disabled = false;
  }
});

retryBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (lastRequest) lastRequest();
});