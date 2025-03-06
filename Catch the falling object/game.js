document.addEventListener("DOMContentLoaded", function() {
    const fallingObject = document.querySelector(".falling-object");
    const basket = document.querySelector(".basket");
    const gameArea = document.querySelector(".game-area");
    const scoreElement = document.getElementById("score");
    
    let score = 0;
    const width = gameArea.offsetWidth;
    const height = gameArea.offsetHeight;
    let basketPosition = width / 2 - basket.offsetWidth / 2;

    document.addEventListener("keydown", function(event) {
        const basketWidth = basket.offsetWidth;
        if ((event.key === "ArrowLeft" || event.key.toLowerCase() === "a") && basketPosition > 0) {
            basketPosition -= 20;
        } else if ((event.key === "ArrowRight" || event.key.toLowerCase() === "d") && basketPosition < width - basketWidth) {
            basketPosition += 20;
        }
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
d