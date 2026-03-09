/* =================================
   Module 3: Fetch API
   Open practice.html with Live Server
   ================================= */

// ---- Modules 1-2 (Solved): JSON, Promises, Async/Await ----
// Those skills run in the terminal. Now we bring them to the browser.
//
// fetch() returns a Promise. You await the response, then await .json()
// to parse the body. It's a two-step process:
//   const response = await fetch("https://myfinance-api-bay.vercel.app/transactions");
//   const data = await response.json();
//
// IMPORTANT: fetch only works over HTTP, not file://
// Use VS Code Live Server (right-click -> Open with Live Server).


// ---- Exercise 1: Fetch and Display ----
// When #load-btn is clicked:
//   1. Show "Loading..." in #status
//   2. Fetch https://myfinance-api-bay.vercel.app/transactions
//   3. Parse the JSON response
//   4. Render transactions as table rows in #transaction-body
//   5. Update #status to show how many transactions were loaded
//
// Use an async function for the click handler.

// TODO: Add click listener on #load-btn that fetches and displays data
// which elements in my html am i interacting with [reference]
const BASE_URL = "https://myfinance-api-bay.vercel.app/transactions";

const loadBtn = document.querySelector("#load-btn")
const statusText = document.querySelector("#status")
const tbody = document.querySelector("#transaction-body")

// add event listener [form - submit , button -> click , dropdown/input -> change]
loadBtn.addEventListener('click', loadTransactions)

// network call
async function loadTransactions() {
   try {
      statusText.textContent = "Loading..."

      const response = await fetch(BASE_URL);
      const transactions = await response.json();

      // transformation [we want to convert this array into table rows]
      tbody.innerHTML = transactions.map(t => toHtmlRow(t)).join('')

      statusText.textContent = `Loaded ${transactions.length} Transactions...`
   } catch (error) {
      console.error("Error loading transactions:", error);
   }
}

function toHtmlRow(t) {

   const amountClass = t.type === "expense" ? "text-danger" : "text-success"
   return `
      <tr>
         <td>${t.description}</td>
         <td>${t.category}</td>
         <td>${t.type}</td>
         <td class="${amountClass}">${t.amount}</td>
         <td>
            <button onclick="deleteTransaction('${t.id}')" class="btn btn-sm btn-danger">Delete</button>
         </td>
      </tr>
   `
}

async function deleteTransaction(id) {
   try {
      const url = `${BASE_URL}/${id}`;
      const config = { method: "DELETE" };

      await fetch(url, config) //go to delete
      // reload the page
      loadTransactions() //will go to fetch

   } catch (e) {
      console.log(e);

   }
}

// ---- Exercise 2: Fetch, Transform, and Summarize ----
// When #summary-btn is clicked:
//   1. Fetch https://myfinance-api-bay.vercel.app/transactions
//   2. Calculate: total income, total expenses, balance, transaction count
//   3. Display as 4 cards in #summary-cards (use dashboard-grid layout)
//   4. Color the balance card green if positive, red if negative
//  <div class="card card-success">
//                <h3>  </h3>
//                <p class="amount">  </p>
//             </div>

// TODO: Add click listener on #summary-btn

summaryBtn = document.getElementById("summary-btn");
summaryCards = document.getElementById("summary-cards");
summaryBtn.addEventListener("click", summarizeTransactions);

async function summarizeTransactions() {
   const response = await fetch(BASE_URL);
   const transactions = await response.json();

   const totalIncome = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, curr) => sum + curr.amount, 0);

   const totalExpenses = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, curr) => sum + curr.amount, 0);

   const balance = totalIncome - totalExpenses;
   const transactionCount = transactions.length;

   summaryCards.innerHTML = `
            <div class="card card-success">
               <h3> Total Income</h3>
               <p class="amount"> ${totalIncome}</p>
            </div>
            <div class="card card-danger">
               <h3> Total Expenses</h3>
            <p class="amount"> ${totalExpenses}</p>
               
            </div>
            <div class="card card-success">
               <h3> Balance</h3>
            <p class="amount">  ${balance}</p>
               
            </div>
            <div class="card card-warning">
               <h3>Transaction count </h3>
               <p class="amount"> ${transactionCount}</p>
            </div> 
         `
}