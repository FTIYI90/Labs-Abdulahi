"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RecipeCard from "@/app/components/RecipeCard";
import { deleteRecipeAction } from "@/app/actions/recipeActions";

export default function RecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const [deleteId, setDeleteId] = useState(null);

    async function loadRecipes() {
        const params = new URLSearchParams();
        if (category) params.set("category", category);
        if (search) params.set("search", search);
        const qs = params.toString();
        const url = qs ? `/api/recipes?${qs}` : "/api/recipes";
        const res = await fetch(url);
        const data = await res.json();
        setRecipes(data);
    }

    useEffect(() => {
        loadRecipes();
    }, [category, search]);

    async function handleDelete(id) {
        await deleteRecipeAction(id);
        setDeleteId(null);
        await loadRecipes();
    }

    return (
        <main className="page">
            <div className="page-header">
                <h1>My Recipes</h1>
                <Link href="/recipes/form" className="btn btn-primary">+ Add Recipe</Link>
            </div>

            <div className="filter-bar">
                <div className="filter-group">
                    <label htmlFor="filter-category">Category</label>
                    <select id="filter-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Soup">Soup</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label htmlFor="filter-search">Search by name</label>
                    <input id="filter-search" type="text" placeholder="e.g. chicken, luqaimat..."
                        value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>

            <div className="recipes-grid">
                {recipes.length === 0 ? (
                    <p className="empty-message">No recipes found</p>
                ) : (
                    recipes.map(r => (
                        <RecipeCard key={r.id} recipe={r} onDelete={setDeleteId} />
                    ))
                )}
            </div>

            {deleteId && (
                <div className="confirm-overlay">
                    <div className="confirm-dialog">
                        <h3>Delete Recipe</h3>
                        <p>Are you sure? This action cannot be undone.</p>
                        <div className="form-actions">
                            <button className="btn btn-danger" onClick={() => handleDelete(deleteId)}>Delete</button>
                            <button className="btn btn-primary" onClick={() => setDeleteId(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
