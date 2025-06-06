const input = document.getElementById('guess');
const submit = document.getElementById('submit');
const result = document.getElementById('result');
const instruction = document.getElementById('instruction');
const gameContainer = document.getElementById('Game');
const levelP = document.getElementById('level');

let level = 1;
let randomNum = findRandomNum();

changeInstruction();

// Add funny messages
const tooLowMessages = [
    "Too low! Aim higher, champ! 🚀",
    "Nope, think bigger! ⬆️",
    "Higher! The number is blushing from being so underestimated! 😳",
    "Brr, that's too cold... go higher! ❄️",
    "The number feels offended by such a low guess! 😤"
];

const tooHighMessages = [
    "Too high! Come back down to earth! 🌎",
    "Whoa there! Too much! ⬇️",
    "Lower! The number is dizzy from being so overestimated! 😵‍💫",
    "Hot hot hot! Cool it down! 🔥",
    "The number is hiding under the table from such a high guess! 🙈"
];

const correctMessages = [
    "BINGO! You're a mind reader! 🧠✨",
    "CORRECT! Are you psychic or something? 🔮",
    "YOU GOT IT! The number is doing a happy dance! 💃",
    "BOOM! Right on the money! 💰",
    "INCREDIBLE GUESS! The number feels seen! 👀"
];

// Function to get random message from array
function getRandomMessage(messageArray) {
    return messageArray[Math.floor(Math.random() * messageArray.length)];
}

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

submit.addEventListener('click', checkGuess);

function checkGuess() {
    const guess = parseInt(input.value);
    
    if (isNaN(guess) || guess < 1 || guess > (10 * level)) {
        result.innerHTML = `Please enter a number between 1 and ${10 * level}! 🤦‍♂️`;
        result.style.color = "#ef476f";
        shakeElement(gameContainer);
    } else if (guess === randomNum) {
        result.innerHTML = getRandomMessage(correctMessages);
        result.style.color = "#00ff00";
        input.value = "";
        
        // Add confetti effect
        gameContainer.classList.add('correct-answer');
        setTimeout(() => {
            gameContainer.classList.remove('correct-answer');
        }, 1500);
        
        setTimeout(() => {
            level++;
            levelP.innerHTML = `Level: ${level}`;
            randomNum = findRandomNum();
            changeInstruction();
            result.innerHTML = `Level up! Now try 1 to ${10 * level}! 🎮`;
        }, 2000);
    } else if (guess < randomNum) {
        result.innerHTML = getRandomMessage(tooLowMessages);
        result.style.color = "#ba4b4b";
    } else {
        result.innerHTML = getRandomMessage(tooHighMessages);
        result.style.color = "orange";
    }
    
    setTimeout(() => {
        if (guess !== randomNum) {
            result.innerHTML = "";
        }
    }, 3000);
}

function changeInstruction() {
    instruction.innerHTML = `Guess a number between 1 and ${10 * level} `;
}

function findRandomNum() {
    return Math.floor(Math.random() * (10 * level)) + 1;
}
function shakeElement(element) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'shake 0.5s';
    }, 10);
}

const styleSheet = document.createElement("style");
styleSheet.textContent = `
@keyframes shake {
    0%, 100% { transform: rotate(1deg); }
    10%, 30%, 50%, 70%, 90% { transform: translate(-2px, 0) rotate(-1deg); }
    20%, 40%, 60%, 80% { transform: translate(2px, 0) rotate(2deg); }
}`;
document.head.appendChild(styleSheet);


const inputL = document.getElementById('numLevel');
const changeLBtn = document.getElementById('changeLevel');
const error = document.getElementById('error');

inputL.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        chooseLevel();
    }
});

changeLBtn.addEventListener('click', chooseLevel);
    
function chooseLevel(){
    const levelInput = parseInt(inputL.value);
    if(levelInput>999){
        error.innerHTML="The level entered is too big";
        error.style.color= "#ff3030";
    }
    else if(levelInput < 1){
        error.innerHTML="The level entered is too small";
        error.style.color= "#ff3030";
    }

    else{
        level = levelInput;
        changeInstruction();
        randomNum = findRandomNum();
        levelP.innerHTML = `Level: ${level}`;
        shakeElement(gameContainer);
        error.style.color= "#40e04d";
        error.innerHTML="level changed successfully!";

    }
}

