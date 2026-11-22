import axios from "axios";

const api = axios.create({
    baseURL : "https://dummyjson.com",
    timeout : 8000,
})



export const getRecipes = async function (){
    const response = await api.get("/recipes", {
        params: {
            limit: 12,
        }
    })
    return response.data.recipes
}

export const searchRecipes = async function (search){
    const response = await api.get("/recipes/search", {
        params: {
            q: search
        }
        })
    return response.data.recipes
}

export const addRecipe = async function (recipe){

    const newRecipe = {
        name : recipe.name,
        cuisine : recipe.cuisine,
        difficulty : recipe.difficulty,
        prepTimeMinutes : recipe.prepTimeMinutes,
    }
    const response = await api.post("/recipes/add", newRecipe)

    return response.data
}


export const deleteRecipe = async function (id) {
    const response  = await api.delete(`/recipes/${id}`)

    return response.data
}