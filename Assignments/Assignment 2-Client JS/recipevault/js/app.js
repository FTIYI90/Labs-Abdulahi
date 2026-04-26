// =================================
// RecipeVault Client App
// =================================

// ============================================
// Section 1: Configuration
// ============================================

const API_URL = "https://recipevault-api.vercel.app/api/recipes";

// ============================================
// Section 2: State
// ============================================

let recipes = [];
let editingId = null;

// ============================================
// Section 3: API Helper Functions
// ============================================

// TODO 1: fetchAllRecipes()
// Fetch all recipes from the API
// - Use fetch() with async/await
// - Parse and return the JSON response
// - Wrap in try/catch, log errors to console



// TODO 2: createRecipe(data)
// Send a POST request to add a new recipe
// - Set method to "POST"
// - Set headers: { "Content-Type": "application/json" }
// - Set body to JSON.stringify(data)
// - Return the parsed JSON response
// - Wrap in try/catch



// TODO 3: updateRecipe(id, data)
// Send a PUT request to update a recipe
// - URL: API_URL + "/" + id
// - Same headers and body format as createRecipe
// - Return the parsed JSON response
// - Wrap in try/catch



// TODO 4: deleteRecipeById(id)
// Send a DELETE request to remove a recipe
// - URL: API_URL + "/" + id
// - Set method to "DELETE"
// - Return the parsed JSON response
// - Wrap in try/catch



// ============================================
// Section 4: Navigation
// ============================================

// TODO 5: loadPage(page)
// Load a page fragment into the main content area
// - Fetch the HTML from `pages/${page}.html`
// - Get the response text
// - Set document.querySelector("#main").innerHTML to the HTML
// - Update active nav link (toggle "active" class)
// - If page is "recipes": call loadRecipes()
// - If page is "add-recipe": wire up the form submit event to handleRecipeSubmit



// ============================================
// Section 5: Display Recipes
// ============================================

// TODO 6: recipeToHTMLCard(recipe)
// Convert a recipe object into an HTML card string using a template literal
// Use the recipe properties (id, name, description, image, prepTime, cookTime, servings, difficulty)
// to fill in the card below. Here's what the rendered HTML should look like:
//
// <div class="recipe-card">
//     <img src="images/photo.jpg" alt="Recipe Name" class="recipe-card-img">
//     <div class="recipe-card-body">
//         <h3>Recipe Name</h3>
//         <p>A short description of the recipe.</p>
//         <div class="recipe-meta">
//             <span>Prep: 10 min</span>
//             <span>Cook: 25 min</span>
//             <span>Serves: 4</span>
//         </div>
//         <span class="badge badge-easy">Easy</span>
//     </div>
//     <div class="recipe-card-actions">
//         <button class="btn btn-primary btn-sm" onclick="startEdit(1)">Edit</button>
//         <button class="btn btn-danger btn-sm" onclick="handleDelete(1)">Delete</button>
//     </div>
// </div>



// TODO 7: renderRecipes()
// Render all recipes into the grid
// - Get the #recipes-grid element
// - If recipes array is empty, show "No recipes found" message
// - Otherwise, map each recipe through recipeToHTMLCard and join with ""
// - Set the grid's innerHTML to the result



// TODO 8: loadRecipes()
// Load recipes from the API and display them
// - Call fetchAllRecipes() and store the result in the recipes array
// - Call renderRecipes()
// - Wrap in try/catch



// ============================================
// Section 6: Add / Edit Recipe
// ============================================

// TODO 9: handleRecipeSubmit(e)
// Handle the recipe form submission
// - Prevent default form behavior
// - Extract form data using Object.fromEntries(new FormData(e.target))
// - Convert prepTime, cookTime, and servings to numbers using Number()
// - If editingId is set: call updateRecipe(editingId, data), then cancelEdit()
// - Otherwise: call createRecipe(data)
// - Reset the form
// - Navigate to the recipes page using loadPage("recipes")
// - Wrap in try/catch



// TODO 10: startEdit(id)
// Populate the form with a recipe's data for editing
// - Find the recipe in the recipes array by id
// - If not found, return early
// - Set editingId to the recipe's id
// - Navigate to the add-recipe page using loadPage("add-recipe")
// - After loadPage completes, populate each form field with the recipe's data
// - Change the form title to "Edit Recipe"
// - Change the submit button text to "Update Recipe"
// - Show the cancel button (remove "hidden" class)



// TODO 11: cancelEdit()
// Cancel editing and reset the form
// - Set editingId to null
// - Reset the form
// - Change the form title back to "Add New Recipe"
// - Change the submit button text back to "Add Recipe"
// - Hide the cancel button (add "hidden" class)



// ============================================
// Section 7: Delete Recipe
// ============================================

// TODO 12: handleDelete(id)
// Delete a recipe after confirmation
// - Show a confirm() dialog: "Are you sure you want to delete this recipe?"
// - If confirmed: call deleteRecipeById(id), then call loadRecipes()
// - Wrap in try/catch



// ============================================
// Section 8: Initialize
// ============================================

// TODO 13: Add a DOMContentLoaded event listener
// - When the page loads, call loadPage("recipes") to show the recipes page by default

