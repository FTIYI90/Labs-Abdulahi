import "./globals.css";
import NavBar from "@/app/components/NavBar";

export const metadata = {
    title: "RecipeVault",
    description: "Assignment 4 - Next.js Frontend with Server Actions"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <NavBar />
                {children}
            </body>
        </html>
    );
}
