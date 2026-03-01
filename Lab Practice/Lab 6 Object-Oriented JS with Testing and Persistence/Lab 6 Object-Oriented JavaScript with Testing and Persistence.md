<p align="center">
<strong>Qatar University</strong><br>
College of Engineering - Department of Computer Science and Engineering<br>
<strong>CMPS 350 - Web Development Fundamentals</strong>
</p>

---

# Lab 6: Object-Oriented JavaScript with Testing and Persistence

**Duration:** 120 minutes
**Theme:** Personal Finance Platform - Part 6 of 11
**Prerequisites:** Labs 1-5 completed

---

## Overview

In Lab 5 you built a budget calculator using plain objects and loose functions. That works for small apps, but it gets messy fast. This lab introduces **classes** to organize your code into reusable blueprints with built-in behavior. You already know this concept from Java and Python. JavaScript classes use nearly identical syntax.

You'll also learn **unit testing** with Mocha and Chai, and **localStorage** to persist data across page refreshes.

### What You'll Build

A class-based Account Manager featuring:

- Transaction, Account, and BudgetCategory classes with methods
- Inheritance with SavingsAccount and RecurringTransaction
- Unit tests that verify your classes work correctly
- DOM rendering of class instances with localStorage persistence

### Lab Structure

**Part A: OOP Fundamentals (60 minutes)**
Instructor demonstrates each concept, you practice immediately, repeat.

**Part B: MyFinance Account Manager (60 minutes)**
Refactor Lab 5's budget calculator to use OOP classes and localStorage.

---

## Learning Objectives

By the end of this lab, you will be able to:

- Define classes with constructors and methods
- Use inheritance (`extends`, `super()`) to build class hierarchies
- Write unit tests with Mocha and Chai
- Render class instances to the DOM
- Persist data with `localStorage`, `JSON.stringify`, and `JSON.parse`

---

## Prerequisites

- Labs 1-5 completed (working budget calculator)
- **Node.js** installed - download from [https://nodejs.org](https://nodejs.org) (LTS version)

---

## Getting Started

1. Open the `Startup Code/` folder for this lab
2. **Part A Modules 1-2** run in the terminal: `node js/practice.js`
3. **Part A Module 3** runs with npm: `cd module3` then `npm test`
4. **Part A Module 4** runs in the browser: open `practice.html`
5. **Part B** runs in the browser: open `index.html`

---

# Part A: OOP Fundamentals (60 minutes)

## Module 1: Classes, Constructors, and Methods (15 minutes)

In Lab 5 you created transaction objects like this:

```javascript
const transaction = {
    description: "Rent",
    amount: 4500,
    type: "expense"
};
```

That's a plain object. No built-in behavior, no structure enforcement. Classes give you a blueprint that creates objects with the same shape AND the same methods every time. Same concept as Java's `class Transaction { ... }`.

**JavaScript Class Syntax**

```javascript
class Transaction {
    constructor(description, amount, type, category) {
        this.description = description;
        this.amount = amount;
        this.type = type;
        this.category = category;
    }

    format() {
        const sign = this.type === "income" ? "+" : "-";
        return sign + this.amount.toLocaleString() + " QAR";
    }

    isExpense() {
        return this.type === "expense";
    }
}

const t = new Transaction("Salary", 8000, "income", "Salary");
console.log(t.format());     // +8,000 QAR
console.log(t.isExpense());  // false
```

Key differences from Java:

- No type declarations on parameters. Just names.
- `this.` is required to access properties (like Python's `self.`).
- `constructor` replaces Java's constructor method name.
- No `public`/`private` keywords (JavaScript has them but they're optional).

### Practice (8 minutes)

Open `Startup Code/Part A/module1/js/practice.js` and complete the 3 exercises.
Run with: `node js/practice.js`

**Exercises:**

1. **Transaction class** - constructor with 4 properties, `format()` returns signed amount, `isExpense()` and `isIncome()` return booleans
2. **Account class** - constructor with name/type/balance/createdAt, `deposit()` adds to balance, `withdraw()` checks funds first, `getBalance()` returns formatted string
3. **BudgetCategory class** - constructor with name/budgeted/spent, `addSpending()`, `getRemaining()`, `isOverBudget()`, and `toString()` for template literal display

**Expected output:**

```
+8,000 QAR
-3,500 QAR
true
true
Balance: 10,000 QAR
Deposited 5,000 QAR
After deposit: 15,000 QAR
Withdrew 3,000 QAR
After withdraw: 12,000 QAR
Insufficient funds
Food: 1,200 / 2,000 QAR
Over budget? false
Food: 2,200 / 2,000 QAR
Over budget? true
```

---

## Module 2: Inheritance (15 minutes)

Inheritance lets a child class reuse everything from a parent class and add its own behavior on top. Same as Java's `extends` keyword.

**Inheritance Syntax**

```javascript
class SavingsAccount extends Account {
    constructor(name, balance, profitRate) {
        super(name, "savings", balance);  // calls Account's constructor
        this.profitRate = profitRate;
    }

    applyProfit() {
        const profit = this.balance * this.profitRate;
        this.balance += profit;
        console.log(`Profit earned: ${profit.toLocaleString()} QAR`);
    }
}

const savings = new SavingsAccount("Emergency Fund", 20000, 0.04);
savings.deposit(5000);    // inherited from Account
savings.applyProfit();    // new method
```

Rules:

- `super()` must be the first call in the child constructor. Same rule as Java.
- The child inherits all parent methods automatically.
- Override a method by defining it again in the child. Use `super.methodName()` to call the parent version.

**Method Overriding**

```javascript
class RecurringTransaction extends Transaction {
    constructor(description, amount, type, category, frequency) {
        super(description, amount, type, category);
        this.frequency = frequency;
    }

    format() {
        return super.format() + ` (${this.frequency})`;
    }
}

const salary = new RecurringTransaction("Salary", 8000, "income", "Salary", "monthly");
console.log(salary.format());  // +8,000 QAR (monthly)
```

**instanceof**

```javascript
console.log(salary instanceof Transaction);           // true
console.log(salary instanceof RecurringTransaction);   // true
```

A RecurringTransaction IS a Transaction. Same behavior as Java's `instanceof`.

### Practice (7 minutes)

Open `Startup Code/Part A/module2/js/practice.js` and complete the 3 exercises.
Run with: `node js/practice.js`

**Exercises:**

1. **SavingsAccount extends Account** - constructor calls `super()` with "savings" type, adds `profitRate`, has `applyProfit()` method
2. **RecurringTransaction extends Transaction** - adds `frequency` property, overrides `format()` to append frequency using `super.format()`
3. **instanceof checks** - verify that child instances are recognized as both their own type and their parent type

**Expected output:**

```
Type: savings
Balance: 20,000 QAR
Profit earned: 800 QAR
After profit: 20,800 QAR
+8,000 QAR (monthly)
-45 QAR (monthly)
Is expense? true
salary instanceof Transaction: true
salary instanceof RecurringTransaction: true
savings instanceof Account: true
savings instanceof SavingsAccount: true
regular instanceof RecurringTransaction: false
```

---

## Module 3: Unit Testing with Mocha and Chai (15 minutes)

Writing code is one thing. Proving it works is another. Unit tests are small, automated checks that verify each piece of your code does what it should. If you break something later, the tests catch it immediately.

**Mocha** is the test runner. It organizes tests into groups with `describe()` and individual checks with `it()`.

**Chai** is the assertion library. It gives you `expect()` to check values.

**Test Structure:**

```javascript
const { expect } = require("chai");

describe("Transaction", () => {

    it("should format income with + sign", () => {
        const t = new Transaction("Salary", 8000, "income", "Salary");
        expect(t.format()).to.equal("+8,000 QAR");
    });

    it("should format expense with - sign", () => {
        const t = new Transaction("Rent", 3500, "expense", "Housing");
        expect(t.format()).to.equal("-3,500 QAR");
    });
});
```

Pattern:

- `describe("ClassName", () => { ... })` groups tests for one class
- `it("should do something specific", () => { ... })` defines one test
- `expect(actual).to.equal(expected)` checks the result

### npm (Node Package Manager)

JavaScript doesn't ship with a testing library built in. You need to install one. That's where **npm** comes in.

npm is the package manager for Node.js - think of it like Python's `pip` or Java's Maven. It lets you download and manage third-party libraries (called "packages") that other developers have published. There are packages for everything: testing, web servers, date formatting, database access, you name it.

Every Node project has a `package.json` file at its root. This file is the project's manifest - it lists the project name, version, scripts you can run, and most importantly, which packages the project depends on. When someone else clones your project, they run `npm install` and npm reads `package.json` to download everything needed.

Key commands:

| Command                          | What it does                                                                                                                                    |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm init -y`                  | Creates a new `package.json` with defaults (`-y` skips the interactive questions)                                                           |
| `npm install <pkg>`            | Downloads a package and adds it to `dependencies`                                                                                             |
| `npm install --save-dev <pkg>` | Downloads a package and adds it to `devDependencies` (tools needed only during development, like test frameworks - not shipped to production) |
| `npm test`                     | Runs whatever command is defined under `"scripts" > "test"` in `package.json`                                                               |

Installed packages go into a `node_modules/` folder. This folder can get huge, so you never commit it to git - that's why `.gitignore` files typically include `node_modules/`.

### Setup

Module 3 is a separate Node project. You'll initialize it yourself.

```bash
cd Startup\ Code/Part\ A/module3
npm init -y
npm install --save-dev mocha chai
```

After running these commands, open the generated `package.json`. You'll see mocha and chai listed under `devDependencies`. Now change the `"test"` script so npm knows how to run your tests:

```json
"scripts": {
    "test": "mocha"
}
```

Run `npm test`. Most tests will fail because the test bodies are empty. That's expected - your job is to fill them in.

The classes are already written for you in `js/transaction.js`. Module 3 is about testing, not writing classes.

### Practice (8 minutes)

Open `Startup Code/Part A/module3/test/transaction.spec.js` and fill in the test bodies.
Run with: `npm test`

**Exercises:**

1. **Test Transaction** - verify constructor sets all 4 properties, `format()` returns correct strings for income and expense, `isExpense()`/`isIncome()` return correct booleans
2. **Test Account** - verify `deposit()` increases balance, `withdraw()` decreases balance, `withdraw()` returns `false` when insufficient funds, `getBalance()` returns formatted string
3. **Test SavingsAccount** - verify type is "savings", inherits `deposit()`, `applyProfit()` calculates and adds profit correctly

**Expected output (all passing):**

```
  Transaction
    ✓ should set all properties from constructor
    ✓ should format income with + sign
    ✓ should format expense with - sign
    ✓ should correctly identify transaction type

  Account
    ✓ should increase balance after deposit
    ✓ should decrease balance after withdraw
    ✓ should return false when withdrawing more than balance
    ✓ should return formatted balance string

  SavingsAccount
    ✓ should have type set to savings
    ✓ should inherit deposit from Account
    ✓ should calculate and add profit correctly

  11 passing
```

---

## Module 4: DOM, Events, and LocalStorage (15 minutes)

Time to bring your classes into the browser. This module combines DOM manipulation (Lab 5 Module 4), event handling (Lab 5 Module 5), and adds localStorage for persistence.

**localStorage** is a key-value store built into the browser. It only stores strings, so you convert objects with `JSON.stringify()` and `JSON.parse()`.

**localStorage Basics:**

```javascript
// Save
localStorage.setItem("transactions", JSON.stringify(myArray));

// Load
const saved = localStorage.getItem("transactions");
const data = saved ? JSON.parse(saved) : [];

// Delete
localStorage.removeItem("transactions");
```

Data in localStorage survives page refreshes and browser restarts. It stays until you clear it or the user clears their browser data.

**Rendering Class Instances**

```javascript
const transactions = [
    new Transaction("Salary", 12000, "income", "Salary"),
    new Transaction("Rent", 4500, "expense", "Housing"),
];

document.getElementById("table-body").innerHTML = transactions.map(t => `
    <tr>
        <td>${t.description}</td>
        <td class="${t.isIncome() ? "text-success" : "text-danger"}">${t.format()}</td>
    </tr>
`).join("");
```

The class methods (`format()`, `isIncome()`) do the heavy lifting. Your rendering code stays clean.

### Practice (7 minutes)

Open `Startup Code/Part A/module4/practice.html` in the browser, then edit `js/practice.js`.

**Exercises:**

1. **Render class instances to DOM table** - use `sampleTransactions.map()` to build table rows in `#transaction-table`, using `format()` and `isIncome()` for styling
2. **Form events with dashboard updates** - create a `liveTransactions` array, write `updateDashboard()` and `renderLiveTransactions()`, add a submit listener on the form
3. **localStorage persistence** - load transactions from localStorage on page load, save after every add, add clear button and count button handlers

**Self-Check:**

- [ ] Does Exercise 1 show 5 transactions in the table with colored amounts?
- [ ] Does adding a transaction update the dashboard cards?
- [ ] Do transactions survive a page refresh?
- [ ] Does the clear button remove everything?

---

# Part B: MyFinance Account Manager (60 minutes)

## Task: Refactor Your Dashboard to Use OOP

In Lab 5 you used a plain array and loose functions. Now you'll refactor to use proper classes with localStorage built in.

### Setup

1. Open `Startup Code/Part B/`
2. Open `index.html` in the browser. The HTML and CSS are ready.
3. Open `js/app.js`. This is where you write everything.

### Requirements

Build the account manager by completing these 6 tasks in `js/app.js`:

#### Task 1: Transaction Class

Create a `Transaction` class with:

- `constructor(description, amount, type, category)` - assigns all four properties
- `format()` - returns `"+5,000 QAR"` for income or `"-350 QAR"` for expense
- `isExpense()` - returns `true` if type is `"expense"`
- `isIncome()` - returns `true` if type is `"income"`

#### Task 2: AccountManager Class

Create an `AccountManager` class with:

- `constructor()` - sets `this.storageKey` to `"myfinance-transactions"`, loads transactions from localStorage (or starts with `[]`)
- `add(description, amount, type, category)` - creates a Transaction, pushes it, saves to localStorage, returns the transaction
- `remove(index)` - removes the transaction at the given index, saves
- `getAll()` - returns the transactions array
- `clear()` - empties the array, saves
- `save()` - writes to localStorage with `JSON.stringify`
- `getTotals()` - returns `{ income, expenses, balance, count }` using `filter` + `reduce`
- `getCategorySummary()` - returns an object like `{ "Food": 850, "Housing": 4500 }` (expense categories only)
- `getSavingsRate()` - returns the savings rate as a string like `"35.5"`

Create an instance: `const manager = new AccountManager();`

#### Task 3: updateDashboard()

Call `manager.getTotals()` and `manager.getSavingsRate()`. Update `#total-income`, `#total-expenses`, `#total-balance`, `#savings-rate`. Color the balance green when positive, red when negative.

#### Task 4: renderTransactions()

Get all transactions from the manager. Map each to a table row with 5 columns: description, category, type, amount, and a delete button. The delete button calls `deleteTransaction(index)`. Show an empty message if no transactions exist.

Write `deleteTransaction(index)` to call `manager.remove(index)` and refresh all displays.

#### Task 5: renderCategorySummary()

Call `manager.getCategorySummary()`. Use `Object.entries()` to loop through the categories. Create a card for each category showing the name and total spent in QAR.

#### Task 6: Event Listeners

- Form submit on `#transaction-form`: read description, amount, type, and category from the form. Call `manager.add()`. Refresh all displays. Reset the form.
- Clear button on `#clear-btn`: call `manager.clear()`, refresh all displays.
- Page load: call `updateDashboard()`, `renderTransactions()`, and `renderCategorySummary()`.

### Testing Checklist

- [ ] Add income (e.g., Salary: 12,000 QAR) and verify the cards update
- [ ] Add expenses (e.g., Rent: 4,500 QAR, Groceries: 850 QAR) and verify the balance
- [ ] Savings rate calculates correctly (e.g., 12,000 income - 5,350 expenses = 55.4%)
- [ ] Category summary shows spending breakdown
- [ ] Delete button removes a transaction and updates everything
- [ ] Refresh the page. Transactions should still be there (localStorage).
- [ ] Clear All button removes everything
- [ ] Form resets after each submission

---

## Self-Assessment Checklist

### Classes and OOP

- [ ] I can define a class with a constructor and methods
- [ ] I understand `this` refers to the current instance
- [ ] I can use `extends` and `super()` for inheritance
- [ ] I can override a parent method and call `super.method()`
- [ ] I understand `instanceof` checks

### Unit Testing

- [ ] I can write `describe()` and `it()` blocks
- [ ] I can use `expect().to.equal()` for assertions
- [ ] I can run tests with `npm test`

### localStorage

- [ ] I can save data with `localStorage.setItem()` and `JSON.stringify()`
- [ ] I can load data with `localStorage.getItem()` and `JSON.parse()`
- [ ] I can clear data with `localStorage.removeItem()`

---

## Common Mistakes

| Mistake                                     | Fix                                                                     |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| Forgetting `super()` in child constructor | Must be the first line. JavaScript throws an error without it.          |
| Using `this` before `super()`           | `super()` must come first. Then you can set child properties.         |
| Not calling `new`                         | `Transaction("Rent", 3500)` fails. Must use `new Transaction(...)`. |
| localStorage stores strings only            | Always `JSON.stringify()` when saving, `JSON.parse()` when loading. |
| Tests not finding classes                   | Check the `require()` path matches where your file is.                |
| `expect(x).to.equal(y)` fails for objects | Use `.to.deep.equal()` for objects and arrays.                        |

---

## Submission

This lab is ungraded. No submission required.

---

## Resources

- [MDN JavaScript Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [MDN Inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [Mocha Documentation](https://mochajs.org/)
- [Chai Assertion Library](https://www.chaijs.com/api/bdd/)
- [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## What's Next?

In **Lab 7: Asynchronous JavaScript and Data Visualization**, you'll learn:

- JSON data handling and fetch API
- Async/await for loading external data
- Dynamic chart rendering
- Building a data-driven dashboard

Your class-based architecture from this lab becomes the foundation for everything that follows.

---

**Author:** Abdulahi Hassen
