import { searchRecipes, getRecipes, addRecipe, deleteRecipe } from "./api.js";
import { displayRecipes } from "./affichage.js";
import {
  validationName,
  validationCuisine,
  validationDifficulty,
  validationTime,
} from "./validation.js";

const recipes = document.querySelector("#recipes");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const showAllBtn = document.querySelector("#show-all-btn");
const addRecipeBtn = document.querySelector("#add-recipe-btn");

// validation
const recipeForm = document.querySelector("#recipe-form");
const recipeName = document.querySelector("#recipe-name");
const recipeCuisine = document.querySelector("#recipe-cuisine");
const recipeDifficulty = document.querySelector("#recipe-difficulty");
const recipeTime = document.querySelector("#recipe-time");
//error
const nameError = document.querySelector("#name-error");
const cuisineError = document.querySelector("#cuisine-error");
const difficultyError = document.querySelector("#difficulty-error");
const timeError = document.querySelector("#time-error");

const formSuccess = document.querySelector("#form-success");

// loading et error mesage

const loadingMessage = document.querySelector("#loading-message");
const errorMessage = document.querySelector("#error-message");
const retryBtn = document.querySelector("#retry-btn");
const errorContainer = document.querySelector("#error-container");

const showErreur = function (error) {
  if (!error.response && error.request) {
    errorMessage.textContent = "Serveur injoignable. Vérifiez votre connexion";
  } else if (error.response) {
    if (error.response.status === 404) {
      errorMessage.textContent = "Recette introuvable (404)";
    } else if (error.response.status === 500) {
      errorMessage.textContent = "Erreur du serveur (500)";
    } else {
      errorMessage.textContent = "Une erreur inattendue est survenue.";
    }
  } else {
    errorMessage.textContent = "Une erreur inattendue est survenue.";
  }
};
let recipesData = [];
let isLoaded = false;

try {
  loadingMessage.classList.remove("hidden");
  
  recipesData = await getRecipes();
  displayRecipes(recipesData);
  errorContainer.classList.add("hidden");
  isLoaded = true;
  
} catch (error) {
  errorContainer.classList.remove("hidden");
  showErreur(error);
} finally {
  loadingMessage.classList.add("hidden");
}

searchBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  if (searchInput.value === "") return;
  loadingMessage.classList.remove("hidden");
  errorContainer.classList.add("hidden");
  
  try {
    const filter = await searchRecipes(searchInput.value);
    displayRecipes(filter);
    errorContainer.classList.add("hidden")

  } catch (error) {
    errorContainer.classList.remove("hidden");
    
    showErreur(error);
  } finally {
    loadingMessage.classList.add("hidden");
  }
});

showAllBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  displayRecipes(recipesData);
});

recipeForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!isLoaded) {
    errorContainer.classList.remove("hidden");
    errorMessage.textContent =
    "Impossible d'ajouter une recette. Veuillez réessayer le chargement";
    
    return;
  }
  const nameValid = validationName(recipeName.value);
  const cuisineValide = validationCuisine(recipeCuisine.value);
  const difficultyValide = validationDifficulty(recipeDifficulty.value);
  const timeValide = validationTime(recipeTime.value);
  
  if (!nameValid) {
    nameError.textContent = "Le nom doit contenir entre 3 et 60 caractères";
  } else {
    nameError.textContent = "";
  }
  if (!cuisineValide) cuisineError.textContent = "Veuillez choisir une cuisine";
  else cuisineError.textContent = "";
  if (!difficultyValide)
    difficultyError.textContent = "Veuillez choisir une difficulté";
  else difficultyError.textContent = "";
  if (!timeValide)
    timeError.textContent = "Le temps doit être entre 1 et 300 minutes";
  else timeError.textContent = "";
  if (!nameValid || !cuisineValide || !difficultyValide || !timeValide) return;
  
  const recipe = {
    name: recipeName.value,
    cuisine: recipeCuisine.value,
    difficulty: recipeDifficulty.value,
    prepTimeMinutes: Number(recipeTime.value),
  };
  
  formSuccess.textContent = "";
  formSuccess.classList.add("hidden");
  
  try {
    addRecipeBtn.disabled = true;
    const newRecipe = await addRecipe(recipe);
    recipesData.unshift(newRecipe);
    displayRecipes(recipesData);
    
    recipeForm.reset();
    
    formSuccess.textContent = "Recette ajoutée avec succès !";
    formSuccess.classList.remove("hidden");
    
  } catch (error) {
    console.error(error); // bax n3rfo sabab !
    
    formSuccess.textContent = "Une erreur est survenue";
    formSuccess.classList.remove("hidden");
  } finally {
    addRecipeBtn.disabled = false;
  }
});

recipes.addEventListener("click", async (event) => {
  event.preventDefault();
  const deletbutt = event.target.closest(".delete-btn");
  if (!deletbutt) return;
  if (!isLoaded) {
    errorContainer.classList.remove("hidden");
    errorMessage.textContent =
    "Impossible de supprimer une recette. Veuillez réessayer le chargement";
    
    return;
  }
  const deletes = Number(deletbutt.dataset.id);
  if (confirm("Are you sure you want to delete this item?")) {
    deletbutt.disabled = true;
    formSuccess.textContent = "";
    formSuccess.classList.add("hidden");
    try {
      await deleteRecipe(deletes);
      recipesData = recipesData.filter((element) => element.id !== deletes);
      
      displayRecipes(recipesData);
      formSuccess.textContent = "Recette supprimer avec succès !";
      formSuccess.classList.remove("hidden");
      
    } catch (erreur) {
      console.error(erreur);
      formSuccess.textContent = "Erreur lors de la suppression !";
      formSuccess.classList.remove("hidden");
    } finally {
      deletbutt.disabled = false;
    }
  }
});


retryBtn.addEventListener("click", async (event) => {
  event.preventDefault()
  loadingMessage.classList.remove("hidden")
  errorContainer.classList.add("hidden")
  
  try{
    recipesData = await getRecipes()
    displayRecipes(recipesData)
    isLoaded = true
    errorContainer.classList.add("hidden")
  }catch(error){
    errorContainer.classList.remove("hidden")
    showErreur(error)
  }finally{
    loadingMessage.classList.add("hidden")
  }
})
