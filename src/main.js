import {searchRecipes, getRecipes} from "./api.js"
import {displayRecipes} from "./affichage.js"
import {validationName, validationCuisine, validationDifficulty, validationTime} from "./validation.js"

const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")
const showAllBtn = document.querySelector("#show-all-btn")

// validation 
const recipeForm = document.querySelector("#recipe-form")
const recipeName = document.querySelector("#recipe-name")
const recipeCuisine = document.querySelector("#recipe-cuisine")
const recipeDifficulty = document.querySelector("#recipe-difficulty")
const recipeTime = document.querySelector("#recipe-time")
//error
const nameError = document.querySelector("#name-error")
const cuisineError = document.querySelector("#cuisine-error")
const difficultyError = document.querySelector("#difficulty-error")
const timeError = document.querySelector("#time-error")

const recipe = await getRecipes()
displayRecipes(recipe)

searchBtn.addEventListener("click", async (event) => {
    event.preventDefault()
    if(searchInput.value === "") return

    const filter = await searchRecipes(searchInput.value)
    displayRecipes(filter)
})

showAllBtn.addEventListener("click", async (event) => {
    event.preventDefault()
    displayRecipes(recipe)
})


recipeForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const nameValid = validationName(recipeName.value)
    const cuisineValide = validationCuisine(recipeCuisine.value)
    const difficultyValide = validationDifficulty(recipeDifficulty.value)
    const timeValide = validationTime(recipeTime.value)

    if(!nameValid) {
        nameError.textContent = "Le nom doit contenir entre 3 et 60 caractères"
    }else {
        nameError.textContent = ""
    }
    if(!cuisineValide)
        cuisineError.textContent = "Veuillez choisir une cuisine"
    else
        cuisineError.textContent = ""
    if(!difficultyValide)
        difficultyError.textContent = "Veuillez choisir une difficulté"
    else
        difficultyError.textContent =""
    if(!timeValide)
        timeError.textContent = "Le temps doit être entre 1 et 300 minutes"
    else
        timeError.textContent = ""
    if(!nameValid || !cuisineValide || !difficultyValide || !timeValide)
        return



})

