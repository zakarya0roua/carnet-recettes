
const recipesCount = document.querySelector("#recipes-count")
const recipes = document.querySelector("#recipes")
const emptyMessage = document.querySelector("#empty-message")

export const createCards = function (recipe){
    const div = document.createElement("div")
    const h2 = document.createElement("h2")
    const img = document.createElement("img")
    const pCuisine = document.createElement("p")
    const pDifficulty = document.createElement("p")
    const pTimeMinu = document.createElement("p")
    const buttonSupprime = document.createElement("button")
    
    h2.textContent = recipe.name
    img.src = recipe.image ?? "https://placehold.co/600x400?text=Pas+d'image";
    img.alt = recipe.name
    pCuisine.textContent = `Cuisine : ${recipe.cuisine}`
    pDifficulty.textContent = `Difficulté : ${recipe.difficulty}`
    pTimeMinu.textContent = `${recipe.prepTimeMinutes} min`

    buttonSupprime.textContent = "Supprimer"
    buttonSupprime.type = "button"
    buttonSupprime.className = "delete-btn"
    buttonSupprime.classList.add("rounded-lg", "bg-red-600","px-4", "py-2", "text-sm", "font-semibold", "text-white", "transition", "hover:bg-red-700")
    buttonSupprime.dataset.id = recipe.id


    div.classList.add("bg-white", "rounded-2xl", "shadow-md", "p-4", "flex", "flex-col", "gap-3")
    h2.classList.add("text-xl", "font-bold", "text-gray-800")
    img.classList.add("w-full", "h-48", "object-cover", "rounded-xl")
    pCuisine.classList.add("text-[17px]", "font-black","text-gray-700", "text-sm")
    pDifficulty.classList.add("text-gray-600", "text-sm")
    pTimeMinu.classList.add("text-gray-600", "text-sm")
    
    div.append(h2, img, pCuisine, pDifficulty, pTimeMinu, buttonSupprime)

    return div
}


export const displayRecipes = function (recipesData){
    recipes.textContent = ""
    if(recipesData.length === 0) {
        emptyMessage.classList.remove("hidden")
        recipesCount.textContent = 0
        return
    }
    recipesCount.textContent = recipesData.length
    emptyMessage.classList.add("hidden")
    recipesData.forEach((recipe) => {
        recipes.append(createCards(recipe))
    })
    
}