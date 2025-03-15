document.addEventListener("DOMContentLoaded", function () {
    loadTransactions();
    updateBalance();
    setDefaultDate();

    document.getElementById("income-form").addEventListener("submit", function (event) {
        event.preventDefault();
        addTransaction("income");
    });

    document.getElementById("expense-form").addEventListener("submit", function (event) {
        event.preventDefault();
        addTransaction("expense");
    });
});

function getTransactions() {
    var transactions = localStorage.getItem("transactions");
    if (transactions) {
        return JSON.parse(transactions);
    }
    return [];
}

function saveTransactions(transactions) {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction(type) {
    var nameInput = document.getElementById(type + "-name");
    var amountInput = document.getElementById(type + "-amount");
    var dateInput = document.getElementById(type + "-date");
    var descriptionInput = null;
    var categoryInput = null;

    if (type === "expense") {
        descriptionInput = document.getElementById("expense-description");
        categoryInput = document.getElementById("expense-category");
    }

    var name = nameInput.value.trim();
    var amount = parseFloat(amountInput.value);
    var date = dateInput.value;
    var description = "";
    var category = "";

    if (descriptionInput) {
        description = descriptionInput.value.trim();
    }
    if (categoryInput) {
        category = categoryInput.value;
    }

    if (name === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter valid details.");
        return;
    }

    var transaction = {
        type: type,
        name: name,
        amount: amount,
        date: date,
        description: description,
        category: category
    };

    var transactions = getTransactions();
    transactions.push(transaction);
    saveTransactions(transactions);

    addTransactionToTable(transaction);
    updateBalance();
    nameInput.value = "";
    amountInput.value = "";
    if (descriptionInput) descriptionInput.value = "";
    setDefaultDate();
}

function addTransactionToTable(transaction) {
    var tableId = "income-list";
    if (transaction.type === "expense") {
        tableId = "expense-list";
    }
    var table = document.getElementById(tableId);
    var row = table.insertRow(0);

    row.insertCell(0).innerText = transaction.name;
    row.insertCell(1).innerText = "$" + transaction.amount.toFixed(2);
    
    if (transaction.type === "expense") {
        row.insertCell(2).innerText = transaction.description || "-";
        row.insertCell(3).innerText = transaction.category;
    }
    
    var dateCellIndex = 2;
    if (transaction.type === "expense") {
        dateCellIndex = 4;
    }
    row.insertCell(dateCellIndex).innerText = transaction.date;

    var deleteCellIndex = dateCellIndex + 1;
    var deleteCell = row.insertCell(deleteCellIndex);
    var deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = function () {
        deleteTransaction(transaction, row);
    };
    deleteCell.appendChild(deleteBtn);
}

function loadTransactions() {
    var transactions = getTransactions();
    document.getElementById("income-list").innerHTML = "";
    document.getElementById("expense-list").innerHTML = "";
    for (var i = 0; i < transactions.length; i++) {
        addTransactionToTable(transactions[i]);
    }
}

function updateBalance() {
    var transactions = getTransactions();
    var balance = 0;
    for (var i = 0; i < transactions.length; i++) {
        if (transactions[i].type === "income") {
            balance += transactions[i].amount;
        } else {
            balance -= transactions[i].amount;
        }
    }
    document.getElementById("current-balance").innerText = balance.toFixed(2);
}

function deleteTransaction(transaction, row) {
    var transactions = getTransactions();
    var filteredTransactions = [];
    for (var i = 0; i < transactions.length; i++) {
        if (transactions[i] !== transaction) {
            filteredTransactions.push(transactions[i]);
        }
    }
    saveTransactions(filteredTransactions);
    row.remove();
    updateBalance();
}

function setDefaultDate() {
    document.getElementById("income-date").value = new Date().toISOString().split("T")[0];
    document.getElementById("expense-date").value = new Date().toISOString().split("T")[0];
}