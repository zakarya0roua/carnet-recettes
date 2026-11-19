

export const validationName =  function (name){
    if(name.length === 0 || name.length < 3 || name .length> 60)
        return false
    return true
}

export const validationCuisine = function (cuisine){
    if(cuisine.trim().length === 0)
        return false
    return true
}

export const validationDifficulty = function (difficulty){
    if(difficulty === "") 
        return false
    return true
}

export const validationTime = function (time){
    if(time <= 0 || time > 300 || time.trim().length === 0 || Number.isNaN(Number(time)))
        return false
    return true
}