// Initialize the expense tracker
let expenses = [];

// Function to render expenses to the table
function renderExpenses() {
    const expenseTableBody = document.getElementById("expense-table-body");
    expenseTableBody.innerHTML = ''; // Clear existing expenses
    let totalAmount = 0;

    expenses.forEach((expense, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>${expense.amount.toFixed(2)}</td>
            <td>${new Date(expense.date).toLocaleDateString()}</td>
            <td><button class="edit-btn" onclick="editExpense(${index})">Edit</button></td>
            <td><button class="delete-btn" onclick="deleteExpense(${index})">Delete</button></td>
        `;
        expenseTableBody.appendChild(row);
        totalAmount += expense.amount;
    });

    document.getElementById("total-amount").innerText = `${totalAmount.toFixed(2)}`;
}

// Function to add an expense
document.getElementById("add-btn").addEventListener("click", () => {
    const category = document.getElementById("category-select").value;
    const amount = parseFloat(document.getElementById("amount-input").value);
    const date = document.getElementById("date-input").value;

    if (!category || isNaN(amount) || !date) {
        alert("Please fill in all fields.");
        return;
    }

    expenses.push({ category, amount, date });
    renderExpenses();
    clearInputs();
});

// Function to clear input fields
function clearInputs() {
    document.getElementById("amount-input").value = '';
    document.getElementById("date-input").value = '';
}

// Function to delete an expense
function deleteExpense(index) {
    if (confirm("Are you sure you want to delete this expense?")) {
        expenses.splice(index, 1);
        renderExpenses();
    }
}

// Function to edit an expense
function editExpense(index) {
    const expense = expenses[index];
    document.getElementById("category-select").value = expense.category;
    document.getElementById("amount-input").value = expense.amount;
    document.getElementById("date-input").value = expense.date;

    deleteExpense(index); // Remove the expense after filling the form
}

// Function to filter expenses by date
document.getElementById("filter-btn").addEventListener("click", () => {
    const startDate = new Date(document.getElementById("start-date-input").value);
    const endDate = new Date(document.getElementById("end-date-input").value);

    if (isNaN(startDate) || isNaN(endDate)) {
        alert("Please fill in both dates.");
        return;
    }

    const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= startDate && expenseDate <= endDate;
    });

    renderFilteredExpenses(filteredExpenses);
});

// Function to render filtered expenses
function renderFilteredExpenses(filteredExpenses) {
    const expenseTableBody = document.getElementById("expense-table-body");
    expenseTableBody.innerHTML = ''; // Clear existing expenses
    let totalAmount = 0;

    filteredExpenses.forEach((expense, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>${expense.amount.toFixed(2)}</td>
            <td>${new Date(expense.date).toLocaleDateString()}</td>
            <td><button class="edit-btn" onclick="editExpense(${index})">Edit</button></td>
            <td><button class="delete-btn" onclick="deleteExpense(${index})">Delete</button></td>
        `;
        expenseTableBody.appendChild(row);
        totalAmount += expense.amount;
    });

    document.getElementById("total-amount").innerText = `${totalAmount.toFixed(2)}`;
}

// Function to remove filters
document.getElementById("remove-filter-btn").addEventListener("click", () => {
    renderExpenses(); // Re-render all expenses
    document.getElementById("start-date-input").value = '';
    document.getElementById("end-date-input").value = '';
});

// Function to sort expenses by amount
document.getElementById("sort-btn").addEventListener("click", () => {
    expenses.sort((a, b) => a.amount - b.amount);
    renderExpenses();
});

// Initial render
renderExpenses();
