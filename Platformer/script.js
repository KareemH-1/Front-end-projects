let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = window.innerHeight * 0.8;

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let scoreP = document.getElementById("score");
let popup = document.getElementById("popup");
let finalScore = document.getElementById("finalScore");
let restartBtn = document.getElementById("restartBtn");
let jumpBtn = document.getElementById("jumpBtn");
let crouchBtn = document.getElementById("crouchBtn");

let player = {
    x: 50,
    y: canvasHeight - 30,
    width: 10,
    height: 20,
    speed: 5,
    jumping: false,
    crouching: false,
    velocityY: 0,
    gravity: 0.5,
    jumpPower: -4.7,
    score: 0
};

let enemies = [];
let gameRunning = true;
let spawnRate = 4000;

function drawPlayer() {
    ctx.fillStyle = "#03DAC6";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawEnemies() {
    ctx.fillStyle = "#FF0266";
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function drawGround() {
    ctx.fillStyle = "#3700B3";
    ctx.fillRect(0, canvasHeight - 10, canvasWidth, 10);
}

function drawScore() {
    scoreP.innerText = "Score: " + player.score;
}

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawPlayer();
    drawEnemies();
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
    }
}

function jump() {
    if (!player.jumping && !player.crouching) {
        player.jumping = true;
        player.velocityY = player.jumpPower;
    }
}

function crouch() {
    if (!player.jumping) {
        player.crouching = true;
        player.height = 10;
    }
}

function standUp() {
    player.crouching = false;
    player.height = 20;
}

window.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" || event.key.toLowerCase() === "w" || event.key.toLowerCase() === " ") {
        jump();
    }
    if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
        crouch();
    }
});

window.addEventListener("keyup", function (event) {
    if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
        standUp();
    }
});

jumpBtn.addEventListener("click", jump);
jumpBtn.addEventListener("touchstart", jump);

crouchBtn.addEventListener("mousedown", crouch);
crouchBtn.addEventListener("mouseup", standUp);
crouchBtn.addEventListener("mouseleave", standUp);

crouchBtn.addEventListener("touchstart", function (event) {
    event.preventDefault(); 
    crouch();
});

crouchBtn.addEventListener("touchend", function (event) {
    event.preventDefault(); 
    standUp();
});

function generateEnemies() {
    let enemyTypes = [
        { width: 10, height: 30 },
        { width: 40, height: 10 }, 
        { width: 15, height: 25, flying: true }
    ];
    let type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    let enemyY = type.flying ? canvasHeight - 60 : canvasHeight - type.height - 10;
    enemies.push({ x: canvasWidth, y: enemyY, width: type.width, height: type.height, flying: type.flying });
    
    spawnRate = Math.max(1000, spawnRate * 0.95);
    setTimeout(generateEnemies, Math.random() * spawnRate + 1000);
}

generateEnemies();

function moveEnemies() {
    if (!gameRunning) return;
    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].x -= 3;
        if (enemies[i].flying) {
            enemies[i].y += Math.sin(Date.now() / 300) * 1.5;
        }
        if (enemies[i].x + enemies[i].width < 0) {
            enemies.splice(i, 1);
        }
    }
}

function checkCollisions() {
    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];
        if (
            player.x + player.width > enemy.x &&
            player.x < enemy.x + enemy.width &&
            player.y + player.height > enemy.y &&
            player.y < enemy.y + enemy.height
        ) {
            resetGame();
        }
    }
}

function resetGame() {
    gameRunning = false;
    popup.style.display = "block";
    finalScore.innerText = player.score;
}

restartBtn.addEventListener("click", function () {
    popup.style.display = "none";
    player.score = 0;
    player.y = canvasHeight - player.height - 10;
    player.velocityY = 0;
    enemies = [];
    spawnRate = 4000;
    gameRunning = true;
    requestAnimationFrame(draw);
});

setInterval(() => {
    if (gameRunning) {
        player.score += 2;
        player.jumpPower = Math.max(-10, -6.5 - player.score * 0.005); // Limit jump power
    }
}, 200);


setInterval(moveEnemies, 20);
setInterval(movePlayer, 20);
setInterval(checkCollisions, 20);

draw();
