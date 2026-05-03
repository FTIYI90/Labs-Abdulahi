import { NextResponse } from "next/server";
import recipesRepo from "@/repos/RecipesRepo";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const recipes = await recipesRepo.search({
        category: searchParams.get("category"),
        search: searchParams.get("search")
    });
    return NextResponse.json(recipes);
}

export async function POST(request) {
    const body = await request.json();

    const required = ["name", "description", "prepTime", "cookTime", "servings", "category", "cuisine", "difficulty", "ingredients"];
    const missing = required.filter(field => body[field] === undefined || body[field] === "");

    if (missing.length > 0) {
        return NextResponse.json(
            { error: `Missing required fields: ${missing.join(", ")}` },
            { status: 400 }
        );
    }

    const newRecipe = await recipesRepo.create(body);
    return NextResponse.json(newRecipe, { status: 201 });
}
