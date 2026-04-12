// =================================
// MyFinance Vanilla JS Client
// =================================

// ---------- API helpers ----------

async function fetchJSON(url) {
    const res = await fetch(url);
    return await res.json();
}

async function deleteItem(resource, id) {
    const res = await fetch(`/api/${resource}/${id}`, { method: "DELETE" });
    return res.ok;
}

// ---------- Formatting ----------

function formatAmount(n) {
    return Number(n).toLocaleString() + " QAR";
}

function signedAmount(t) {
    const sign = t.type === "income" ? "+" : "-";
    return `${sign}${t.amount.toLocaleString()} QAR`;
}

// ---------- Dashboard ----------

async function loadDashboard() {
    const [transactions, budgets] = await Promise.all([
        fetchJSON("/api/transactions"),
        fetchJSON("/api/budgets")
    ]);

    const totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;
    const totalBudgeted = budgets.reduce((sum, b) => sum + b.budgeted, 0);

    const grid = document.querySelector("#summary-grid");
    grid.innerHTML = `
        ${summaryCardHTML("Total Income", totalIncome, "success")}
        ${summaryCardHTML("Total Expenses", totalExpenses, "danger")}
        ${summaryCardHTML("Balance", balance, "warning")}
        ${summaryCardHTML("Monthly Budget", totalBudgeted, "primary")}
    `;

    const recent = transactions.slice(-5).reverse();
    const tbody = document.querySelector("#recent-transactions-body");
    tbody.innerHTML = recent.map(t => recentRowHTML(t)).join("");
}

function summaryCardHTML(title, amount, variant) {
    return `
        <div class="card card--${variant}">
            <h3>${title}</h3>
            <p class="amount">${formatAmount(amount)}</p>
        </div>
    `;
}

function recentRowHTML(t) {
    const amountClass = t.type === "income" ? "text-success" : "text-danger";
    return `
        <tr>
            <td>${t.description}</td>
            <td>${t.category}</td>
            <td><span class="badge badge--${t.type}">${t.type}</span></td>
            <td class="${amountClass}">${signedAmount(t)}</td>
            <td>${t.date}</td>
        </tr>
    `;
}

// ---------- Transactions ----------

let transactions = [];
let filterType = "all";

async function loadTransactions() {
    transactions = await fetchJSON("/api/transactions");
    renderTransactions();

    document.querySelector("#type-filter").addEventListener("change", (e) => {
        filterType = e.target.value;
        renderTransactions();
    });
}

function renderTransactions() {
    const filtered = filterType === "all"
        ? transactions
        : transactions.filter(t => t.type === filterType);

    const tbody = document.querySelector("#transactions-body");
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="empty-state">No transactions</td></tr>`;
        return;
    }
    tbody.innerHTML = filtered.map(t => transactionRowHTML(t)).join("");

    // Re-attach delete listeners after innerHTML wiped them out
    document.querySelectorAll(".delete-transaction").forEach(btn => {
        btn.addEventListener("click", () => handleDeleteTransaction(Number(btn.dataset.id)));
    });
}

function transactionRowHTML(t) {
    const amountClass = t.type === "income" ? "text-success" : "text-danger";
    return `
        <tr>
            <td>${t.description}</td>
            <td>${t.category}</td>
            <td><span class="badge badge--${t.type}">${t.type}</span></td>
            <td class="${amountClass}">${signedAmount(t)}</td>
            <td>${t.date}</td>
            <td>
                <button class="btn btn--small btn--danger delete-transaction" data-id="${t.id}">
                    Delete
                </button>
            </td>
        </tr>
    `;
}

async function handleDeleteTransaction(id) {
    if (!confirm("Delete this transaction?")) return;
    if (await deleteItem("transactions", id)) {
        transactions = transactions.filter(t => t.id !== id);
        renderTransactions();
    }
}

// ---------- Budgets ----------

let budgets = [];
let searchTerm = "";

async function loadBudgets() {
    budgets = await fetchJSON("/api/budgets");
    renderBudgets();

    document.querySelector("#search").addEventListener("input", (e) => {
        searchTerm = e.target.value;
        renderBudgets();
    });
}

function renderBudgets() {
    const filtered = budgets.filter(b =>
        b.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const grid = document.querySelector("#budgets-grid");
    if (filtered.length === 0) {
        grid.innerHTML = `<div class="empty-state">No budgets match your search</div>`;
        return;
    }
    grid.innerHTML = filtered.map(b => budgetCardHTML(b)).join("");

    // Re-attach delete listeners after innerHTML wiped them out
    document.querySelectorAll(".delete-budget").forEach(btn => {
        btn.addEventListener("click", () => handleDeleteBudget(Number(btn.dataset.id)));
    });
}

function budgetCardHTML(b) {
    const percentage = Math.round((b.spent / b.budgeted) * 100);
    const color = percentage > 90 ? "danger" : percentage > 70 ? "warning" : "success";
    const width = Math.min(percentage, 100);

    return `
        <div class="budget-card">
            <h3>${b.category}</h3>
            <div class="amounts">
                <span>Spent: ${formatAmount(b.spent)}</span>
                <span>Budget: ${formatAmount(b.budgeted)}</span>
            </div>
            <div class="progress-container">
                <div class="progress-bar progress-bar--${color}" style="width: ${width}%"></div>
            </div>
            <p class="text-muted">${percentage}% used</p>
            <div class="card-actions">
                <button class="btn btn--small btn--danger delete-budget" data-id="${b.id}">
                    Delete
                </button>
            </div>
        </div>
    `;
}

async function handleDeleteBudget(id) {
    if (!confirm("Delete this budget?")) return;
    if (await deleteItem("budgets", id)) {
        budgets = budgets.filter(b => b.id !== id);
        renderBudgets();
    }
}
