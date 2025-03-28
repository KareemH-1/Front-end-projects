const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('Score');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreElement = document.getElementById('FinalScore');
const restartButton = document.getElementById('RestartButton');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let gameOver = false;

const player = {
    x: canvas.width / 2,
    y: canvas.height - 200,
    width: 50,
    height: 50,
    speed: 5,
    image: new Image()
};
player.image.src = 'images/player.png';

const bullets = [];
const bulletSpeed = 10;

const enemies = [];
const enemySpeed = 2;
const enemySpawnInterval = 1500;

const keys = {
    left: false,
    right: false,
    space: false,
    a: false,
    d: false
};

function resetGame() {
    score = 0;
    gameOver = false;
    bullets.length = 0;
    enemies.length = 0;
    player.x = canvas.width / 2;
    player.y = canvas.height - 200;
    scoreElement.textContent = 'Score: 0';
    gameOverScreen.classList.add('hidden');
    gameLoop();
}

restartButton.addEventListener('click', resetGame);

function createMobileControls() {
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'mobile-controls';
    
    const leftBtn = document.createElement('button');
    leftBtn.textContent = '←';
    leftBtn.className = 'mobile-btn mobile-left';
    
    const rightBtn = document.createElement('button');
    rightBtn.textContent = '→';
    rightBtn.className = 'mobile-btn mobile-right';
    
    const shootBtn = document.createElement('button');
    shootBtn.textContent = 'Shoot';
    shootBtn.className = 'mobile-btn mobile-shoot';

    leftBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keys.left = true;
    });
    leftBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keys.left = false;
    });
    leftBtn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        keys.left = true;
    });
    leftBtn.addEventListener('mouseup', (e) => {
        e.preventDefault();
        keys.left = false;
    });

    rightBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keys.right = true;
    });
    rightBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keys.right = false;
    });
    rightBtn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        keys.right = true;
    });
    rightBtn.addEventListener('mouseup', (e) => {
        e.preventDefault();
        keys.right = false;
    });

    shootBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keys.space = true;
    });
    shootBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keys.space = false;
    });
    shootBtn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        keys.space = true;
    });
    shootBtn.addEventListener('mouseup', (e) => {
        e.preventDefault();
        keys.space = false;
    });

    controlsDiv.appendChild(leftBtn);
    controlsDiv.appendChild(shootBtn);
    controlsDiv.appendChild(rightBtn);
    
    document.body.appendChild(controlsDiv);
}

createMobileControls();

document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'ArrowLeft':
        case 'KeyA':
            keys.left = true;
            keys.a = true;
            break;
        case 'ArrowRight':
        case 'KeyD':
            keys.right = true;
            keys.d = true;
            break;
        case 'Space':
            keys.space = true;
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch(e.code) {
        case 'ArrowLeft':
        case 'KeyA':
            keys.left = false;
            keys.a = false;
            break;
        case 'ArrowRight':
        case 'KeyD':
            keys.right = false;
            keys.d = false;
            break;
        case 'Space':
            keys.space = false;
            break;
    }
});

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    
    if (touchX < canvas.width / 2) {
        keys.left = true;
    } else {
        keys.right = true;
    }
});

canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    keys.left = false;
    keys.right = false;
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
});

function movePlayer() {
    if ((keys.left || keys.a) && player.x > 0) {
        player.x -= player.speed;
    }
    if ((keys.right || keys.d) && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
}

function shootBullet() {
    if (keys.space) {
        bullets.push({
            x: player.x + player.width / 2,
            y: player.y,
            width: 5,
            height: 15
        });
        keys.space = false;
    }
}

function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= bulletSpeed;
        
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
        }
    }
}

function spawnEnemy() {
    if (!gameOver) {
        const enemy = {
            x: Math.random() * (canvas.width - 50),
            y: -50,
            width: 50,
            height: 50,
            image: new Image()
        };
        enemy.image.src = 'images/enemyShip.png';
        enemies.push(enemy);
    }
}

function updateEnemies() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].y += enemySpeed;
        
        if (checkCollision(player, enemies[i])) {
            gameOver = true;
        }
        
        if (enemies[i].y > canvas.height) {
            enemies.splice(i, 1);
        }
        
        for (let j = bullets.length - 1; j >= 0; j--) {
            if (checkCollision(bullets[j], enemies[i])) {
                enemies.splice(i, 1);
                bullets.splice(j, 1);
                score += 10;
                scoreElement.textContent = `Score: ${score}`;
                break;
            }
        }
    }
}

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
    
    ctx.fillStyle = 'white';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
    
    enemies.forEach(enemy => {
        ctx.drawImage(enemy.image, enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function gameLoop() {
    if (!gameOver) {
        movePlayer();
        shootBullet();
        updateBullets();
        updateEnemies();
        render();
        
        requestAnimationFrame(gameLoop);
    } else {
        finalScoreElement.textContent = `Score: ${score}`;
        gameOverScreen.classList.remove('hidden');
    }
}

setInterval(spawnEnemy, enemySpawnInterval);

gameLoop();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    player.x = canvas.width / 2;
    player.y = canvas.height - 200;
});