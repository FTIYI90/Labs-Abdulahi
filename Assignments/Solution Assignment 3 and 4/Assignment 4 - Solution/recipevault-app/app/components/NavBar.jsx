import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="navbar">
            <Link href="/" className="brand">RecipeVault</Link>
            <ul className="nav-links">
                <li><Link href="/recipes">Recipes</Link></li>
                <li><Link href="/recipes/form">Add Recipe</Link></li>
            </ul>
        </nav>
    );
}
