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

// adds a new recipe to our database
function addRecipeToDatabase(database, recipe) {

    // asks if you are sure that you want to add a new racipe to the list
    let wantToSaveRecipe = confirm(`Vill du spara ${recipe.recipename} till receptlistan?`);

    if(wantToSaveRecipe) {
        database.push(recipe);
    }
}

// removes a recipe based on its recipename from our database
function removeRecipeById(recipes, id) {
    for(let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        if(recipe.id == id) {
            recipes.splice(i, 1);
            return;
        }
    }
}

// returns all recipes based on difficulty 
function getRecipeByDifficulty(recipes, difficulty) {
    let recipeByDifficulty = [];

    for(let recipe of recipes) {
        if(recipe.difficulty.toLowerCase() == difficulty.toLowerCase()) {
            recipeByDifficulty.push(recipe);
        }
    }
    return recipeByDifficulty;
}

// return all recipes based on if its vegetarian or not
function getRecipeVegetarian(recipes, vegetarian) {
    let recipeByVegetarian = [];

    for(let recipe of recipes) {
        if(recipe.vegetarian.toLowerCase() == vegetarian.toLowerCase()) {
            recipeByVegetarian.push(recipe);
        }
    }
    return recipeByVegetarian;
}

// renders a recipe object into a HTML element 
function renderRecipe(recipe) {
    let li = document.createElement("div");
    li.classList.add("recipe");
    li.id = recipe.id;
    li.innerHTML = `
        <li>${recipe.recipename}</li>
        <div>${recipe.vegetarian}</div>
        <div>${recipe.difficulty}</div>
        <div>${recipe.time}</div>
        <button>Ta bort recept</button>
        `;

    return li;
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
    event.preventDefault();

    let recipename = document.getElementById("recipename").value;
    let vegetarian = document.getElementById("vegetarian").value;
    let difficulty = document.getElementById("difficulty").value;
    let time = Number(document.getElementById("time").value);

    // have to fill in alla form boxes to add a new recipe
    if(recipename == "") {
       return alert(`Du m??ste fylla i formul??ret f??r att l??gga till ett recept`);
    } 
    else if(vegetarian == "") {
        alert(`Du m??ste fylla i formul??ret f??r att l??gga till ett recept`)
    } 
    else if(difficulty == "") {
        alert(`Du m??ste fylla i formul??ret f??r att l??gga till ett recept`)
    } 
    else if(time == 0) {
        alert(`Du m??ste fylla i formul??ret f??r att l??gga till ett recept`);
    }

    let recipe = addNewRecipe(recipename, vegetarian, difficulty, time);

    // calculate the newly added recipes ID and makes it possible to add a new recipe even if the database is empty
    /* recipe.id = database[database.length - 1].id + 1; */
    
    if(database.length = database.length) {
        recipe.id = database[database.length - 1].id + 1;
    }
    else {
        recipe.id = 1;
    }

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

    // confirm that you are sure that you want to remove a new recipe
    if(confirm(`??r du s??ker p?? att du vill radera receptet?`) == true) {
        removeRecipeById(database, id);   
    }
    else {
        return false;
    }

    renderRecipes(database);
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
    event.preventDefault();
    let vegetarian = document.getElementById("filter-vegetarian").value;
    let recepies = getRecipeVegetarian(database, vegetarian);
    renderRecipes(recepies);
}

// button that resets the fitler search, shows all the recipes
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