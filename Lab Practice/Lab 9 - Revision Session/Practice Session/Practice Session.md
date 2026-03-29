# Practice Session: MyFinance Transaction Manager

CMPS 350 | 100 marks | 60 minutes

## Setup

You have `index.html` and `css/styles.css` ready. Write your code in `js/app.js` and fix one missing CSS rule.

Read `index.html` to find the element IDs you need. Open with Live Server. Reset the database before starting: `https://myfinance-api-bay.vercel.app/reset`

## API

Base URL: `https://myfinance-api-bay.vercel.app/transactions`

| Method | Endpoint | Body |
|--------|----------|------|
| GET | `/transactions` | none |
| POST | `/transactions` | `{ description, amount, type, category }` |
| PUT | `/transactions/:id` | `{ description, amount, type, category }` |
| DELETE | `/transactions/:id` | none |

Transaction shape:
```json
{
    "id": 1,
    "description": "Monthly Salary",
    "amount": 12000,
    "type": "income",
    "category": "Salary",
    "date": "2026-03-01"
}
```

`type` is `"income"` or `"expense"`.

## Questions

**Q1 (5 marks)** Fix the `.dashboard-grid` CSS rule in `styles.css` so the summary cards display in a responsive grid layout.

> Hint: `display: grid` with `repeat(auto-fit, minmax(...))`

**Q2 (10 marks)** Write a function `loadTransactions()` that fetches all transactions from the API and displays them in the table. This should run when the page opens.

> Hint: `GET /transactions` with `async/await` and `fetch`

**Q3 (12 marks)** Write a function `updateSummary()` that calculates total income, total expenses, and balance from the transactions array and displays them in the summary cards. Color the balance based on its sign.

> Hint: `.filter()` + `.reduce()` on the transactions array

**Q4 (15 marks)** Write a function `renderTransactions()` that renders the transactions in the table. Each row should show the description, category, type, formatted amount (with +/- and color), and Edit/Delete buttons. Show a message if there are no transactions.

> Hint: `.map()` + `.join("")` to build the table rows as HTML

**Q5 (10 marks)** Write a function `addTransaction(data)` that sends a new transaction to the API and updates the page.

> Hint: `POST /transactions` with `Content-Type: application/json` and `JSON.stringify(data)`

**Q6 (10 marks)** Write a function `updateTransaction(id, data)` that sends updated data to the API for an existing transaction and updates the page.

> Hint: `PUT /transactions/:id` with the same headers and body format as Q5

**Q7 (10 marks)** Write a function `deleteTransaction(id)` that removes a transaction from the API and updates the page.

> Hint: `DELETE /transactions/:id`, then `.filter()` to remove it locally

**Q8 (12 marks)** Write a function `getFilteredTransactions()` that filters the transactions by the search field (description) and the type dropdown. Both filters should work together. Add event listeners so the table re-renders as the user types or changes the dropdown.

> Hint: `.toLowerCase().includes()` for search, listen for `"input"` and `"change"` events

**Q9 (16 marks)** Write functions `startEdit(id)` and `cancelEdit()` to toggle the form between add and edit mode. Clicking Edit on a row should populate the form. Clicking Cancel should reset it. The form submit should call the right function (add or update) based on the current mode.

> Hint: use an `editingId` variable to track whether you're adding or editing

## Provided

```javascript
function refreshAll() {
    updateSummary();
    renderTransactions();
}
```

## Testing

After you finish, the default data should show Income: 15,500 QAR, Expenses: 5,820 QAR, Balance: 9,680 QAR. All CRUD operations, search, filter, and edit/cancel toggling should work.
