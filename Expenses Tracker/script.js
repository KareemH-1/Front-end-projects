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
    var description = descriptionInput ? descriptionInput.value.trim() : "";
    var category = categoryInput ? categoryInput.value : "";

    if (name === "" || isNaN(amount)) {
        alert("Please enter valid details.");
        return;
    }

    if (amount <= 0) {
        alert("Amount must be greater than 0.");
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
    if (type === "expense" && descriptionInput) {
        descriptionInput.value = "";
    }
    setDefaultDate();
}

function addTransactionToTable(transaction) {
    var tableId = transaction.type === "expense" ? "expense-list" : "income-list";
    var table = document.getElementById(tableId);
    var row = table.insertRow(0);

    row.insertCell(0).innerText = transaction.name;
    row.insertCell(1).innerText = "$" + transaction.amount.toFixed(2);

    if (transaction.type === "expense") {
        row.insertCell(2).innerText = transaction.description;
        row.insertCell(3).innerText = transaction.category;
    }

    var dateCellIndex = transaction.type === "expense" ? 4 : 2;
    row.insertCell(dateCellIndex).innerText = transaction.date;

    var deleteCell = row.insertCell(dateCellIndex + 1);
    var deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "delete-btn";
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
        var transaction = transactions[i];
        balance += transaction.type === "income" ? transaction.amount : -transaction.amount;
    }

    var balanceElement = document.getElementById("current-balance");
    balanceElement.innerHTML = `<span id="balance-sign">$</span> ${balance.toFixed(2)}`;

    var balanceSign = document.getElementById("balance-sign");

    if (balance < 0) {
        balanceElement.style.color = "red";
        balanceSign.style.color = "red";
        balanceElement.innerHTML += ' <small>(in debt)</small>';
    } else if (balance > 0) {
        balanceElement.style.color = "green";
        balanceSign.style.color = "green";
    } else {
        balanceElement.style.color = "";
        balanceSign.style.color = "";
    }
}

function deleteTransaction(transaction, row) {
    var transactions = getTransactions();
    var filteredTransactions = transactions.filter(t => 
        !(t.name === transaction.name &&
          t.amount === transaction.amount &&
          t.date === transaction.date &&
          t.type === transaction.type)
    );

    saveTransactions(filteredTransactions);
    row.remove();
    updateBalance();
}

function setDefaultDate() {
    var today = new Date().toISOString().split("T")[0];
    document.getElementById("income-date").value = today;
    document.getElementById("expense-date").value = today;
}

document.getElementById("export-btn").addEventListener("click", function () {
    var transactions = getTransactions();
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(transactions);

    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "transactions.xlsx");
});
