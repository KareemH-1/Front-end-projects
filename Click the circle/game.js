const circle = document.querySelector('.circle');
const scoreElement = document.querySelector('.Score');
const container = document.querySelector('.container');
const width = container.offsetWidth;
const height = container.offsetHeight;
let score = 0;

circle.addEventListener('click', function() {
    score++;
    scoreElement.textContent = `Score: ${score}`;
});

function startGame() {
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
}

function styleCircle() {
    circle.style.backgroundColor = 'red';
    circle.style.width = '20px';
    circle.style.height = '20px';
    circle.style.borderRadius = '50%';
    circle.style.position = 'absolute';
    circle.style.top = '50%';
    circle.style.left = '50%';
    circle.style.transform = 'translate(-50%, -50%)';
    circle.style.cursor = 'pointer';
    circle.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    circle.style.transition = 'all 0.3s ease-in-out';
}

function moveCircle() {
    let x = Math.random() * (width - circle.offsetWidth);
    let y = Math.random() * (height - circle.offsetHeight);
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';
}
function animateCircle() {
    moveCircle();
    setTimeout(animateCircle, 2000);
}
function incrementScoreOnclick() {
    score++;
    scoreElement.textContent = `Score: ${score}`;
    circle.style.display = 'none';
    setTimeout(function() {
        circle.style.display = 'block';
        moveCircle();
    }, 100);
}

animateCircle();
styleCircle();
startGame();

