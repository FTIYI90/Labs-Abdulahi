import { NextResponse } from "next/server";
import recipesRepo from "@/repos/RecipesRepo";

export async function GET() {
    const stats = await recipesRepo.getStats();
    return NextResponse.json(stats);
}
