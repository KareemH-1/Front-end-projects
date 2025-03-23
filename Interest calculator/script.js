const principal = document.getElementById('principal');
const rate = document.getElementById('rate');
const years = document.getElementById('years');
const calculate = document.getElementById('calculate');
const result = document.getElementById('result');

calculate.addEventListener('click', () => {
    const p = parseFloat(principal.value);
    const r = parseFloat(rate.value);
    const y = parseFloat(years.value);
    let isValid = true;
    let errorMessage = "";

    [principal, rate, years].forEach(input => {
        input.nextElementSibling.style.color = "#ccc";
        input.nextElementSibling.nextElementSibling.style.backgroundColor = "#333";
    });

    if (isNaN(p) || p <= 0) {
        errorMessage += "• Please enter a valid principal amount.\n";
        highlightError(principal);
        isValid = false;
    }

    if (isNaN(r) || r <= 0) {
        errorMessage += "• Please enter a valid interest rate.\n";
        highlightError(rate);
        isValid = false;
    }

    if (isNaN(y) || y <= 0) {
        errorMessage += "• Please enter a valid number of years.\n";
        highlightError(years);
        isValid = false;
    }

    if (isValid) {
        let totalAmount = p;
    
        for (let i = 0; i < y; i++) {
            totalAmount += (totalAmount * r) / 100;
        }
    
        const interest = totalAmount - p;
    
        result.innerHTML = `
            Interest after ${y} years is <strong>${interest.toFixed(2)}$</strong> <br>
            Total money after interest is <strong>${totalAmount.toFixed(2)}$</strong>
        `;
        result.style.display = "block";

    }
    else {
        result.textContent = errorMessage.trim();
        result.style.display = "block";
    }
  
});

function highlightError(input) {
    const label = input.nextElementSibling;
    label.style.color = "rgb(255, 0, 0)";
    input.nextElementSibling.nextElementSibling.style.backgroundColor = "rgb(255, 0, 0)";
}
