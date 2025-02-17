function calculateTip() {
    const bill = parseFloat(document.getElementById('bill').value);
    let tipPercentage = parseFloat(document.getElementById('tip').value);

    if (isNaN(bill) || isNaN(tipPercentage) || bill <= 0 || tipPercentage < 0) {
        document.getElementById('tip-amount').textContent = "Please enter valid values.";
        return;
    }


    const tipAmount = (bill * tipPercentage) / 100;

    document.getElementById('tip-amount').textContent = `Tip: $${tipAmount.toFixed(2)}`;
}
