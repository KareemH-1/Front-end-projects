document.addEventListener("DOMContentLoaded", function () {
    const result = document.getElementById("result");
    const temperatureInput = document.getElementById("temperature");
    const fromUnit = document.getElementById("from-unit");
    const toUnit = document.getElementById("to-unit");
    const convertButton = document.querySelector("button");

    function convertTemperature(event) {
        event.preventDefault();

        const temperature = parseFloat(temperatureInput.value);
        const from = fromUnit.value;
        const to = toUnit.value;

        if (isNaN(temperature)) {
            result.textContent = "Please enter a valid temperature.";
            result.style.color = "red";
            return;
        }

        if (from === to) {
            result.textContent = "Please select different units for conversion.";
            result.style.color = "red";
            return;
        }

        let convertedTemperature;

        if (from === "celsius") {
            if (to === "fahrenheit") {
                convertedTemperature = (temperature * 9 / 5) + 32;
            } else if (to === "kelvin") {
                convertedTemperature = temperature + 273.15;
            }
        } else if (from === "fahrenheit") {
            if (to === "celsius") {
                convertedTemperature = (temperature - 32) * 5 / 9;
            } else if (to === "kelvin") {
                convertedTemperature = (temperature - 32) * 5 / 9 + 273.15;
            }
        } else if (from === "kelvin") {
            if (to === "celsius") {
                convertedTemperature = temperature - 273.15;
            } else if (to === "fahrenheit") {
                convertedTemperature = (temperature - 273.15) * 9 / 5 + 32;
            }
        } else {
            result.textContent = "Invalid conversion.";
            result.style.color = "red";
            return;
        }

        result.textContent = temperature + "° " + capitalize(from) + " is " + convertedTemperature.toFixed(2) + "° " + capitalize(to);
        result.style.color = "#66FCF1";
    }

    function capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    convertButton.addEventListener("click", convertTemperature);
});
