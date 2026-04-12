# Module 4: Client Components and Interactivity

**Time limit: 7 minutes**

## Concepts

Server Components can't respond to user actions. When you need clicks, typing, dropdowns, or any browser interaction, you create a Client Component by adding `"use client"` as the very first line of the file.

Client Components run in the browser, so they can't import server-only code like `fs` or your `lib/data.js`. Instead, they fetch data from your API routes using `fetch()`.

`useState` holds values that change over time (the selected filter, loaded data). `useEffect` runs side effects after the component renders - typically for fetching data on page load. The empty dependency array `[]` means "run once on mount."

When state changes, React re-renders the component automatically. No manual DOM updates needed.

## Key Syntax

```jsx
"use client";

import { useState, useEffect } from "react";

export default function MyPage() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        async function loadItems() {
            const res = await fetch("/api/items");
            const data = await res.json();
            setItems(data);
        }
        loadItems();
    }, []);

    const filtered = filter === "all"
        ? items
        : items.filter(item => item.type === filter);

    return (/* JSX using filtered */);
}
```

Controlled select element:
```jsx
<select value={filter} onChange={(e) => setFilter(e.target.value)}>
    <option value="all">All</option>
    <option value="typeA">Type A</option>
</select>
```

## Exercises

### Exercise 1: Create the Transactions Page

Create `app/transactions/page.jsx`. Complete the TODOs:

1. Add `"use client"` as the first line
2. Import `useState` and `useEffect` from `"react"`
3. Create state for `transactions` (starts as `[]`) and `filterType` (starts as `"all"`)
4. Use `useEffect` to fetch from `"/api/transactions"` and store the result with `setTransactions`
5. Pass an empty dependency array `[]` to useEffect

### Exercise 2: Add the Filter Dropdown

Still in the transactions page:

1. Compute `filtered` - if filterType is "all", use all transactions, otherwise filter by type
2. Add a `<select>` with value tied to `filterType` and onChange calling `setFilterType`
3. Include options for "All", "Income", and "Expense"
4. Use `htmlFor` (not `for`) on the label

### Exercise 3: Render the Filtered Table

Below the filter dropdown:

1. Render a `<table>` with headers: Description, Category, Type, Amount, Date
2. Use `filtered.map()` to render rows (not `transactions.map()`)
3. Add `key={t.id}` to each row
4. Format amount with `.toLocaleString()` and " QAR"
5. Use a ternary to add `"text-success"` for income, `"text-danger"` for expense on the amount cell

## Expected Output

Navigate to `/transactions`:
- Page loads and shows all transactions in a table
- Dropdown defaults to "All"
- Selecting "Income" instantly filters to only income transactions
- Selecting "Expense" shows only expenses
- Switching back to "All" restores the full list
- Income amounts appear green, expense amounts appear red

## Self-Check

- [ ] Is `"use client"` the very first line of the file (before any imports)?
- [ ] Did you use `fetch("/api/transactions")`, not import from `lib/data.js`?
- [ ] Does useEffect have an empty `[]` dependency array?
- [ ] Does the select's `onChange` call `setFilterType` (not modify DOM directly)?
- [ ] Does the table render from `filtered` (not `transactions`)?
- [ ] Does changing the dropdown immediately update the table without a page reload?
