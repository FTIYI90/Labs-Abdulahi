import { NextResponse } from "next/server";
import recipesRepo from "@/repos/RecipesRepo";

export async function GET() {
    const recipes = await recipesRepo.getAll();
    const total = recipes.length;

    const sumPrep = recipes.reduce((s, r) => s + r.prepTime, 0);
    const sumCook = recipes.reduce((s, r) => s + r.cookTime, 0);
    const avgPrepTime = total === 0 ? 0 : Math.round((sumPrep / total) * 10) / 10;
    const avgCookTime = total === 0 ? 0 : Math.round((sumCook / total) * 10) / 10;

    const byCategory = {};
    const byDifficulty = {};
    for (const r of recipes) {
        byCategory[r.category] = (byCategory[r.category] || 0) + 1;
        byDifficulty[r.difficulty] = (byDifficulty[r.difficulty] || 0) + 1;
    }

    return NextResponse.json({
        total,
        avgPrepTime,
        avgCookTime,
        byCategory,
        byDifficulty
    });
}
