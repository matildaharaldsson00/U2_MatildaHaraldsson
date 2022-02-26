"use strict";

// add a new recipe
function addNewRecipe(recipename, vegetarian, difficulty, time) {
    let recipe = {
        recipename: recipename,
        vegetarian: answer, 
        difficulty: level, 
        time: time,
    };
    return recipe;
}

// adding a new recipe from prompt
function addNewRecipeFromPrompt() {
    let recipename = prompt("Skriv namnet på ditt recept");
    let vegetarian = prompt("Är maträtten vegetarisk?");
    let difficulty = prompt("Vad har receptet för svårighetsgrad?");
    let time = prompt("Hur lång tid tar det att laga maten?")  
    
    let newRecipe = addNewRecipe(recipename, vegetarian, difficulty, Number(time));
}

// adds a new recipe to our database
function addRecipeToDatabase(database, recipe) {
    console.log(`Du har lagt till ${recipe.recipename} bland dina recept`);
    database.push(recipe);
}

// adds a new recipe to our database from prompts
function addRecipeToDatabaseFromPrompt(database) {
    let recipe = addNewRecipeFromPrompt();
    let saveRecipe = confirm(`Vill du spara ${recipe.recipename} bland dina recept?`);

    if(saveRecipe) {
        addRecipeToDatabase(database, recipe);
    };
}