# 📊 Expense Tracker
# Expense Tracker

An Expense Tracker app that allows users to track their expenses, categorize them, and filter them based on dates. The app supports sorting expenses by amount or date, editing and deleting individual entries, and viewing the total amount spent.

## Features

- **Add Expenses**: Add new expenses by selecting a category, entering an amount, and specifying the date.
- **Edit Expenses**: Edit any existing expense by selecting an expense to modify and updating the fields.
- **Delete Expenses**: Remove any expense from the list.
- **Sort Expenses**:
  - Sort expenses by amount (ascending or descending).
  - Sort expenses by date (ascending or descending).
- **Filter by Date**: Filter expenses within a date range.
- **Total Amount**: View the total sum of all recorded expenses.

## Demo

- **Add Expense**: Select a category, enter an amount, and date, then click "Add."
- **Edit Expense**: Click "Edit" next to any expense to modify it.
- **Delete Expense**: Click "Delete" next to any expense to remove it.
- **Sort**: Click on "Sort by Amount" or "Sort by Date" to sort expenses.
- **Filter**: Use the filter section to show expenses between selected start and end dates.

## Technologies Used

- **HTML**: Basic structure of the app (form, table, buttons).
- **CSS**: Basic styles for the app (colors, table styling, buttons).
- **JavaScript**: Handles the main logic for adding, editing, deleting, sorting, and filtering expenses.

## How It Works

### Expense Addition:
- When an expense is added, it's stored temporarily within the current session (no persistent storage).
- The expense data includes the category, amount, and date of the expense.

### Expense Editing:
- Editing an expense is done by clicking the "Edit" button. The existing expense is removed, and the fields are pre-populated for updating.

### Expense Deletion:
- Deleting an expense removes the corresponding row from the expense list.

### Sorting:
- Clicking on "Sort by Amount" will toggle between ascending and descending order based on the expense amount.
- Clicking on "Sort by Date" will toggle between ascending and descending order based on the expense date.

### Date Filtering:
- Users can filter expenses by specifying a start date and end date. Only expenses that fall within this range are shown.

## Requirements

This application runs entirely in the browser and requires no backend or database. It stores data temporarily in the current session.
