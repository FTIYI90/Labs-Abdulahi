/* =================================
   MyFinance Account Manager
   Lab 6 - Part B
   ================================= */

// In Lab 5 you built a budget calculator using plain objects and arrays.
// Now you'll refactor it to use classes and add localStorage so data
// survives page refreshes.


// ---- Task 1: Transaction Class ----
// Create a Transaction class with:
//   constructor(description, amount, type, category)
//   format() - returns "+5,000 QAR" or "-350 QAR"
//   isExpense() - returns true/false
//   isIncome() - returns true/false

// TODO: Define Transaction class here



// ---- Task 2: AccountManager Class ----
// Create an AccountManager class with:
//   constructor() - sets storageKey to "myfinance-transactions",
//                   loads transactions from localStorage (or starts with [])
//   add(description, amount, type, category) - creates Transaction, pushes, saves
//   remove(index) - removes transaction at index, saves
//   getAll() - returns the array
//   clear() - empties array, saves
//   save() - saves to localStorage with JSON.stringify
//   getTotals() - returns { income, expenses, balance, count }
//   getCategorySummary() - returns an object like { "Food": 850, "Housing": 4500, ... }
//                          (only expense categories)
//   getSavingsRate() - returns the savings rate as a string like "35.5"

// TODO: Define AccountManager class here



// TODO: Create an instance: const manager = new AccountManager();



// ---- Task 3: updateDashboard() ----
// Call manager.getTotals() and manager.getSavingsRate()
// Update: #total-income, #total-expenses, #total-balance, #savings-rate
// Color balance green/red based on positive/negative.

// TODO: Write updateDashboard()



// ---- Task 4: renderTransactions() ----
// Get all transactions from manager.
// Map each to a table row with 5 columns: description, category, type, amount, delete button.
// The delete button should call a deleteTransaction(index) function.
// Show empty message if no transactions.

// TODO: Write renderTransactions()



// TODO: Write deleteTransaction(index) - calls manager.remove(index), refreshes display



// ---- Task 5: renderCategorySummary() ----
// Call manager.getCategorySummary().
// Use Object.entries() to loop through categories.
// Create a card for each category showing the name and total spent.

// TODO: Write renderCategorySummary()



// ---- Task 6: Event Listeners ----
// Form submit: read all 4 inputs, call manager.add(), refresh all displays, reset form.
// Clear button: call manager.clear(), refresh all displays.
// Page load: call all three render/update functions.

// TODO: Add form submit listener on #transaction-form



// TODO: Add clear button listener on #clear-btn



// TODO: Call updateDashboard(), renderTransactions(), renderCategorySummary() on page load

