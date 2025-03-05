document.addEventListener("DOMContentLoaded", function () {
    const circle = document.querySelector(".circle");
    const scoreElement = document.querySelector(".Score");
    const container = document.querySelector(".container");
    let score = 0;
    let speed = 2000;

    function startGame() {
        circle.style.display = "block";
        circle.style.position = "absolute";
        score = 0;
        speed = 2000;
        scoreElement.textContent = `Score: ${score}`;
        animateCircle();
    }

    function styleCircle() {
        circle.style.backgroundColor = "red";
        circle.style.width = "20px";
        circle.style.height = "20px";
        circle.style.borderRadius = "50%";
        circle.style.cursor = "pointer";
        circle.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
        circle.style.transition = "left 0.8s ease, top 0.8s ease";
    }

    function moveCircle() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        let x = Math.random() * (width - 20);
        let y = Math.random() * (height - 20);
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
    }

    function updateSpeed() {
        if (score < 10) speed = 2000;
        else if (score < 25) speed = 1500;
        else if (score < 50) speed = 1000;
        else if (score < 75) speed = 500;
        else if (score < 100) speed = 250;
        else if (score < 150) speed = 100;
        else if (score < 250) speed = 50;
        else if (score < 500) speed = 25;
        else if (score < 1000) speed = 10;
        else speed = 5;
    }

    function animateCircle() {
        moveCircle();
        setTimeout(animateCircle, speed);
    }

    circle.addEventListener("click", function () {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        updateSpeed();
        circle.style.display = "none";
        setTimeout(function () {
            circle.style.display = "block";
            moveCircle();
        }, 100);
    });

    styleCircle();
    startGame();
});
