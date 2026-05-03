"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { createRecipeAction, updateRecipeAction } from "@/app/actions/recipeActions";
import Link from "next/link";

export default function RecipeForm() {
    const searchParams = useSearchParams();
    const params = Object.fromEntries(searchParams.entries());
    const recipe = params.id
        ? { ...params, id: Number(params.id), prepTime: Number(params.prepTime), cookTime: Number(params.cookTime), servings: Number(params.servings) }
        : null;

    const isEdit = !!recipe;
    const action = isEdit ? updateRecipeAction : createRecipeAction;
    const [error, formAction, isPending] = useActionState(action, {});

    return (
        <main className="page">
            <h1>{isEdit ? "Edit" : "Add"} Recipe</h1>
            <div className="form-container">
                <form action={formAction}>
                    {isEdit && <input type="hidden" name="id" value={recipe.id} />}
                    <div className="form-group">
                        <label htmlFor="name">Recipe Name</label>
                        <input id="name" name="name" type="text" required
                            defaultValue={recipe?.name || ""}
                            className={error?.name ? "input-error" : ""} />
                        {error?.name && <p className="error-message">{error.name}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" rows="3" required
                            defaultValue={recipe?.description || ""}
                            className={error?.description ? "input-error" : ""} />
                        {error?.description && <p className="error-message">{error.description}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image URL</label>
                        <input id="image" name="image" type="url" placeholder="https://images.unsplash.com/..."
                            defaultValue={recipe?.image || ""} />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="prepTime">Prep Time (min)</label>
                            <input id="prepTime" name="prepTime" type="number" min="0" required
                                defaultValue={recipe?.prepTime || ""}
                                className={error?.prepTime ? "input-error" : ""} />
                            {error?.prepTime && <p className="error-message">{error.prepTime}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="cookTime">Cook Time (min)</label>
                            <input id="cookTime" name="cookTime" type="number" min="0" required
                                defaultValue={recipe?.cookTime || ""}
                                className={error?.cookTime ? "input-error" : ""} />
                            {error?.cookTime && <p className="error-message">{error.cookTime}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="servings">Servings</label>
                            <input id="servings" name="servings" type="number" min="1" required
                                defaultValue={recipe?.servings || ""}
                                className={error?.servings ? "input-error" : ""} />
                            {error?.servings && <p className="error-message">{error.servings}</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select id="category" name="category" required
                            defaultValue={recipe?.category || ""}
                            className={error?.category ? "input-error" : ""}>
                            <option value="">Select a category</option>
                            <option value="Main Course">Main Course</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Appetizer">Appetizer</option>
                            <option value="Soup">Soup</option>
                        </select>
                        {error?.category && <p className="error-message">{error.category}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="cuisine">Cuisine</label>
                        <input id="cuisine" name="cuisine" type="text" placeholder="e.g. Qatari, Italian..." required
                            defaultValue={recipe?.cuisine || ""}
                            className={error?.cuisine ? "input-error" : ""} />
                        {error?.cuisine && <p className="error-message">{error.cuisine}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="difficulty">Difficulty</label>
                        <select id="difficulty" name="difficulty" required
                            defaultValue={recipe?.difficulty || ""}
                            className={error?.difficulty ? "input-error" : ""}>
                            <option value="">Select difficulty</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                        {error?.difficulty && <p className="error-message">{error.difficulty}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="ingredients">Ingredients</label>
                        <textarea id="ingredients" name="ingredients" rows="3" placeholder="e.g. chicken, rice, onions..." required
                            defaultValue={recipe?.ingredients || ""} />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={isPending}>
                            {isPending ? "Saving..." : isEdit ? "Update Recipe" : "Add Recipe"}
                        </button>
                        {isEdit && <Link href="/recipes" className="btn btn-secondary">Cancel</Link>}
                    </div>
                </form>
            </div>
        </main>
    );
}
