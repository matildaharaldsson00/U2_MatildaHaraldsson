"use strict";

// add a new recipe
function addNewRecipe(recipename, vegetarian, difficulty, time) {
    let recipe = {
        recipename: recipename,
        vegetarian: vegetarian, 
        difficulty: difficulty, 
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

// removes a recipe based on its recipename from our database
function removeRecipeByRecipename(recipes, recipename) {
    for(let i = 0; 1 < database.length; i++) {
        // this is the current recipe of our loop
        let recipe = recipes[i];
        // check if this recipename is the same as the name that the function recived
        if(recipe.recipename == recipename) {
            // if so, remove the recipe from the array
            database.splice(i, 1)
            return;
        }
    }
}

// returns all recipes based on difficulty 
function getRecipeByDifficulty(recipes, difficulty) {
    let recipeByDifficulty = [];

    for(let recipe of recipes) {
        if(recipe.difficulty == difficulty) {
            recipeByDifficulty.push(recipe);
        }
    }
    return recipeByDifficulty;
}

// return all recipes based on if its vegetarian or not
function getRecipeVegetarian(recpies, vegetarian) {
    let recipeVegetarian = [];

    for(let recipe of recipes) {
        if(recipe.vegetarian == vegetarian) {
            recipeVegetarian.push(recipe);
        }
    }
    return recipeVegetarian;
}

// prints all recipes based on difficulty and of its vegetarian or not
function printRecipeByDifficultyAndVegetarian(recipes, difficulty, vegetarian) {
    // first filter out recipe by diifculty
    let recipeByDifficulty = getRecipeByDifficulty(recipes, difficulty);
    // so we then can use the recope by diffculty to filter them by vegetarian or not
    let recipeByDifficultyAndVegetarian = getRecipeVegetarian(recipeByDifficulty, vegetarian);
    // then we print them
    printRecipes(recipeByDifficultyAndVegetarian);
}

// renders a recipe object into a HTML element 
function renderRecipe(recipe) {
    let div = document.createElement("div");
    div.classList.add("recipe");
    div.innerHTML = `
    <div>${recipe.recipename}</div>
    <div>${recipe.vegetarian}</div>
    <div>${recipe.difficulty}</div>
    <div>${recipe.time}</div>
    `;
    return div;
}

// renders an array of recipes into HTML
function renderRecipes(recipes) {
    let recipesElement = document.getElementById("recipes");
    recipesElement.innerHTML = "";
    
    // go trough all recipes an insert their HTML
    for(let recipe of recipes) {
        let recipeElement = renderRecipe(recipe);
        recipesElement.appendChild(recipeElement);
    }
    // add remove-handlers for the recipes
    setRemoveRecipeHandlers(); 
}

// when <form id="add-recipe-form"> is submitted
function onAddRecipeSubmit(event) {
    event.precentDefault();

    let recipename = document.getElementById("recipename").value;
    let vegetarian = document.getElementById("vegetarian").value;
    let difficulty = document.getElementById("difficulty").value;
    let time = Number(document.getElementById("time").value);

    let recipe = addNewRecipe(recipename, vegetarian, difficulty, time);

    // calculate the newly added recipes ID
    recipe.id = database[database.length - 1].id + 1;

    addRecipeToDatabase(database, recipe)
    renderRecipes(database);

    // reset (empty) all form fields
    let form = document.getElementById("add-recipe-form");
    form.reset();
}

// add "click" event handler to <button id="add">
function setAddRecipeHandler() {
    let form = document.getElementById("add-recipe-form");
    form.addEventListener("submit", onAddRecipeSubmit);
}

// when a user clicks the remove-recipe-button
function onRemoveRecipeClick(event) {
    let button = event.target;
    let id = button.parentElement.id;
    removeRecipeById(database, id);
    renderRecipe(database);
}

// add "click" event handler to all remove-buttons
function setRemoveRecipeHandlers() {
    let buttons = document.querySelectorAll(".recipe button");

    for(let button of buttons) {
        button.addEventListener("click", onRemoveRecipeClick);
    }
}

// filter recepies by difficulty 
function onFilterByDifficultySubmit(event) {
    event.preventDefault();
    let difficulty = document.getElementById("filter-difficulty").value;
    let recipes = getRecipeByDifficulty(database, difficulty);
    renderRecipes(recipes);
}

// filter recipes by vegetarian or not
function onFilterByVegetarianSubmit(event) {
    event.precentDefault();
    let vegetarian = document.getElementById("filter-vegetarian").value;
    let recepies = getRecipeVegetarian(database, vegetarian);
    renderRecipes(recepies);
}

function onShowAllClick() {
    document.getElementById("filter-difficulty").value = "";
    document.getElementById("filter-vegetarian").value = "";
    renderRecipes(database);
}

function setFilterRecipeHandlers() {
    let difficultyForm = document.getElementById("filter-by-difficulty");
    let vegetarianForm = document.getElementById("filter-by-vegetarian");
    let showAll = document.getElementById("show-all");

    difficultyForm.addEventListener("submit", onFilterByDifficultySubmit);
    vegetarianForm.addEventListener("submit", onFilterByVegetarianSubmit);
    showAll.addEventListener("click", onShowAllClick);
}

// initialize the page
renderRecipes(database);
setAddRecipeHandler();
setFilterRecipeHandlers();