document.addEventListener("DOMContentLoaded", function() {
    const fallingObject = document.querySelector(".falling-object");
    const basket = document.querySelector(".basket");
    const gameArea = document.querySelector(".game-area");
    const scoreElement = document.getElementById("score");

    let score = 0;
    let width = gameArea.clientWidth || window.innerWidth;
    let height = gameArea.clientHeight || window.innerHeight;

    function updateSizes() {
        width = gameArea.clientWidth || window.innerWidth;
        height = gameArea.clientHeight || window.innerHeight;

        let basketWidth = width * 0.15;
        let basketHeight = basketWidth * 0.5;
        let ballSize = width * 0.05;

        basket.style.width = basketWidth + "px";
        basket.style.height = basketHeight + "px";
        fallingObject.style.width = ballSize + "px";
        fallingObject.style.height = ballSize + "px";

        basketPosition = Math.max(0, Math.min(basketPosition, width - basketWidth));
        basket.style.left = basketPosition + "px";
    }

    let basketPosition = width / 2 - basket.offsetWidth / 2;
    updateSizes();

    window.addEventListener("resize", updateSizes);

    document.addEventListener("keydown", function(event) {
        let basketWidth = basket.offsetWidth;
        if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
            basketPosition -= width * 0.02;
        } else if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
            basketPosition += width * 0.02;
        }

        basketPosition = Math.max(0, Math.min(basketPosition, width - basketWidth));
        basket.style.left = basketPosition + "px";
    });

    function moveFallingObject() {
        const randomLeft = Math.floor(Math.random() * (width - fallingObject.offsetWidth));
        fallingObject.style.left = randomLeft + "px";
        fallingObject.style.top = "0px";

        let fallSpeed = Math.max(5, width * 0.005);
        let fallInterval = setInterval(function() {
            let currentTop = parseInt(fallingObject.style.top);
            if (currentTop < height - basket.offsetHeight - fallingObject.offsetHeight) {
                fallingObject.style.top = (currentTop + fallSpeed) + "px";
            } else {
                clearInterval(fallInterval);
                checkCollision();
            }
        }, 20);
    }

    function checkCollision() {
        const objectRect = fallingObject.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();

        if (
            objectRect.left < basketRect.right &&
            objectRect.right > basketRect.left &&
            objectRect.bottom >= basketRect.top
        ) {
            score++;
            updateScore();
        }

        fallingObject.style.top = "0px";
        moveFallingObject();
    }

    function updateScore() {
        scoreElement.textContent = "Score: " + score;
    }

    function startGame() {
        moveFallingObject();
    }

    startGame();
});
