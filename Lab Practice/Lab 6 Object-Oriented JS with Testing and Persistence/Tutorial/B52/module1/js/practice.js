/* =================================
   Module 1: Classes, Constructors, and Methods
   Run with: node js/practice.js
   ================================= */

// In Lab 5 you used plain objects like { description: "Salary", amount: 5000 }.
// Classes let you create a blueprint with structure AND behavior built in.
// Same concept as Java/Python classes - slightly different syntax.


// ---- Exercise 1: Transaction Class ----
// Create a Transaction class with:
//   constructor(description, amount, type, category)
//     - assigns all four to this.propertyName
//
//   format() method - returns "+5,000 QAR" for income or "-350 QAR" for expense
//     - use toLocaleString() for the comma formatting
//
//   isExpense() - returns true if type is "expense"
//   isIncome()  - returns true if type is "income"

// TODO: Define the Transaction class with constructor and 3 methods

// typescript
/*
   class Transaction {
      String description;
      double amount;
      String type;
      String category;
      constructor(description, amount, type, category) {
         this.description = description;
         this.amount = amount;
         this.type = type;
         this.category = category;
      }
      String getType(){
         return type; 
      }
}
*/

class Transaction {
   constructor(description, amount, type, category) {
      this.description = description;
      this.amount = amount;
      this.type = type;
      this.category = category;
   }
   format() {
      const sign = this.type === "income" ? "+" : "-"
      return `${sign} ${this.amount} QAR`;
   }

   isExpense() {
      return this.type === "expense"
   }
   isIncome() {
      return this.type === "income";
   }
}


// Test:
const t1 = new Transaction("Salary", 8000, "income", "Salary");
const t2 = new Transaction("Rent", 3500, "expense", "Housing");
console.log(t1.format());       // +8,000 QAR
console.log(t2.format());       // -3,500 QAR
console.log(t1.isIncome());     // true
console.log(t2.isExpense());    // true


// ---- Exercise 2: Account Class with Methods ----
// Create an Account class with:
//   constructor(name, type, balance)
//     - also sets this.createdAt = new Date().toLocaleDateString()
//
//   deposit(amount)  - adds to balance, logs "Deposited X QAR"
//   withdraw(amount) - subtracts IF enough funds, otherwise logs "Insufficient funds"
//   getBalance()     - returns formatted string like "15,000 QAR"

// TODO: Define the Account class with constructor and 3 methods

class Account {
   constructor(name, type, balance) {
      this.name = name;
      this.type = type;
      this.balance = balance;
      this.createdAt = new Date().toLocaleDateString();

   }
   deposit(amount) {
      this.balance = this.balance + amount;
      return `Deposited ${amount} QAR`
   }

   withdraw(amount) {
      if (amount <= this.balance) {
         this.balance -= amount;
      }
      else {
         return "Insufficient funds";
      }
   }

   getBalance() {
      return `${this.balance.toLocaleString()} QAR`;
   }
}

// Test:
const acc = new Account("Main Checking", "checking", 10000);
console.log("Balance:", acc.getBalance());   // 10,000 QAR
acc.deposit(5000);                           // Deposited 5,000 QAR
console.log("After deposit:", acc.getBalance());
acc.withdraw(3000);                          // Withdrew 3,000 QAR
console.log("After withdraw:", acc.getBalance());
acc.withdraw(50000);                         // Insufficient funds


// ---- Exercise 3: BudgetCategory with toString ----
// Create a BudgetCategory class with:
//   constructor(name, budgeted, spent = 0)
//     - if budgeted is negative, set it to 0
//
//   addSpending(amount) - increases spent
//   getRemaining()      - returns budgeted - spent
//   isOverBudget()      - returns true if spent > budgeted
//   toString()          - returns "Food: 1,200 / 2,000 QAR"
//
// toString() is special - JS calls it automatically in string contexts like template literals.

// TODO: Define the BudgetCategory class
class BudgetCategory {
   constructor(name, budgeted, spent = 0) {
      this.name = name;
      this.budgeted = budgeted < 0 ? 0 : budgeted;
      this.spent = spent;
   }
   addSpending(amount) {
      this.spent += amount;
   }
   getRemaining() {
      return this.budgeted - this.spent;
   }
   isOverBudget() {
      return this.spent > this.budgeted;
   }
   toString() {
      return `${this.name}: ${this.spent} / ${this.budgeted} QAR`;
   }
}

// Test:
const food = new BudgetCategory("Food", 2000);
food.addSpending(800);
food.addSpending(400);
console.log(`${food}`);                    // Food: 1,200 / 2,000 QAR
console.log("Over budget?", food.isOverBudget()); // false
food.addSpending(1000);
console.log(`${food}`);                    // Food: 2,200 / 2,000 QAR
console.log("Over budget?", food.isOverBudget()); // true
