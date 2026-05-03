import Link from "next/link";
import recipesRepo from "@/repos/RecipesRepo";

export default async function Home() {
    const recipes = await recipesRepo.getAll();
    const total = recipes.length;
    const avgPrep = total === 0 ? 0 : Math.round(recipes.reduce((s, r) => s + r.prepTime, 0) / total);
    const avgCook = total === 0 ? 0 : Math.round(recipes.reduce((s, r) => s + r.cookTime, 0) / total);

    return (
        <main className="page">
            <h1>RecipeVault Dashboard</h1>
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Recipes</h3>
                    <p className="stat-number">{total}</p>
                </div>
                <div className="stat-card">
                    <h3>Avg Prep Time</h3>
                    <p className="stat-number">{avgPrep} min</p>
                </div>
                <div className="stat-card">
                    <h3>Avg Cook Time</h3>
                    <p className="stat-number">{avgCook} min</p>
                </div>
            </div>
            <div className="page-header">
                <h2>Quick Links</h2>
            </div>
            <ul>
                <li><Link href="/recipes">Browse Recipes</Link></li>
                <li><Link href="/recipes/form">Add New Recipe</Link></li>
                <li><a href="/client/index.html">Vanilla Client (Assignment 3 reference)</a></li>
            </ul>
        </main>
    );
}
