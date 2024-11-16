let expenses = [];
let editingIndex = null; 

function renderExpenses() {
    const expenseTableBody = document.getElementById("expense-table-body");
    expenseTableBody.innerHTML = ''; 
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

document.getElementById("add-btn").addEventListener("click", () => {
    const category = document.getElementById("category-select").value;
    const amount = parseFloat(document.getElementById("amount-input").value);
    const date = document.getElementById("date-input").value;

    if (!category || isNaN(amount) || !date) {
        alert("Please fill in all fields.");
        return;
    }

    if (editingIndex !== null) {
        expenses[editingIndex] = { category, amount, date };
        editingIndex = null; 
        document.getElementById("add-btn").textContent = "Add"; 
    } else {
        expenses.push({ category, amount, date });
    }

    renderExpenses();
    clearInputs();
});

function clearInputs() {
    document.getElementById("category-select").value = '';
    document.getElementById("amount-input").value = '';
    document.getElementById("date-input").value = '';
}

function editExpense(index) {
    const expense = expenses[index];
    document.getElementById("category-select").value = expense.category;
    document.getElementById("amount-input").value = expense.amount;
    document.getElementById("date-input").value = expense.date;

    editingIndex = index; 
    document.getElementById("add-btn").textContent = "Update"; 
}

function deleteExpense(index) {
    if (confirm("Are you sure you want to delete this expense?")) {
        expenses.splice(index, 1);
        renderExpenses();
    }
}

document.getElementById("filter-btn").addEventListener("click", () => {
    const startDateInput = document.getElementById("start-date-input").value;
    const endDateInput = document.getElementById("end-date-input").value;

    if (!startDateInput || !endDateInput) {
        alert("Please fill in both start and end dates.");
        return;
    }

    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);
    const today = new Date();

    if (startDate > endDate) {
        alert("Start date cannot be after end date.");
        return;
    }
    if (startDate > today || endDate > today) {
        alert("Dates cannot be in the future.");
        return;
    }

    const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= startDate && expenseDate <= endDate;
    });

    if (filteredExpenses.length === 0) {
        alert("No expenses found in the selected date range.");
    }

    renderFilteredExpenses(filteredExpenses);
});


function renderFilteredExpenses(filteredExpenses) {
    const expenseTableBody = document.getElementById("expense-table-body");
    expenseTableBody.innerHTML = ''; 
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

document.getElementById("remove-filter-btn").addEventListener("click", () => {
    renderExpenses();
    document.getElementById("start-date-input").value = '';
    document.getElementById("end-date-input").value = '';
});

let isAmountSortedAscending = true; 
let isDateSortedAscending = true;  

document.getElementById("sort-by-amount-btn").addEventListener("click", () => {
    if (isAmountSortedAscending) {
        expenses.sort((a, b) => a.amount - b.amount);
        document.getElementById("sort-by-amount-btn").innerText = "Sort by Amount: Descending";
    } else {
        expenses.sort((a, b) => b.amount - a.amount);
        document.getElementById("sort-by-amount-btn").innerText = "Sort by Amount: Ascending";
    }
    isAmountSortedAscending = !isAmountSortedAscending; 
    renderExpenses(); 
});

document.getElementById("sort-by-date-btn").addEventListener("click", () => {
    if (isDateSortedAscending) {
        expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
        document.getElementById("sort-by-date-btn").innerText = "Sort by Date: Descending";
    } else {
        expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
        document.getElementById("sort-by-date-btn").innerText = "Sort by Date: Ascending";
    }
    isDateSortedAscending = !isDateSortedAscending; 
    renderExpenses(); 
});



renderExpenses();
