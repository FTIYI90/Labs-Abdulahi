export default function Home() {
    return (
        <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: "720px", margin: "3rem auto", padding: "0 1.5rem", lineHeight: 1.6 }}>
            <h1>RecipeVault API</h1>
            <p>Assignment 3 - your job is to build the backend for the RecipeVault client.</p>
            <h2>Endpoints you must build</h2>
            <ul>
                <li><code>GET /api/recipes</code> - return all recipes (support <code>?category=</code> and <code>?search=</code>)</li>
                <li><code>POST /api/recipes</code> - create a new recipe (validate required fields)</li>
                <li><code>GET /api/recipes/[id]</code> - return one recipe or 404</li>
                <li><code>PUT /api/recipes/[id]</code> - update a recipe or 404</li>
                <li><code>DELETE /api/recipes/[id]</code> - delete a recipe or 404</li>
                <li><code>GET /api/recipes/stats</code> - totals, averages, counts by category &amp; difficulty</li>
            </ul>
            <h2>Provided client</h2>
            <p>Open <a href="/client/">the RecipeVault client</a> - it's already wired to your future endpoints. It won't work until you implement them.</p>
        </main>
    );
}
