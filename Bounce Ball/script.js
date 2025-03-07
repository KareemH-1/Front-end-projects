document.addEventListener("DOMContentLoaded", function() {
    const gameAreaHeight = window.innerHeight;
    const gameAreaWidth = window.innerWidth;
    const bar = document.getElementById("bar");
    const ball = document.getElementById("ball");
    const scoreElement = document.getElementById("Score");

    let score = 0;
    let barWidth = gameAreaWidth * 0.12;
    let barHeight = gameAreaHeight * 0.02;
    let barPosition = (gameAreaWidth - barWidth) / 2;
    let barSpeed = Math.max(10, gameAreaWidth * 0.035);

    let ballSize = gameAreaWidth * 0.03;
    let ballX = gameAreaWidth / 2 - ballSize / 2;
    let ballY = gameAreaHeight * 0.5;
    let ballSpeedX = 0;
    let ballSpeedY = 3;

    
    function updateScore(points) {
        score = Math.max(0, score + points);
        scoreElement.textContent = "Score: " + score;
    }
    function resetBall() {
        ballX = gameAreaWidth / 2 - ballSize / 2;
        ballY = gameAreaHeight * 0.3;
        ballSpeedX = 0;
        if (ballspeedY >= 7){
            ballspeedY -=2;
        }
        else if(ballspeedY>=5){
            ballspeedY -=1.5;
        }
        else if(ballspeedY>=4.5){
            ballSpeedY -=1;
        }
        else if(ballSpeedY >= 3.6){
            ballSpeedY -=0.5;
        }
        else {
            ballSpeedY = 3;
        }
    }

    function moveBall() {
        ballY += ballSpeedY;
        ballX += ballSpeedX;


        if (ballY <= 0) {
            ballY = 0;
            ballSpeedY *= -1;
        }

        if (ballY + ballSize >= gameAreaHeight - barHeight - 10) {
            if (ballX + ballSize >= barPosition && ballX <= barPosition + barWidth) {
                let hitPosition = (ballX + ballSize / 2 - barPosition) / barWidth - 0.5;
                ballSpeedX = hitPosition * 6;
                ballSpeedY = -Math.abs(ballSpeedY);
                updateScore(1);
            } else if (ballY + ballSize >= gameAreaHeight) {
                updateScore(-5);
                resetBall();
            }
        }

        if (ballX <= 0 || ballX + ballSize >= gameAreaWidth) {
            ballSpeedX *= -1;
        }

        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";
        requestAnimationFrame(moveBall);
    }

    moveBall();
    
    document.addEventListener("keydown", function(event) {
        if ((event.key === "ArrowLeft" || event.key.toLowerCase() === "a")) {
            barPosition -= barSpeed;
        } else if ((event.key === "ArrowRight" || event.key.toLowerCase() === "d")) {
            barPosition += barSpeed;
        }
        barPosition = Math.max(0, Math.min(barPosition, gameAreaWidth - barWidth));
        bar.style.left = barPosition + "px";
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
                barPosition += barSpeed;
            } else {
                barPosition -= barSpeed;
            }
            barPosition = Math.max(0, Math.min(barPosition, gameAreaWidth - barWidth));
            bar.style.left = barPosition + "px";
            touchStartX = touchEndX;d
        }
    });

    setInterval(function() {
        ballSpeedY *= 1.05;
    }, 5000);
});
