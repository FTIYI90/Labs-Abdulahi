import Link from "next/link";

export default function RecipeCard({ recipe, onDelete }) {
    return (
        <div className="recipe-card">
            <img src={recipe.image} alt={recipe.name} className="recipe-card-img" />
            <div className="recipe-card-body">
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>
                <div className="recipe-meta">
                    <span>Prep: {recipe.prepTime} min</span>
                    <span>Cook: {recipe.cookTime} min</span>
                    <span>Serves: {recipe.servings}</span>
                </div>
                <span className={`badge badge-${recipe.difficulty.toLowerCase()}`}>{recipe.difficulty}</span>
            </div>
            <div className="recipe-card-actions">
                <Link href={{ pathname: "/recipes/form", query: recipe }} className="btn btn-primary btn-sm">Edit</Link>
                {onDelete && (
                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(recipe.id)}>Delete</button>
                )}
            </div>
        </div>
    );
}
