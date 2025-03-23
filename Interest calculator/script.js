const principal = document.getElementById('principal');
const rate = document.getElementById('rate');
const years = document.getElementById('years');
const calculate = document.getElementById('calculate');
const result = document.getElementById('result');

calculate.addEventListener('click', () => {
    const p = parseFloat(principal.value);
    const r = parseFloat(rate.value);
    const y = parseFloat(years.value);
    const interest = (p * r * y) / 100;

    ctgood =1;
    if(p <= 0 || isNaN(p)){
        result.textContent = 'Please enter a valid principal amount.';
        ctgood =0;
        const principalLabel = principal.nextElementSibling;
        principalLabel.style.color = 'rgb(255, 0, 0)';
        principal.nextElementSibling.nextElementSibling.style.backgroundColor = 'rgb(255, 0, 0)';
    }

    if(r <= 0 || isNaN(r)){
        result.textContent = 'Please enter a valid interest rate.';
        ctgood =0;
        const rateLabel = rate.nextElementSibling;
        rateLabel.style.color = 'rgb(255, 0, 0)';
        rate.nextElementSibling.nextElementSibling.style.backgroundColor = 'rgb(255, 0, 0)';
    }

    if(y <= 0 || isNaN(y)){
        result.textContent = 'Please enter a valid number of years.';
        ctgood =0;
        const yearsLabel = years.nextElementSibling;
        yearsLabel.style.color = 'rgb(255, 0, 0)';
        years.nextElementSibling.nextElementSibling.style.backgroundColor = 'rgb(255, 0, 0)';
    }
     if(ctgood ==1){
    result.textContent = `Interest after ${y} years is ${interest.toFixed(2)}$`;
    result.style.display = 'block';
    }
});