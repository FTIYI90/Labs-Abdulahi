import { NextResponse } from "next/server";
import recipesRepo from "@/repos/RecipesRepo";

export async function GET(request, { params }) {
    const { id } = await params;
    const recipe = await recipesRepo.getById(id);

    if (!recipe) {
        return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    return NextResponse.json(recipe);
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const body = await request.json();
    const updated = await recipesRepo.update(id, body);

    if (!updated) {
        return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const success = await recipesRepo.delete(id);

    if (!success) {
        return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Recipe deleted" });
}
