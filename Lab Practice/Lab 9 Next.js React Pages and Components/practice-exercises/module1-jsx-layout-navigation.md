# Module 1: JSX, Layout, and Navigation

**Time limit: 8 minutes**

## Concepts

React components are functions that return JSX. JSX looks like HTML but it's JavaScript under the hood, so a few things differ: `className` instead of `class`, `htmlFor` instead of `for`, and curly braces `{}` to embed expressions.

Next.js wraps every page in `app/layout.js`. This is where you import global CSS and add shared UI like a nav bar. The `{children}` slot renders whichever page the user navigated to.

The `<Link>` component from `next/link` replaces `<a>` for internal navigation. It does client-side routing, so the page doesn't fully reload when you click a link.

## Key Syntax

```jsx
// A React component
export default function MyComponent() {
    const title = "Hello";
    return <h1 className="heading">{title}</h1>;
}
```

```jsx
// Layout with children
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
```

```jsx
// Client-side navigation
import Link from "next/link";

<Link href="/accounts">Accounts</Link>
```

## Exercises

### Exercise 1: Build the NavBar Component

Open `app/components/NavBar.jsx`. Complete the TODOs:

1. Import `Link` from `"next/link"`
2. Return a `<nav>` with `className="navbar"`
3. Add a `<span>` with `className="brand"` containing "MyFinance"
4. Add a `<ul>` with `className="nav-links"` containing 5 `<li>` elements
5. Each `<li>` wraps a `<Link>` to: `/` (Dashboard), `/accounts`, `/transactions`, `/budgets`, `/goals`

### Exercise 2: Wire Up the Layout

Open `app/layout.js`. Complete the TODOs:

1. Import `"./globals.css"`
2. Import NavBar from `"./components/NavBar.jsx"`
3. Add the metadata object with title "MyFinance" and a description
4. Render `<NavBar />` inside `<body>`, above `{children}`

## Expected Output

After completing both exercises:
- The browser shows a navigation bar at the top with "MyFinance" and 5 links
- Clicking "Dashboard" navigates to `/` without a full page reload
- The home page content renders below the nav bar

## Self-Check

- [ ] Did you use `className` (not `class`) on the nav and span?
- [ ] Did you import Link from `"next/link"` (not react-router)?
- [ ] Does each Link have an `href` prop (not `to`)?
- [ ] Does the layout import and render `<NavBar />` before `{children}`?
- [ ] Does navigation happen without the browser fully reloading?
