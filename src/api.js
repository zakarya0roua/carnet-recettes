import axios from "axios";

const api = axios.create({
    baseURL : "https://dummyjson.com",
    timeout : 5000,
})


export const getRecipes = async function (){
    const response = await api.get("/recipes?limit=12")
    return response.data.recipes
}

