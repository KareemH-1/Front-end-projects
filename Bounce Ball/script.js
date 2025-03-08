document.addEventListener("DOMContentLoaded", function() {
    const gameAreaHeight = window.innerHeight;
    const gameAreaWidth = window.innerWidth;
    const bar = document.getElementById("bar");
    const ball = document.getElementById("ball");
    const scoreElement = document.getElementById("Score");
    const bounceSound = document.getElementById("bounceSound");
    const resetSound = document.getElementById("resetSound");
    const sizePowerUp = document.getElementById("PowerUp_size");

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
    let powerUpActive = false;

    sizePowerUp.style.display = "none";

    function updateScore(points) {
        score = Math.max(0, score + points);
        scoreElement.textContent = "Score: " + score;
    }

    function animateBallCollision() {
        ball.style.transition = "transform 0.1s";
        ball.style.transform = "scale(1.3)";
        setTimeout(function() {
            ball.style.transform = "scale(1)";
        }, 100);
    }

    function resetBall() {
        resetSound.play();
        ball.style.transition = "transform 0.5s, opacity 0.5s";
        ball.style.transform = "scale(0)";
        ball.style.opacity = "0";
        setTimeout(function() {
            ballX = gameAreaWidth / 2 - ballSize / 2;
            ballY = gameAreaHeight * 0.3;
            ballSpeedX = 0;
            ballSpeedY = Math.max(3, ballSpeedY - 2);
            ball.style.transform = "scale(1)";
            ball.style.opacity = "1";
        }, 500);
    }

    function moveBall() {
        ballY += ballSpeedY;
        ballX += ballSpeedX;
        if (ballY <= 0) {
            ballY = 0;
            ballSpeedY *= -1;
            bounceSound.play();
            animateBallCollision();
        }
        if (ballY + ballSize >= gameAreaHeight - barHeight - 10) {
            if (ballX + ballSize >= barPosition && ballX <= barPosition + barWidth) {
                let hitPosition = (ballX + ballSize / 2 - barPosition) / barWidth - 0.5;
                ballSpeedX = hitPosition * 6;
                ballSpeedY = -Math.abs(ballSpeedY);
                updateScore(1);
                bounceSound.play();
                animateBallCollision();
            } else if (ballY + ballSize >= gameAreaHeight) {
                updateScore(-5);
                resetBall();
            }
        }
        if (ballX <= 0 || ballX + ballSize >= gameAreaWidth) {
            ballSpeedX *= -1;
            bounceSound.play();
            animateBallCollision();
        }
        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";
        requestAnimationFrame(moveBall);
    }

    function activatePowerUp() {
        if (!powerUpActive) {
            powerUpActive = true;
            const originalWidth = bar.offsetWidth;
            bar.style.transition = "width 0.5s ease-in-out";
            bar.style.width = originalWidth * 2.5 + "px";
            sizePowerUp.style.display = "none";
            setTimeout(() => {
                bar.style.width = originalWidth + "px";
                setTimeout(() => {
                    powerUpActive = false;
                }, 500);
            }, 7000);
        }
    }
    

    function spawnPowerUp() {
        if (score >= 5 && Math.random() < 0.1) {
            sizePowerUp.style.width = gameAreaWidth * 0.03 + "px";
            sizePowerUp.style.height = gameAreaWidth * 0.03 + "px";
            sizePowerUp.style.fontSize = gameAreaWidth * 0.015 + "px";
            sizePowerUp.style.left = Math.random() * (gameAreaWidth - parseFloat(sizePowerUp.style.width)) + "px";
            sizePowerUp.style.top = "0px";
            sizePowerUp.style.display = "flex";
        }
    }

    function checkBarPowerUpCollision() {
        if (sizePowerUp.style.display !== "none") {
            const powerUpLeft = parseFloat(sizePowerUp.style.left);
            const powerUpTop = parseFloat(sizePowerUp.style.top);
            const powerUpWidth = parseFloat(sizePowerUp.style.width);
            const powerUpHeight = parseFloat(sizePowerUp.style.height);
            const barTop = gameAreaHeight - barHeight - 10;
            const barLeft = barPosition;
            const barRight = barPosition + barWidth;
            if (powerUpTop + powerUpHeight >= barTop && powerUpLeft + powerUpWidth >= barLeft && powerUpLeft <= barRight) {
                activatePowerUp();
            }
        }
    }

    function movePowerUp() {
        if (sizePowerUp.style.display !== "none") {
            let currentTop = parseFloat(sizePowerUp.style.top) || 0;
            currentTop += gameAreaHeight * 0.005;
            if (currentTop > gameAreaHeight) {
                sizePowerUp.style.display = "none";
            } else {
                sizePowerUp.style.top = currentTop + "px";
            }
            checkBarPowerUpCollision();
        }
        requestAnimationFrame(movePowerUp);
    }

    moveBall();
    movePowerUp();

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
            touchStartX = touchEndX;
        }
    });

    setInterval(function() {
        ballSpeedY *= 1.05;
    }, 5000);
    
    setInterval(spawnPowerUp, 5000);
});
