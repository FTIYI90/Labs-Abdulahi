export const metadata = {
    title: "RecipeVault API",
    description: "Assignment 3 - Next.js Web API for RecipeVault"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
