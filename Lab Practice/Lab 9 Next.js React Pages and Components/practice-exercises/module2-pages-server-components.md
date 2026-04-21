# Module 2: Pages and Server Components

**Time limit: 8 minutes**

## Concepts

Next.js uses file-based routing. A file at `app/accounts/page.jsx` automatically maps to the `/accounts` URL. The file must export a default function component.

Components in Next.js are Server Components by default. They run on the server before sending HTML to the browser. This means they can be `async` and call server-side functions directly (like reading from JSON files). No need for `fetch`, `useState`, or `useEffect`.

When rendering arrays, use `.map()` inside JSX. Every element in the list needs a `key` prop with a unique value so React can track changes efficiently.

## Key Syntax

```jsx
// File: app/some-page/page.jsx -> route: /some-page
import { getData } from "../../lib/data.js";

export default async function SomePage() {
    const items = await getData();

    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
}
```

Template literals in className for dynamic styling:
```jsx
<span className={`badge badge--${item.status}`}>
    {item.status}
</span>
```

## Exercises

### Exercise 1: Create the Accounts Page

Create a new file at `app/accounts/page.jsx`. Complete the TODOs:

1. Import `getAccounts` from `"../../lib/data.js"`
2. Export a default `async` function called `AccountsPage`
3. Await `getAccounts()` to get the accounts array
4. Return a `<main>` with `className="page"`
5. Add an `<h1>` that shows "Accounts" and the count, like `Accounts (4)`

### Exercise 2: Render the Accounts Table

Inside your AccountsPage, add a table that displays all accounts:

1. Create a `<table>` with headers: Name, Type, Balance, Status
2. In `<tbody>`, use `accounts.map()` to render a `<tr>` per account
3. Add `key={account.id}` to each `<tr>`
4. Format balance with `.toLocaleString()` and append " QAR"
5. Wrap status text in a `<span>` with `className={`badge badge--${account.status}`}`

## Expected Output

Navigate to `/accounts` in the browser:
- Page heading shows "Accounts (4)" (or however many are in accounts.json)
- Table displays all accounts with Name, Type, Balance, and Status columns
- Balances are formatted with commas (e.g., "15,000 QAR")
- Status badges show "active" or "inactive" with the matching CSS class

## Self-Check

- [ ] Is the file located at exactly `app/accounts/page.jsx`?
- [ ] Is the component function marked `async`?
- [ ] Did you import from `"../../lib/data.js"` (not from an API route)?
- [ ] Does every `<tr>` in the map have a unique `key` prop?
- [ ] Does the page load without any console errors?
