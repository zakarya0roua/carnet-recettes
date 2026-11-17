import {searchRecipes, getRecipes} from "./api.js"
import {displayRecipes} from "./affichage.js"

const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")
const showAllBtn = document.querySelector("#show-all-btn")

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

