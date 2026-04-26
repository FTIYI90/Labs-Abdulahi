// =================================
// RecipeVault Client App
// =================================

// ============================================
// Section 1: Configuration
// ============================================

const API_URL = "/api/recipes";

// ============================================
// Section 2: State
// ============================================

let recipes = [];
let editingId = null;
let filters = { category: "", search: "" };

// ============================================
// Section 3: API Helper Functions
// ============================================

async function fetchRecipes({ category = "", search = "" } = {}) {
    try {
        const params = new URLSearchParams();
        if (category) params.set("category", category);
        if (search) params.set("search", search);
        const qs = params.toString();
        const url = qs ? `${API_URL}?${qs}` : API_URL;
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch recipes:", error);
        return [];
    }
}

async function createRecipe(data) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Failed to create recipe:", error);
    }
}

async function updateRecipe(id, data) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Failed to update recipe:", error);
    }
}

async function deleteRecipeById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        return await response.json();
    } catch (error) {
        console.error("Failed to delete recipe:", error);
    }
}

// ============================================
// Section 4: Navigation
// ============================================

async function loadPage(page) {
    const response = await fetch(`pages/${page}.html`);
    document.querySelector("#main").innerHTML = await response.text();

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link.textContent.toLowerCase() === (page === "add-recipe" ? "add recipe" : page));
    });

    if (page === "recipes") {
        wireRecipeFilters();
        await loadRecipes();
    } else if (page === "add-recipe") {
        document.querySelector("#recipe-form")
            .addEventListener("submit", handleRecipeSubmit);
    }
}

// ============================================
// Section 5: Display Recipes
// ============================================

function recipeToHTMLCard(recipe) {
    return `
        <div class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-card-img">
            <div class="recipe-card-body">
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
                <div class="recipe-meta">
                    <span>Prep: ${recipe.prepTime} min</span>
                    <span>Cook: ${recipe.cookTime} min</span>
                    <span>Serves: ${recipe.servings}</span>
                </div>
                <span class="badge badge-${recipe.difficulty.toLowerCase()}">${recipe.difficulty}</span>
            </div>
            <div class="recipe-card-actions">
                <button class="btn btn-primary btn-sm" onclick="startEdit(${recipe.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="handleDelete(${recipe.id})">Delete</button>
            </div>
        </div>`;
}

function renderRecipes() {
    const grid = document.querySelector("#recipes-grid");
    if (recipes.length === 0) {
        grid.innerHTML = `<p class="empty-message">No recipes found</p>`;
        return;
    }
    grid.innerHTML = recipes.map(r => recipeToHTMLCard(r)).join("");
}

async function loadRecipes() {
    try {
        recipes = await fetchRecipes(filters);
        renderRecipes();
    } catch (error) {
        console.error("Failed to load recipes:", error);
    }
}

function wireRecipeFilters() {
    const categoryEl = document.querySelector("#filter-category");
    const searchEl = document.querySelector("#filter-search");
    if (!categoryEl || !searchEl) return;

    categoryEl.value = filters.category;
    searchEl.value = filters.search;

    categoryEl.addEventListener("change", async (e) => {
        filters.category = e.target.value;
        await loadRecipes();
    });

    searchEl.addEventListener("input", async (e) => {
        filters.search = e.target.value;
        await loadRecipes();
    });
}

// ============================================
// Section 6: Add / Edit Recipe
// ============================================

async function handleRecipeSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.prepTime = Number(data.prepTime);
    data.cookTime = Number(data.cookTime);
    data.servings = Number(data.servings);

    try {
        if (editingId) {
            await updateRecipe(editingId, data);
            cancelEdit();
        } else {
            await createRecipe(data);
        }
        e.target.reset();
        await loadPage("recipes");
    } catch (error) {
        console.error("Failed to save recipe:", error);
    }
}

async function startEdit(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;

    editingId = id;
    await loadPage("add-recipe");

    document.querySelector("#recipe-name").value = recipe.name;
    document.querySelector("#recipe-description").value = recipe.description;
    document.querySelector("#recipe-image").value = recipe.image;
    document.querySelector("#recipe-prepTime").value = recipe.prepTime;
    document.querySelector("#recipe-cookTime").value = recipe.cookTime;
    document.querySelector("#recipe-servings").value = recipe.servings;
    document.querySelector("#recipe-category").value = recipe.category;
    document.querySelector("#recipe-cuisine").value = recipe.cuisine;
    document.querySelector("#recipe-difficulty").value = recipe.difficulty;
    document.querySelector("#recipe-ingredients").value = recipe.ingredients;

    document.querySelector("#form-title").textContent = "Edit Recipe";
    document.querySelector("#submit-btn").textContent = "Update Recipe";
    document.querySelector("#cancel-btn").classList.remove("hidden");
}

function cancelEdit() {
    editingId = null;
    document.querySelector("#recipe-form").reset();
    document.querySelector("#form-title").textContent = "Add New Recipe";
    document.querySelector("#submit-btn").textContent = "Add Recipe";
    document.querySelector("#cancel-btn").classList.add("hidden");
}

// ============================================
// Section 7: Delete Recipe
// ============================================

async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this recipe?")) return;
    try {
        await deleteRecipeById(id);
        await loadRecipes();
    } catch (error) {
        console.error("Failed to delete recipe:", error);
    }
}

// ============================================
// Section 8: Initialize
// ============================================

document.addEventListener("DOMContentLoaded", async () => {
    await loadPage("recipes");
});
