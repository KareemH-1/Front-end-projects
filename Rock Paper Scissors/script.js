const choices = document.querySelectorAll(".choices button");
const userScore = document.getElementById("user-score");
const computerScore = document.getElementById("computer-score");
const message = document.getElementById("message");
const result = document.querySelector(".result p");
const overlay = document.getElementById("overlay");
const rollingText = document.getElementById("rolling-text");

const rollingSound = new Audio("Audios/wheel-spin-click-slow-down-101152.mp3");
const poppingSound = new Audio("Audios/pop-sound-effect-226109.mp3");

let userPoints = 0;
let computerPoints = 0;
const choicesArray = ["✊", "🫱", "✌️"];

function computerPlay() {
    return choicesArray[Math.floor(Math.random() * choicesArray.length)];
}

function playRound(playerChoice) {
    overlay.style.display = "flex";
    rollingSound.play();
    rollingSound.loop = true; // Ensure the sound loops while rolling

    let intervalTime = 100; // Initial fast rolling speed
    let counter = 0;

    const rollingInterval = setInterval(function() {
        rollingText.textContent = choicesArray[counter % choicesArray.length];
        counter++;

        // Slow down the rolling effect by increasing the interval time
        if (intervalTime < 400) {
            intervalTime += 5; // Increase interval to slow down
        }
    }, intervalTime);

    setTimeout(function() {
        clearInterval(rollingInterval); // Stop the rolling effect
        rollingSound.pause(); // Stop the rolling sound
        rollingSound.currentTime = 0;

        const computerChoice = computerPlay(); // Get computer choice
        rollingText.textContent = computerChoice; // Show the final choice

        // Play the pop sound immediately when final choice is revealed
        poppingSound.play();

        rollingText.classList.add("pop-effect");

        setTimeout(function() {
            rollingText.classList.remove("pop-effect");
            overlay.style.display = "none"; // Hide overlay after result

            // Display the game result
            if (playerChoice === computerChoice) {
                result.textContent = `It's a tie! ${playerChoice} vs ${computerChoice}`;
            } else if ((playerChoice === "✊" && computerChoice === "✌️") ||
                       (playerChoice === "✌️" && computerChoice === "🫱") ||
                       (playerChoice === "🫱" && computerChoice === "✊")) {
                userPoints++;
                userScore.textContent = userPoints;
                result.textContent = `You win! ${playerChoice} beats ${computerChoice}`;
            } else {
                computerPoints++;
                computerScore.textContent = computerPoints;
                result.textContent = `Computer wins! ${computerChoice} beats ${playerChoice}`;
            }
        }, 1500); // daelay the result display to show the final choice for 1.5 seconds
    }, 2500); // Total rolling time (2.5 seconds)
}

function handleChoiceClick() {
    playRound(this.textContent);
    message.textContent = "Make your next move";
}

choices.forEach(function(button) {
    button.addEventListener("click", handleChoiceClick);
});
