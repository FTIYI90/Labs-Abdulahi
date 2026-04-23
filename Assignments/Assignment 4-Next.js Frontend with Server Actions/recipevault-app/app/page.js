// TODO: Build the Dashboard page as a Server Component.
//
// - Load all recipes from the repo on the server (no fetch needed — call the repo directly).
// - Compute summary stats: total number of recipes, average prep time, average cook time.
// - Display the stats inside a "stats-grid" with one "stat-card" per metric.
// - Add navigation links (or buttons) to the recipes list and the add-recipe form.
//
// Reference: the vanilla client's landing page (public/client/index.html) and the
// /api/recipes/stats endpoint show the same metrics — match those.

export default function Home() {
    return (
        <main className="page">
            <h1>RecipeVault</h1>
            <p>TODO: Build the dashboard here</p>
            <p><a href="/client/index.html">Vanilla Client (Assignment 3 reference)</a></p>
        </main>
    );
}
