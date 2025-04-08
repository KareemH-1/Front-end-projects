const input = document.getElementById('guess');
const submit = document.getElementById('submit');
const result = document.getElementById('result');
const instruction = document.getElementById('instruction');

let level = 1;

let randomNum = findRandomNum();

changeInstruction();


submit.addEventListener('click', () => {
    const guess = parseInt(input.value);
    if (guess === randomNum) {
        result.innerHTML = "Congratulations you found the number";
        result.style.color = "green";
        level *= 10;
        randomNum = findRandomNum();
        changeInstruction();
    } else if (guess < randomNum) {
        result.innerHTML = "Too low";
        result.style.color = "orange";
    } else {
        result.innerHTML = "Too high";
        result.style.color = "red";
    }
});

function changeInstruction() {
    instruction.innerHTML = "Guess a number between 1 and " + (10 * level);
}

function findRandomNum() {
    return Math.floor(Math.random() * (10 * level)) + 1;
}
