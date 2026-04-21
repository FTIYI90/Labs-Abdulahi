# Module 3: Reusable Components and Props

**Time limit: 7 minutes**

## Concepts

Props let you pass data from a parent component to a child component. Think of props as function arguments - the parent decides what data to send, and the child decides how to render it.

You destructure props directly in the function signature: `function Card({ title, amount })` instead of `function Card(props)` and then `props.title`. Same result, cleaner code.

Conditional rendering in JSX uses JavaScript ternary expressions. You can conditionally apply CSS classes, show/hide elements, or display different text based on data values.

## Key Syntax

```jsx
// Child component with destructured props
export default function Card({ title, value }) {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    );
}
```

```jsx
// Parent passing props
import Card from "../components/Card.jsx";

<Card title="Revenue" value="5,000 QAR" />
```

Conditional rendering:
```jsx
<p className={amount > 0 ? "text-success" : "text-danger"}>
    {amount.toLocaleString()} QAR
</p>
```

## Exercises

### Exercise 1: Create the AccountCard Component

Create `app/components/AccountCard.jsx`. Complete the TODOs:

1. Accept `{ account }` as a destructured prop
2. Return a `<div>` with `className="account-card"`
3. Display the account name in an `<h3>` and type in a `<p>`
4. Show the balance formatted with `.toLocaleString()` and " QAR"
5. Use a ternary to add `"text-success"` class when balance is positive
6. Show the status in a `<span>` with a dynamic badge class

### Exercise 2: Refactor the Accounts Page

Open `app/accounts/page.jsx` (provided with the table from Module 2). Refactor it:

1. Import `AccountCard` from `"../components/AccountCard.jsx"`
2. Replace the table with a `<div className="dashboard-grid">`
3. Use `accounts.map()` to render an `<AccountCard>` per account
4. Pass `key={account.id}` and `account={account}` to each card

## Expected Output

Navigate to `/accounts`:
- Instead of a table, you see a grid of cards
- Each card shows account name, type, balance, and status
- Positive balances appear in green (the `text-success` class)
- Status badges are color-coded by the `badge--active` / `badge--inactive` class

## Self-Check

- [ ] Does AccountCard destructure `{ account }` in the function signature?
- [ ] Did you use a ternary for conditional className on the balance?
- [ ] Does the accounts page import and render AccountCard (not inline JSX)?
- [ ] Does each AccountCard in the `.map()` have a `key` prop?
- [ ] Can you change AccountCard once and have all cards update?
