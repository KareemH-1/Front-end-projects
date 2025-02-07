document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("#buttons-container button");

    let expression = "";
    let lastOperator = false;

    function addButtonListeners() {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", Click);
        }
    }

    function Click() {
        const value = this.innerText;

        if (isNumber(value)) {
            handleNumber(value);
        } else if (isOperator(value)) {
            handleOperator(value);
        } else if (value === "C") {
            clear();
        } else if (value === "=") {
            calculate();
        } else if (value === ".") {
            handleDecimal();
        }
    }

    function handleNumber(value) {
        if (lastOperator) {
            expression += value; // Append the number after an operator
            lastOperator = false;
        } else {
            expression += value; // Continue appending numbers to the expression
        }
        update();
    }

    function handleOperator(value) {
        if (expression === "") return;

        if (lastOperator) {
            expression = expression.slice(0, -1); // Replace the last operator if clicked again
        }

        expression += value;
        lastOperator = true;
        update();
    }

    function handleDecimal() {
        // Find the position of the last operator in the expression
        const lastOperatorIndex = Math.max(expression.lastIndexOf('+'), expression.lastIndexOf('-'), expression.lastIndexOf('x'), expression.lastIndexOf('÷'));
    
        let lastNum;
        if (lastOperatorIndex === -1) {
            lastNum = expression; 
            lastNum = expression.slice(lastOperatorIndex + 1);
        }
    
        // Ensure the last number doesn't already contain a decimal point
        if (!lastNum.includes(".")) {
            expression += ".";
        }
        update();
    }

    function isNumber(value) {
        return !isNaN(value) && value !== " ";
    }

    function isOperator(value) {
        return value === "+" || value === "-" || value === "x" || value === "÷";
    }

    function clear() {
        expression = "";
        lastOperator = false;
        update();
    }

    function calculate() {
        if (expression === "") return;

        try {
            expression = eval(expression.replace("÷", "/").replace("x", "*"));
        } catch {
            expression = "Error";
        }

        lastOperator = false;
        update();
    }

    function update() {
        display.innerText = expression || "0";
        display.scrollLeft = display.scrollWidth; // auto scroll
    }

    addButtonListeners();
});
