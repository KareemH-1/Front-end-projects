document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bmi-form');
    const weightInput = document.getElementById('weight');
    const weightType = document.getElementById('weight-type');
    const heightInput = document.getElementById('height');
    const heightType = document.getElementById('height-type');
    const bmiDisplay = document.getElementById('BMI');
    const weightStatusDisplay = document.getElementById('WeightStatus');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateBMI();
    });

    heightType.addEventListener('change', function() {
        if (heightType.value === 'feet') {
            heightInput.placeholder = 'Enter Height (feet)';
            if (!document.getElementById('inches')) {
                const inchesInput = document.createElement('input');
                inchesInput.type = 'number';
                inchesInput.id = 'inches';
                inchesInput.placeholder = 'Enter Inches';
                inchesInput.min = '0';
                inchesInput.max = '11';
                inchesInput.step = '0.1';
                heightInput.after(inchesInput);
            }
        } else {
            heightInput.placeholder = 'Enter Height (cm)';
            const inchesInput = document.getElementById('inches');
            if (inchesInput) {
                inchesInput.remove();
            }
        }
    });

    function calculateBMI() {
        let weight = parseFloat(weightInput.value);
        let height = parseFloat(heightInput.value);
        
        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            showError('Please enter valid positive values.');
            return;
        }

        if (weightType.value === 'lbs') {
            if (weight > 1000) {
                showError('Weight value is unrealistically high.');
                return;
            }
            weight = weight * 0.453592;
        } else {
            if (weight > 500) {
                showError('Weight value is unrealistically high.');
                return;
            }
        }

        if (heightType.value === 'cm') {
            if (height < 50 || height > 250) {
                showError('Height value is unrealistic.');
                return;
            }
            height = height / 100;
        } else if (heightType.value === 'feet') {
            const inchesInput = document.getElementById('inches');
            const inches = inchesInput ? parseFloat(inchesInput.value) || 0 : 0;
            
            if (height > 9 || (height === 9 && inches > 0)) {
                showError('Height value is unrealistically high.');
                return;
            }
            if (height < 1) {
                showError('Height value is unrealistically low.');
                return;
            }
            
            height = (height * 0.3048) + (inches * 0.0254);
        }

        const bmi = weight / (height * height);
        
        bmiDisplay.textContent = `BMI: ${bmi.toFixed(1)}`;
        
        let status = '';
        let statusClass = '';
        
        if (bmi < 18.5) {
            status = 'Underweight';
            statusClass = 'underweight';
        } else if (bmi >= 18.5 && bmi < 25) {
            status = 'Normal weight';
            statusClass = 'normal';
        } else if (bmi >= 25 && bmi < 30) {
            status = 'Overweight';
            statusClass = 'overweight';
        } else {
            status = 'Obese';
            statusClass = 'obese';
        }
        
        weightStatusDisplay.textContent = status;
        weightStatusDisplay.classList.remove('underweight', 'normal', 'overweight', 'obese');
        weightStatusDisplay.classList.add(statusClass);
    }
    
    function showError(message) {
        bmiDisplay.textContent = message;
        bmiDisplay.style.color = '#e74c3c';
        weightStatusDisplay.textContent = '';
        weightStatusDisplay.classList.remove('underweight', 'normal', 'overweight', 'obese');
        
        setTimeout(() => {
            bmiDisplay.style.color = '#2980b9';
        }, 3000);
    }
});