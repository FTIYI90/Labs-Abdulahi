<p align="center">
<strong>Qatar University</strong><br>
College of Engineering - Department of Computer Science and Engineering<br>
<strong>CMPS 350 - Web Development</strong>
</p>

---

# Assignment 2: Client-Side JavaScript

**Graded out of:** 100%
**Deadline:** Saturday, March 28, 2026 - 11:59 PM

---

## How to Get Started

1. Go to the shared lab repo (`Labs-Abdulahi`) and find the assignment under `Assignments/Assignment 2`.
2. Copy the entire `Assignment 2` folder into your own repo under the same path:

```
Your-Repo/
├── Assignments/
│   └── Assignment 2/
│       ├── Assignment 2 - Client-Side JavaScript.md
│       ├── Testing-Grading-Sheet.md
│       └── recipevault/
│           ├── index.html
│           ├── pages/
│           │   ├── recipes.html
│           │   └── add-recipe.html
│           ├── css/
│           │   └── styles.css
│           └── js/
│               └── app.js
```

3. Open the `recipevault` folder in VS Code and work inside `js/app.js`. That's the only file you need to modify.

---

## Overview

In Assignment 1 you built the RecipeVault website with HTML and CSS. Now you'll bring it to life with JavaScript.

You'll build a single-page app (SPA) that talks to a REST API we've deployed for you. The app lets users browse, add, edit, and delete recipes - all without page reloads.

The HTML and CSS are provided. Your job is to write the JavaScript in `app.js`, implementing all the TODO items. The patterns here match what you practiced in Labs 7 and 8: `fetch()` with `async/await`, DOM manipulation with template literals, `FormData`, and the `editingId` pattern for toggling between add and edit mode.

> **API Base URL:** `https://recipevault-api.vercel.app`
>
> The API is live and shared across the class. Data resets periodically, so don't worry about messing things up.

**Before writing any code, visit the API documentation at [https://recipevault-api.vercel.app](https://recipevault-api.vercel.app).** The docs page shows every endpoint, the request/response format, and the full recipe schema. You'll need to refer to it when implementing the API helper functions.

**See the finished app in action:** A working demo is available at [https://recipevault-api.vercel.app/demo/](https://recipevault-api.vercel.app/demo/). Use it as a reference to see how the final app should look and behave.

---

## How the App Works

This is a single-page application with two "pages" loaded as HTML fragments:

- **Recipes page** (`pages/recipes.html`) - displays all recipes in a card grid
- **Add Recipe page** (`pages/add-recipe.html`) - form for adding or editing a recipe

The `loadPage(page)` function fetches the HTML fragment, injects it into `<main id="main">`, and wires up event handlers. Navigation links in the header call `loadPage()` with onclick handlers.

---

## What You Need to Implement

Open `js/app.js` and complete all 13 TODOs. The file is organized into sections that match the app's functionality. Read the TODO comments carefully - they tell you exactly what each function should do.

Here's a summary of each section:

### Section 3: API Helper Functions (TODOs 1-4)

Four `async` functions that talk to the API using `fetch()`. Refer to the [API documentation](https://recipevault-api.vercel.app) to see the exact endpoints, HTTP methods, and request formats for each:

- **`fetchAllRecipes()`** - GET all recipes
- **`createRecipe(data)`** - POST a new recipe
- **`updateRecipe(id, data)`** - PUT (update) an existing recipe
- **`deleteRecipeById(id)`** - DELETE a recipe

All four should use `async/await` and wrap the fetch call in `try/catch`.

### Section 4: Navigation (TODO 5)

- **`loadPage(page)`** - Fetches `pages/${page}.html`, injects the HTML into `#main`, updates the active nav link, and wires up page-specific handlers (load recipes or attach form submit listener)

### Section 5: Display Recipes (TODOs 6-8)

- **`recipeToHTMLCard(recipe)`** - Returns an HTML string for a single recipe card using a template literal. The TODO comments show what the rendered HTML looks like - your job is to turn it into a template literal using the recipe's properties.
- **`renderRecipes()`** - Maps the `recipes` array through `recipeToHTMLCard()`, joins the results, and sets `#recipes-grid` innerHTML.
- **`loadRecipes()`** - Calls `fetchAllRecipes()`, stores the result in the `recipes` array, then calls `renderRecipes()`.

### Section 6: Add / Edit Recipe (TODOs 9-11)

- **`handleRecipeSubmit(e)`** - Handles form submission. Uses `Object.fromEntries(new FormData(e.target))` to extract form data. Converts number fields. Branches on `editingId`: if set, calls `updateRecipe()`, otherwise calls `createRecipe()`. Resets the form and navigates back to recipes.
- **`startEdit(id)`** - Finds the recipe, sets `editingId`, navigates to the form page, then populates every form field with the recipe's data. Changes the button text to "Update Recipe" and shows the cancel button.
- **`cancelEdit()`** - Resets `editingId` to null, resets the form, restores "Add New Recipe" title and button text, hides the cancel button.

### Section 7: Delete Recipe (TODO 12)

- **`handleDelete(id)`** - Shows a `confirm()` dialog. If confirmed, calls `deleteRecipeById(id)` and reloads the recipe list.

### Section 8: Initialize (TODO 13)

- Add a `DOMContentLoaded` event listener that calls `loadPage("recipes")` to show the recipes page when the app first loads.

---

## Tips

- **Open with Live Server.** Right-click `index.html` and select "Open with Live Server". The app runs on `localhost:5500` which the API allows via CORS.
- **Read the API docs first.** Visit [https://recipevault-api.vercel.app](https://recipevault-api.vercel.app) to see every endpoint with examples. Try pasting `https://recipevault-api.vercel.app/api/recipes` in your browser to see the JSON.
- **Work in order.** Start with the API helpers (TODOs 1-4), then navigation (TODO 5), then display (TODOs 6-8). Once you can see recipes, move on to add/edit/delete.
- **Check the console.** If something isn't working, open DevTools (F12) and check the Console tab for errors.
- **FormData needs name attributes.** The form inputs already have `name` attributes. `Object.fromEntries(new FormData(form))` turns them into an object like `{ name: "...", description: "...", ... }`.
- **Number conversion.** `FormData` returns everything as strings. Convert `prepTime`, `cookTime`, and `servings` to numbers with `Number()` before sending to the API.

---

## Grading Rubric

| # | Criteria                                                                                    | Points        |
| - | ------------------------------------------------------------------------------------------- | ------------- |
| 1 | API Helper Functions - fetch, POST, PUT, DELETE with proper headers, async/await, try/catch | 15            |
| 2 | Navigation - loadPage() fetches HTML fragments, injects into #main, wires form handlers     | 10            |
| 3 | Display Recipes - recipeToHTMLCard(), renderRecipes(), loadRecipes() with grid display      | 20            |
| 4 | Add Recipe - form submission with FormData, POST to API, page navigation after add          | 20            |
| 5 | Edit Recipe - populate form from recipe data, PUT to API, editingId pattern, cancel support | 20            |
| 6 | Delete Recipe - confirm() dialog, DELETE to API, refresh display                            | 15            |
|   | **Total**                                                                             | **100** |

---

## Deliverables

1. Complete the `js/app.js` file with all 13 TODOs implemented. Do not modify other files.
2. Fill in the **Testing-Grading-Sheet.md** with screenshots of your working app. Save screenshots inside a `screenshots/` folder. Not submitting the testing sheet will incur a **10% deduction**.
3. Push everything to **your own repo** under `Assignments/Assignment 2` before **Saturday, April 11, 2026 at 11:59 PM**. **No late submissions will be accepted.**

Your `Assignments/Assignment 2` folder should look like this when you're done:

```
Assignment 2/
├── Assignment 2 - Client-Side JavaScript.md
├── Testing-Grading-Sheet.md
├── screenshots/
│   ├── q1-recipes-grid.png
│   ├── q2-recipe-card.png
│   └── ... (all screenshots from the testing sheet)
└── recipevault/
    ├── index.html
    ├── pages/
    │   ├── recipes.html
    │   └── add-recipe.html
    ├── css/
    │   └── styles.css
    └── js/
        └── app.js
```

Build everything yourself - no AI tools or code generators.
