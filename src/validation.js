export const validationName = function (name) {
    const length = name.trim().length
    return length >= 3 && length <= 60
}

export const validationCuisine = function (cuisine) {
    return cuisine.trim().length > 0
}

export const validationDifficulty = function (difficulty) {
    return difficulty === "Easy" || difficulty === "Medium" || difficulty === "Hard"
}

export const validationTime = function (time) {
    const value = String(time).trim()
    if (value === "") return false
    const number = Number(value)
    return Number.isInteger(number) && number >= 1 && number <= 300
}