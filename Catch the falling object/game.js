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
    
        let maxBasketWidth = 150; 
        let maxBasketHeight = 75;
        let maxBallSize = 50;
    
        let basketWidth = Math.min(width * 0.15, maxBasketWidth);
        let basketHeight = Math.min(basketWidth * 0.5, maxBasketHeight);
        let ballSize = Math.min(width * 0.05, maxBallSize);
    
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

    let basketSpeed = Math.max(10, width * 0.02); 
    let ballFallSpeed = 3;

document.addEventListener("keydown", function(event) {
    const basketWidth = basket.offsetWidth;
    if ((event.key === "ArrowLeft" || event.key.toLowerCase() === "a")) {
        basketPosition -= basketSpeed;
    } else if ((event.key === "ArrowRight" || event.key.toLowerCase() === "d")) {
        basketPosition += basketSpeed;
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
            fallingObject.style.top = (currentTop + ballFallSpeed) + "px";
        } else {
            clearInterval(fallInterval);
            checkCollision();
        }
    }, 12);
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
