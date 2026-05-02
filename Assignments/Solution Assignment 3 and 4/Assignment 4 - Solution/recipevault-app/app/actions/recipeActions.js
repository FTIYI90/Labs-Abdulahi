"use server";

import recipesRepo from "@/repos/RecipesRepo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRecipeAction(prevState, formData) {
    const data = Object.fromEntries(formData);
    data.prepTime = Number(data.prepTime);
    data.cookTime = Number(data.cookTime);
    data.servings = Number(data.servings);

    const errors = {};
    if (!data.name?.trim()) errors.name = "Recipe name is required";
    if (!data.description?.trim()) errors.description = "Description is required";
    if (!data.prepTime || data.prepTime < 0) errors.prepTime = "Prep time must be 0 or more";
    if (!data.cookTime || data.cookTime < 0) errors.cookTime = "Cook time must be 0 or more";
    if (!data.servings || data.servings < 1) errors.servings = "Servings must be at least 1";
    if (!data.category) errors.category = "Category is required";
    if (!data.cuisine?.trim()) errors.cuisine = "Cuisine is required";
    if (!data.difficulty) errors.difficulty = "Difficulty is required";

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    await recipesRepo.create(data);
    revalidatePath("/");
    redirect("/recipes");
}

export async function updateRecipeAction(prevState, formData) {
    const { id, ...fields } = Object.fromEntries(formData);
    fields.prepTime = Number(fields.prepTime);
    fields.cookTime = Number(fields.cookTime);
    fields.servings = Number(fields.servings);

    const errors = {};
    if (!fields.name?.trim()) errors.name = "Recipe name is required";
    if (!fields.description?.trim()) errors.description = "Description is required";
    if (!fields.prepTime || fields.prepTime < 0) errors.prepTime = "Prep time must be 0 or more";
    if (!fields.cookTime || fields.cookTime < 0) errors.cookTime = "Cook time must be 0 or more";
    if (!fields.servings || fields.servings < 1) errors.servings = "Servings must be at least 1";
    if (!fields.category) errors.category = "Category is required";
    if (!fields.cuisine?.trim()) errors.cuisine = "Cuisine is required";
    if (!fields.difficulty) errors.difficulty = "Difficulty is required";

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    await recipesRepo.update(id, fields);
    revalidatePath("/");
    redirect("/recipes");
}

export async function deleteRecipeAction(id) {
    await recipesRepo.delete(id);
    revalidatePath("/");
}
