const choices = document.querySelectorAll(".choices button");
const userScore = document.getElementById("user-score");
const computerScore = document.getElementById("computer-score");
const message = document.getElementById("message");
const result = document.querySelector(".result p");

let userPoints = 0;
let computerPoints = 0;

function computerPlay() {
    const choices = ["Rock", "Paper", "Scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerChoice) {
    const computerChoice = computerPlay();
    if (playerChoice === computerChoice) {
        result.textContent = `It's a tie! ${playerChoice} vs ${computerChoice}`;
    } else if ((playerChoice === "Rock" && computerChoice === "Scissors") ||
        (playerChoice === "Scissors" && computerChoice === "Paper") ||
        (playerChoice === "Paper" && computerChoice === "Rock")) {
        userPoints++;
        userScore.textContent = userPoints;
        result.textContent = `You win! ${playerChoice} beats ${computerChoice}`;
    } else {
        computerPoints++;
        computerScore.textContent = computerPoints;
        result.textContent = `Computer wins! ${computerChoice} beats ${playerChoice}`;
    }
}

choices.forEach(function(button) {
    button.addEventListener("click", function() {
        playRound(button.id);
        message.textContent = "Make your next move";
    });
});

