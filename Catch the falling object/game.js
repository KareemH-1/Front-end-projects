document.addEventListener("DOMContentLoaded", function() {
    const fallingObject = document.querySelector(".falling-object");
    const basket = document.querySelector(".basket");
    const gameArea = document.querySelector(".game-area");
    const scoreElement = document.getElementById("score");

    let score = 0;
    const width = gameArea.clientWidth || window.innerWidth;
    const height = gameArea.clientHeight;
    let basketPosition = width / 2 - basket.offsetWidth / 2;

    console.log("Game area width:", width);
    console.log("Basket width:", basket.offsetWidth);

    document.addEventListener("keydown", function(event) {
        const basketWidth = basket.offsetWidth;
        if ((event.key === "ArrowLeft" || event.key.toLowerCase() === "a")) {
            basketPosition -= 20;
        } else if ((event.key === "ArrowRight" || event.key.toLowerCase() === "d")) {
            basketPosition += 20;
        }

        basketPosition = Math.max(0, Math.min(basketPosition, width - basketWidth));
        basket.style.left = basketPosition + "px";
    });

    function moveFallingObject() {
        const randomLeft = Math.floor(Math.random() * (width - fallingObject.offsetWidth));
        fallingObject.style.left = randomLeft + "px";
        fallingObject.style.top = "0px";

        let fallInterval = setInterval(function() {
            let currentTop = parseInt(fallingObject.style.top);
            if (currentTop < height - basket.offsetHeight - fallingObject.offsetHeight) {
                fallingObject.style.top = (currentTop + 5) + "px";
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
