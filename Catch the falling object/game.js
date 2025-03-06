document.addEventListener("DOMContentLoaded", function() {
    const gameArea = document.querySelector(".game-area");
    const basket = document.querySelector(".basket");
    const scoreElement = document.getElementById("score");

    let score = 0;
    let width = gameArea.clientWidth || window.innerWidth;
    let height = gameArea.clientHeight || window.innerHeight;
    let basketPosition = width / 2 - basket.offsetWidth / 2;
    let basketSpeed = Math.max(10, width * 0.035);
    let ballFallSpeed = 3;
    let fallingObjects = [];
    let spawnInterval;

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

        basketPosition = Math.max(0, Math.min(basketPosition, width - basketWidth));
        basket.style.left = basketPosition + "px";
    }

    updateSizes();
    window.addEventListener("resize", updateSizes);

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

    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener("touchstart", function(event) {
        touchStartX = event.touches[0].clientX;
    });

    document.addEventListener("touchmove", function(event) {
        touchEndX = event.touches[0].clientX;
        let difference = touchEndX - touchStartX;

        if (Math.abs(difference) > 10) {
            if (difference > 0) {
                basketPosition += basketSpeed;
            } else {
                basketPosition -= basketSpeed;
            }
            basketPosition = Math.max(0, Math.min(basketPosition, width - basket.offsetWidth));
            basket.style.left = basketPosition + "px";
            touchStartX = touchEndX;
        }
    });

    function spawnFallingObjects(count) {
        let existingCount = fallingObjects.length;
        let newCount = Math.max(0, count - existingCount);

        if (newCount <= 0) return;

        let usedPositions = [];

        for (let i = 0; i < newCount; i++) {
            setTimeout(() => {
                let fallingObject = document.createElement("div");
                fallingObject.classList.add("falling-object");
                gameArea.appendChild(fallingObject);
                fallingObjects.push(fallingObject);

                let ballSize = Math.min(width * 0.05, 50);
                fallingObject.style.width = ballSize + "px";
                fallingObject.style.height = ballSize + "px";

                let spawnLeft;
                do {
                    spawnLeft = Math.floor(Math.random() * (width - ballSize));
                } while (usedPositions.some(pos => Math.abs(pos - spawnLeft) < ballSize * 1.5));

                usedPositions.push(spawnLeft);
                fallingObject.style.left = spawnLeft + "px";

                moveFallingObject(fallingObject);
            }, i * 500);
        }
    }

    function moveFallingObject(fallingObject) {
        fallingObject.style.top = "0px";
        let fallInterval = setInterval(function() {
            let currentTop = parseInt(fallingObject.style.top);
            if (currentTop < height - basket.offsetHeight - fallingObject.offsetHeight) {
                fallingObject.style.top = (currentTop + ballFallSpeed) + "px";
            } else {
                clearInterval(fallInterval);
                checkCollision(fallingObject);
            }
        }, 12);
    }

    function checkCollision(fallingObject) {
        const objectRect = fallingObject.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();

        if (
            objectRect.left < basketRect.right &&
            objectRect.right > basketRect.left &&
            objectRect.bottom >= basketRect.top
        ) {
            score++;
            playCatchAnimation(fallingObject);
        } else {
            score = Math.max(0, score - 1);
            fallingObject.remove();
            fallingObjects = fallingObjects.filter(obj => obj !== fallingObject);
            updateScore();
        }
    }

    function playCatchAnimation(fallingObject) {
        fallingObject.style.transition = "transform 0.3s ease-out, opacity 0.3s";
        fallingObject.style.transform = "scale(1.5)";
        fallingObject.style.opacity = "0";

        setTimeout(function() {
            fallingObject.remove();
            fallingObjects = fallingObjects.filter(obj => obj !== fallingObject);
            updateScore();
        }, 300);
    }

    function updateScore() {
        scoreElement.textContent = "Score: " + score;

        let ballCount = 1;
        if (score >= 100) {
            ballCount = 4;
        } else if (score >= 50) {
            ballCount = 3;
        } else if (score >= 10) {
            ballCount = 2;
        }
        spawnFallingObjects(ballCount);
    }

    function startGame() {
        spawnFallingObjects(1);

        spawnInterval = setInterval(() => {
            let ballCount = 1;
            if (score >= 100) {
                ballCount = 4;
            } else if (score >= 50) {
                ballCount = 3;
            } else if (score >= 10) {
                ballCount = 2;
            }

            spawnFallingObjects(ballCount);
        }, 2000);
    }

    startGame();
});
