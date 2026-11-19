

export const validationName =  function (name){
    if(name.trim().length === 0 || name.trim().length < 3 || name.trim().length > 60)
        return false
    return true
}

export const validationCuisine = function (cuisine){
    if(cuisine.trim().length === 0)
        return false
    return true
}

export const validationDifficulty = function (difficulty){
    if(difficulty === "Easy" || difficulty === "Medium" || difficulty === "Hard") 
        return true
    return false
}

export const validationTime = function (time){
    if(time <= 0 || time > 300 || time.trim().length === 0 || Number.isNaN(Number(time)))
        return false
    return true
}