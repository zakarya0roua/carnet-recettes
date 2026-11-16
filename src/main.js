import { getRecipes } from "./api.js"

const recipesData = await getRecipes()

const recipesCount = document.querySelector("#recipes-count")
const recipes = document.querySelector("#recipes")

recipesCount.textContent = recipesData.length

console.log(recipesData);


function createCards(recipe){
    const div = document.createElement("div")
    const h2 = document.createElement("h2")
    const img = document.createElement("img")
    const pCuisine = document.createElement("p")
    const pDifficulty = document.createElement("p")
    const pTimeMinu = document.createElement("p")
    
    h2.textContent = recipe.name
    img.src = recipe.image
    pCuisine.textContent = `cuisine : ${recipe.cuisine}`
    pDifficulty.textContent = `difficulty : ${recipe.difficulty}`
    pTimeMinu.textContent = `${recipe.prepTimeMinutes} min`

    div.classList.add("bg-white", "rounded-2xl", "shadow-md", "p-4", "flex", "flex-col", "gap-3")
    h2.classList.add("text-xl", "font-bold", "text-gray-800")
    img.classList.add("w-full", "h-48", "object-cover", "rounded-xl")
    pCuisine.classList.add("text-gray-600", "text-sm")
    pDifficulty.classList.add("text-gray-600", "text-sm")
    pTimeMinu.classList.add("text-gray-600", "text-sm")
    
    
    div.append(h2, img, pCuisine, pDifficulty, pTimeMinu)

    return div
}

recipesData.forEach(recipe => {
    recipes.append(createCards(recipe))
});