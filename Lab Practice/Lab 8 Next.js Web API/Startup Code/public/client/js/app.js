// =================================
// MyFinance Client - App Logic
// =================================

// ============================================
// Section 1: API Helpers - Generic HTTP calls
// ============================================

async function fetchAll(resource) {
    const response = await fetch(`/api/${resource}`);
    return await response.json();
}

async function create(resource, data) {
    const response = await fetch(`/api/${resource}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return await response.json();
}

async function update(resource, id, data) {
    const response = await fetch(`/api/${resource}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return await response.json();
}

async function remove(resource, id) {
    const response = await fetch(`/api/${resource}/${id}`, {
        method: "DELETE"
    });
    return await response.json();
}

// ============================================
// Section 2: State - Global data for each resource
// ============================================

let transactions = [];
let transactionEditingId = null;

let budgets = [];
let budgetEditingId = null;

// ============================================
// Section 3: Helpers - Formatting, navigation
// ============================================

function formatAmount(amount) {
    return Number(amount).toLocaleString() + " QAR";
}

async function loadPage(page) {
    // Fetch the page HTML and inject it
    const response = await fetch(`pages/${page}.html`);
    document.querySelector("#main").innerHTML = await response.text();

    // Update active nav link
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link.textContent.toLowerCase() === page);
    });

    // Wire up the form and load data for the page
    if (page === "transactions") {
        document.querySelector("#transaction-form")
            .addEventListener("submit", handleTransactionSubmit);
        await loadTransactions();
    } else if (page === "budgets") {
        document.querySelector("#budget-form")
            .addEventListener("submit", handleBudgetSubmit);
        await loadBudgets();
    }
}

// ============================================
// Section 4: Transactions Resource
// ============================================

function transactionToHTMLRow(t) {
    return `
        <tr>
            <td>${t.date}</td>
            <td>${t.description}</td>
            <td>${t.category}</td>
            <td><span class="badge badge-${t.type}">${t.type}</span></td>
            <td>${formatAmount(t.amount)}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="startEditTransaction(${t.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${t.id})">Delete</button>
            </td>
        </tr>`;
}

function renderTransactions() {
    const tbody = document.querySelector("#transactions-table-body");
    if (transactions.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="empty-message">No transactions found</td></tr>`;
        return;
    }
    tbody.innerHTML = transactions.map(t => transactionToHTMLRow(t)).join("");
}

async function loadTransactions() {
    try {
        transactions = await fetchAll("transactions");
        renderTransactions();
    } catch (error) {
        console.error("Failed to load transactions:", error);
    }
}

async function handleTransactionSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.amount = Number(data.amount);

    try {
        if (transactionEditingId) {
            await update("transactions", transactionEditingId, data);
            cancelEditTransaction();
        } else {
            await create("transactions", data);
        }
        e.target.reset();
        await loadTransactions();
    } catch (error) {
        console.error("Failed to save transaction:", error);
    }
}

function startEditTransaction(id) {
    const t = transactions.find(t => t.id === id);
    if (!t) return;

    transactionEditingId = id;
    document.querySelector("#txn-description").value = t.description;
    document.querySelector("#txn-amount").value = t.amount;
    document.querySelector("#txn-type").value = t.type;
    document.querySelector("#txn-category").value = t.category;
    document.querySelector("#txn-date").value = t.date;
    document.querySelector("#transactions-form-title").textContent = "Edit Transaction";
    document.querySelector("#transactions-submit-btn").textContent = "Update Transaction";
    document.querySelector("#transactions-cancel-btn").classList.remove("hidden");
}

function cancelEditTransaction() {
    transactionEditingId = null;
    document.querySelector("#transaction-form").reset();
    document.querySelector("#transactions-form-title").textContent = "Add Transaction";
    document.querySelector("#transactions-submit-btn").textContent = "Add Transaction";
    document.querySelector("#transactions-cancel-btn").classList.add("hidden");
}

async function deleteTransaction(id) {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    try {
        await remove("transactions", id);
        await loadTransactions();
    } catch (error) {
        console.error("Failed to delete transaction:", error);
    }
}

// ============================================
// Section 5: Budgets Resource
// ============================================

function budgetToHTMLRow(b) {
    return `
        <tr>
            <td>${b.category}</td>
            <td>${formatAmount(b.budgeted)}</td>
            <td>${formatAmount(b.spent)}</td>
            <td>${b.month} ${b.year}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="startEditBudget(${b.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteBudget(${b.id})">Delete</button>
            </td>
        </tr>`;
}

function renderBudgets() {
    const tbody = document.querySelector("#budgets-table-body");
    if (budgets.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="empty-message">No budgets found</td></tr>`;
        return;
    }
    tbody.innerHTML = budgets.map(b => budgetToHTMLRow(b)).join("");
}

async function loadBudgets() {
    try {
        budgets = await fetchAll("budgets");
        renderBudgets();
    } catch (error) {
        console.error("Failed to load budgets:", error);
    }
}

async function handleBudgetSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.budgeted = Number(data.budgeted);
    data.spent = Number(data.spent);
    data.year = Number(data.year);

    try {
        if (budgetEditingId) {
            await update("budgets", budgetEditingId, data);
            cancelEditBudget();
        } else {
            await create("budgets", data);
        }
        e.target.reset();
        await loadBudgets();
    } catch (error) {
        console.error("Failed to save budget:", error);
    }
}

function startEditBudget(id) {
    const b = budgets.find(b => b.id === id);
    if (!b) return;

    budgetEditingId = id;
    document.querySelector("#budget-category").value = b.category;
    document.querySelector("#budget-budgeted").value = b.budgeted;
    document.querySelector("#budget-spent").value = b.spent;
    document.querySelector("#budget-month").value = b.month;
    document.querySelector("#budget-year").value = b.year;
    document.querySelector("#budgets-form-title").textContent = "Edit Budget";
    document.querySelector("#budgets-submit-btn").textContent = "Update Budget";
    document.querySelector("#budgets-cancel-btn").classList.remove("hidden");
}

function cancelEditBudget() {
    budgetEditingId = null;
    document.querySelector("#budget-form").reset();
    document.querySelector("#budgets-form-title").textContent = "Add Budget";
    document.querySelector("#budgets-submit-btn").textContent = "Add Budget";
    document.querySelector("#budgets-cancel-btn").classList.add("hidden");
}

async function deleteBudget(id) {
    if (!confirm("Are you sure you want to delete this budget?")) return;
    try {
        await remove("budgets", id);
        await loadBudgets();
    } catch (error) {
        console.error("Failed to delete budget:", error);
    }
}

// ============================================
// Section 6: Initialize app
// ============================================

document.addEventListener("DOMContentLoaded", async () => {
    await loadPage("transactions");
});
