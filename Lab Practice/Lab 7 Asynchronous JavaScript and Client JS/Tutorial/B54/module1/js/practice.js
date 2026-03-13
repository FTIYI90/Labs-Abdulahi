/* =================================
   Module 1: JSON and Data Transformation
   Run with: node js/practice.js
   ================================= */

// JSON is the standard format for exchanging data on the web.
// It looks like JS objects/arrays, but it's plain text.
// Two key functions: JSON.stringify() and JSON.parse().

const transaction = {
    description: "Salary",
    amount: 8000,
    type: "income",
    category: "Salary"
}

// send this to the server or i want to save it into the localstorage

// I need to convert it into a string
const jsonString = JSON.stringify(transaction)

// console.log(jsonString);
// console.log(transaction);


// convert it back into an object

// const original = JSON.parse(jsonString)
// console.log(original);
// console.log(original.amount);


// ---- Exercise 1: JSON.stringify and JSON.parse ----
// a) Create a transaction object with description, amount, type, category.
// b) Convert it to a JSON string with JSON.stringify() and log it.
// c) Parse it back with JSON.parse() and log the amount property.
// d) Try pretty-printing: JSON.stringify(obj, null, 2)

// TODO: Create an object, stringify, parse, and log



// ---- Exercise 2: Transforming Arrays with map/filter/reduce ----
// Use the transactions array below to:
// a) Get an array of just the descriptions (map)
// b) Get the total of all expenses (filter + reduce)
// c) Get formatted strings like "Salary: +8,000 QAR" (map)
// d) Find the single largest expense (filter expenses, then reduce)

const transactions = [
    { description: "Salary", amount: 8000, type: "income", category: "Salary" },
    { description: "Freelance", amount: 2500, type: "income", category: "Salary" },
    { description: "Rent", amount: 4000, type: "expense", category: "Housing" },
    { description: "Groceries", amount: 650, type: "expense", category: "Food" },
    { description: "Electricity", amount: 280, type: "expense", category: "Utilities" },
    { description: "Dining Out", amount: 350, type: "expense", category: "Food" },
    { description: "Netflix", amount: 45, type: "expense", category: "Entertainment" },
    { description: "Gym", amount: 200, type: "expense", category: "Entertainment" },
];

// TODO: a) Extract just the descriptions into a new array and log it
//   Expected: ["Salary", "Freelance", "Rent", "Groceries", ...]
// filter, foreach, map , reduce .....

// T -> TD
const descriptions = transactions.map(t => t.description)
// console.log(descriptions);

/* [ <li>Salary</li> , <li>Freelance</li> ] */

// const descriptionsList = transactions.map(t => `<li>${t.description}</li>`)
// console.log(descriptionsList.join(' ')); // join to get a single string


/*<tr>
    <td>Salary</td>
    <td>8000</td>
    <td>expense</td>
</tr>*/
const descriptionsRows = transactions.map(t => `
        <tr>
            <td>${t.description}</td>
            <td>${t.category}</td>
            <td>${t.amount}</td>
        </tr>
    `)
// console.log(descriptionsRows.join(' ')); // join to get a single string

// TODO: b) Calculate the total amount of all expenses and log it

// filter the expenses
const total = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)


// console.log(total);

// map, filter [chain]

// find , foreach, reduce [no chain]

// TODO: c) Create an array where each transaction becomes a string like "Salary: +8,000 QAR"
//   Use + for income, - for expenses. Use toLocaleString() for comma formatting.
//   Log the array.


// TODO: d) Find which single expense has the highest amount. Log its description and amount.



// ---- Exercise 3: Grouping Data by Category ----
// Group transactions by category, totaling each.
// Result: { Salary: 10500, Housing: 4000, Food: 1000, ... }
//
// Hint: reduce with an accumulator object. For each transaction,
// add its amount to the existing category total (or start at 0).
// Then log results using Object.entries().

// TODO: Group by category using reduce


// TODO: Log each category with Object.entries().forEach()

// object destructuring
// array destructuring

const person = {
    fname: "Wadha",
    gender: "female",
    major: "CSE"
}

// const fnamex = person.fname
// const genderx = person.fname
// const majorx = person.fname

const { gender, major } = person

// console.log(gender);
// console.log(major);
// console.log(fname);

function displayGenderAndMajor({ fname, major }) {
    console.log(fname);
    console.log(major);
}

displayGenderAndMajor(person)

const numbers = [1, 26, 36, 664, 7775, 3333]
// const first = numbers[0]
// const second = numbers[1]
// const remaining 

const [first, second, ...remaining] = numbers

// console.log(first);
// console.log(second);
// console.log(remaining);
const sorted = numbers.sort((a, b) => b - a)

const [largest, secondL, ..._] = sorted
console.log(largest, secondL);

const obj = Object.entries(person)
const orgi = Object.fromEntries(obj)
console.log(orgi);


console.log(person);
console.log(obj);

obj.forEach(t => console.log(`key : ${t[0]} value : ${t[1]}`))
console.log("------------------");

obj.forEach(([key, value]) => console.log(`key : ${key} value : ${value}`))
