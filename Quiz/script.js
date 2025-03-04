const questions = [
    { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: 1 },
    { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Venus", "Jupiter"], correct: 1 },
    { question: "What is the capital of France?", answers: ["Berlin", "Madrid", "Paris", "Rome"], correct: 2 },
    { question: "Who wrote 'Hamlet'?", answers: ["Shakespeare", "Hemingway", "Austen", "Dickens"], correct: 0 },
    { question: "What is the square root of 16?", answers: ["2", "4", "6", "8"], correct: 1 },
    { question: "What is the chemical symbol for water?", answers: ["O2", "H2O", "CO2", "NaCl"], correct: 1 },
    { question: "Which ocean is the largest?", answers: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3 },
    { question: "Who painted the Mona Lisa?", answers: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"], correct: 1 },
    { question: "What is the capital of Japan?", answers: ["Beijing", "Seoul", "Tokyo", "Bangkok"], correct: 2 },
    { question: "How many continents are there?", answers: ["5", "6", "7", "8"], correct: 2 },
    { question: "What is the fastest land animal?", answers: ["Cheetah", "Leopard", "Tiger", "Lion"], correct: 0 },
    { question: "Which gas do plants absorb from the air?", answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 },
    { question: "What is the smallest planet in our solar system?", answers: ["Venus", "Mars", "Mercury", "Pluto"], correct: 2 },
    { question: "How many sides does a hexagon have?", answers: ["5", "6", "7", "8"], correct: 1 },
    { question: "What is the tallest mountain in the world?", answers: ["K2", "Everest", "Kilimanjaro", "Denali"], correct: 1 },
    { question: "Who discovered gravity?", answers: ["Newton", "Einstein", "Galileo", "Tesla"], correct: 0 },
    { question: "What is the boiling point of water in Celsius?", answers: ["90", "100", "110", "120"], correct: 1 },
    { question: "Which metal is used to make coins?", answers: ["Gold", "Copper", "Silver", "Iron"], correct: 1 },
    { question: "What is the capital of Italy?", answers: ["Paris", "Madrid", "Rome", "Lisbon"], correct: 2 },
    { question: "Which country is famous for the Great Wall?", answers: ["Japan", "India", "China", "Russia"], correct: 2 }
];


let currentQuestionIndex = 0;
let score = 0;
let usedIndexes = new Set();

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const currentQuestionElement = document.getElementById("current-question");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    usedIndexes.clear();
    nextButton.classList.add("hide");
    showQuestion();
}

function getRandomIndex() {
    while (usedIndexes.size < questions.length) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        if (!usedIndexes.has(randomIndex)) {
            usedIndexes.add(randomIndex);
            return randomIndex;
        }
    }
    return null;
}

function showQuestion() {
    let index = getRandomIndex();
    if (index === null) {
        showScore();
        return;
    }
    currentQuestionIndex++;
    currentQuestionElement.textContent = `Question ${currentQuestionIndex}`;

    let q = questions[index];
    questionElement.textContent = q.question;
    answersElement.innerHTML = "";
    q.answers.forEach((answer, idx) => {
        let btn = document.createElement("button");
        btn.classList.add("btn");
        btn.textContent = answer;
        btn.onclick = () => checkAnswer(idx, index);
        answersElement.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, questionIndex) {
    if (selectedIndex === questions[questionIndex].correct) {
        score++;
        alert("Correct!");
    } else {
        alert("Wrong!");
    }
    showQuestion();
}

function showScore() {
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    answersElement.innerHTML = "";
    nextButton.textContent = "Restart Quiz";
    nextButton.classList.remove("hide");
    nextButton.onclick = startQuiz;
}

startQuiz();