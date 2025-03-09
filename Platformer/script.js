let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let scoreP = document.getElementById("score");

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let player = {
    x: 50,
    y: canvasHeight - 20 - 10,
    width: 10,
    height: 10,
    speed: 5,
    jumping: false,
    velocityY: 0,
    gravity: 0.3,
    jumpPower: -6,
    score: 0
};

let platforms = [];
let gameRunning = true;

function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    for (let i = 0; i < platforms.length; i++) {
        let platform = platforms[i];
        ctx.fillStyle = "red";
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    }
}

function drawScore() {
    scoreP.innerText = "Score: " + player.score;
}

function drawGround() {
    ctx.fillStyle = "green";
    ctx.fillRect(0, canvasHeight - 10, canvasWidth, 10);
}

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawPlayer();
    drawPlatforms();
    drawScore();
    drawGround();
    if (gameRunning) requestAnimationFrame(draw);
}

function movePlayer() {
    if (!gameRunning) return;

    player.y += player.velocityY;
    player.velocityY += player.gravity;

    if (player.y >= canvasHeight - player.height - 10) {
        player.y = canvasHeight - player.height - 10;
        player.jumping = false;
        player.velocityY = 0;
    }
}

window.addEventListener("keydown", function (event) {
    if ((event.key === "ArrowUp" || event.key.toLowerCase() === "w" || event.key.toLowerCase() === " ") && !player.jumping) {
        player.jumping = true;
        player.velocityY = player.jumpPower;
    }
});

function generatePlatforms() {
    let platformHeight = 10;
    let platformWidth = 50;
    let platformX = canvasWidth;
    let platformY = canvasHeight - platformHeight - 10;

    platforms.push({ x: platformX, y: platformY, width: platformWidth, height: platformHeight });
}

function movePlatforms() {
    if (!gameRunning) return;

    for (let i = platforms.length - 1; i >= 0; i--) {
        platforms[i].x -= 3;
        if (platforms[i].x + platforms[i].width < 0) {
            platforms.splice(i, 1);
        }
    }
}

function checkCollisions() {
    for (let i = 0; i < platforms.length; i++) {
        let platform = platforms[i];

        if (
            player.x + player.width > platform.x &&
            player.x < platform.x + platform.width &&
            player.y + player.height > platform.y &&
            player.y < platform.y + platform.height
        ) {
            resetGame();
        }
    }
}

function resetGame() {
    gameRunning = false;
    alert("Game Over! Score: " + player.score);
    player.score = 0;
    player.y = canvasHeight - player.height - 10;
    player.velocityY = 0;
    platforms = [];
    gameRunning = true;
    draw();
}

setInterval(() => {
    if (gameRunning) player.score += 1;
}, 150);

setInterval(generatePlatforms, 1500);
setInterval(movePlatforms, 20);
setInterval(movePlayer, 20);
setInterval(checkCollisions, 20);

draw();
