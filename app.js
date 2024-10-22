let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalAmount = 0;
let editingIndex = null; 

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountDisplay = document.getElementById('total-amount');
const addButton = document.getElementById('add-btn');
const sortByDateButton = document.getElementById('sort-by-date-btn'); // Sort by Date button

addButton.addEventListener('click', () => {
    const category = categorySelect.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;

    if (!category || isNaN(amount) || amount <= 0 || !date) {
        alert("Please fill all fields with valid data.");
        return;
    }

    if (editingIndex !== null) {
        expenses[editingIndex] = { category, amount, date };
        editingIndex = null; 
        addButton.textContent = 'Add'; 
    } else {
        expenses.push({ category, amount, date });
    }

    saveExpensesToLocalStorage();
    updateExpenseTable();
    resetInputs();
});

function updateExpenseTable() {
    totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
    
    expenseTableBody.innerHTML = "";

    expenses.forEach((expense, index) => {
        const row = expenseTableBody.insertRow();
        row.insertCell(0).textContent = expense.category;
        row.insertCell(1).textContent = expense.amount.toFixed(2);
        row.insertCell(2).textContent = expense.date;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => editExpense(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => deleteExpense(index));

        row.insertCell(3).appendChild(editButton);
        row.insertCell(4).appendChild(deleteButton);
    });
}

function saveExpensesToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function resetInputs() {
    categorySelect.value = "Grocery"; 
    amountInput.value = "";
    dateInput.value = "";
}

function editExpense(index) {
    const expense = expenses[index];
    categorySelect.value = expense.category;
    amountInput.value = expense.amount;
    dateInput.value = expense.date;
    editingIndex = index; 
    addButton.textContent = 'Update'; 
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    saveExpensesToLocalStorage();
    updateExpenseTable();
}

document.getElementById('sort-btn').addEventListener('click', () => {
    expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
    saveExpensesToLocalStorage(); 
    updateExpenseTable(); 
});

const startDateInput = document.getElementById('start-date-input');
const endDateInput = document.getElementById('end-date-input');
const filterButton = document.getElementById('filter-btn');
const removeFilterButton = document.getElementById('remove-filter-btn');

filterButton.addEventListener('click', () => {
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    if (isNaN(startDate) || isNaN(endDate)) {
        alert('Please select valid start and end dates.');
        return;
    }

    const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= startDate && expenseDate <= endDate;
    });

    updateExpenseTable(filteredExpenses); 
});

removeFilterButton.addEventListener('click', () => {
    updateExpenseTable(); 
    startDateInput.value = ''; 
    endDateInput.value = '';
});

function updateExpenseTable(filteredExpenses = expenses) {
    totalAmount = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
    
    expenseTableBody.innerHTML = "";

    filteredExpenses.forEach((expense, index) => {
        const row = expenseTableBody.insertRow();
        row.insertCell(0).textContent = expense.category;
        row.insertCell(1).textContent = expense.amount.toFixed(2);
        row.insertCell(2).textContent = expense.date;

        const editButton = document.createElement('button');
        editButton.innerHTML = 'Edit <i class="fa-solid fa-pen-clip"></i>';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => editExpense(index));

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete <i class="fa-solid fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => deleteExpense(index));

        row.insertCell(3).appendChild(editButton);
        row.insertCell(4).appendChild(deleteButton);
    });
}

updateExpenseTable();


// client/app.js
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');

// Fetch expenses on initial load
fetchExpenses();