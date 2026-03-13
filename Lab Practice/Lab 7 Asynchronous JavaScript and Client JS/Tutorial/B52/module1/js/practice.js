/* =================================
   Module 1: JSON and Data Transformation
   Run with: node js/practice.js
   ================================= */

// JSON is the standard format for exchanging data on the web.
// It looks like JS objects/arrays, but it's plain text.
// Two key functions: JSON.stringify() and JSON.parse().

// serialize and deserialize data
const transaction = {
    description: "Salary",
    amount: 12000,
    type: "income",
    category: "Salary"
};

// I want to send this object to a server
const json = JSON.stringify(transaction)

console.log(transaction);

console.log(json);

// when we get data from a server
const transaction2 = JSON.parse(json)

// response.json()

console.log(`The object after parsing it `);
console.log(transaction2);

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

// transformation
const descriptions = transactions.map(t => `<tr> 
        <td> ${t.description}</td>
        <td> ${t.category}</td>
        <td> ${t.amount}</td>
    </tr>`).join('');
// console.log(descriptions);


// TODO: b) Calculate the total amount of all expenses and log it
const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0)
console.log(totalExpense);



// const transactions = [
//     { description: "Salary", amount: 8000, type: "income", category: "Salary" },
//     { description: "Freelance", amount: 2500, type: "income", category: "Salary" },
//     { description: "Rent", amount: 4000, type: "expense", category: "Housing" },
//     { description: "Groceries", amount: 650, type: "expense", category: "Food" },
//     { description: "Electricity", amount: 280, type: "expense", category: "Utilities" },
//     { description: "Dining Out", amount: 350, type: "expense", category: "Food" },
//     { description: "Netflix", amount: 45, type: "expense", category: "Entertainment" },
//     { description: "Gym", amount: 200, type: "expense", category: "Entertainment" },
// ];
// give me the transaction with the highest amount [income or expense]
const maxT = transactions.reduce((max, t) => t.amount > max.amount ? t : max);

const minT = transactions.reduce((min, curr) => min.amount < curr.amount ? min : curr);
// 8000 < 2500

console.log('Max Transaction');

console.log(maxT);

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

const person = {
    name: "Maha",
    age: 21,
    gender: "Female",
    major: "CSE",

}
console.log(person);

Object.entries(person).forEach(arr => console.log(`${arr[0]} - ${arr[1]}`));

// destructuring

// const name = person.name;
// const age = person.age;
// const gender = person.gender;

const { gender, name, age } = person
console.log(name, age, gender);


function displayNameAge({ name, age }) {
    console.log(name, age);
}


displayNameAge(person)

const numbers = [100, 99, 55, 69, 27]
// const first = num[0];
// const second = num[1];
const [first, second, ...rest] = numbers

console.log(`Best Student score is ${first}`);


function takeFirst([a, b, third, ...rest]) {
    console.log(third);

}
takeFirst(numbers)


// x= [
//     ["name" , "Maha"]
//     ["age" , 21],
//     ["gender" , "Female"],
// ]

