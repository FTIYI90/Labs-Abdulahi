import "./globals.css";
// TODO: Import your NavBar component

export const metadata = {
    title: "RecipeVault",
    description: "Assignment 4 - Next.js Frontend with Server Actions"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {/* TODO: Render the NavBar above {children} so it appears on every page */}
                {children}
            </body>
        </html>
    );
}
