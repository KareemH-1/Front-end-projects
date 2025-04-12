let isVsComputer = false;
let gameActive = false;

const X_CLASS = 'x';
const O_CLASS = 'o';
let currentPlayer = X_CLASS;
let isComputerTurn = false;
let board = ['', '', '', '', '', '', '', '', ''];

const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');
const displayModeElement = document.getElementById('DisplayMode');
const chooseModeElement = document.getElementById('chooseMode');
const gameElement = document.querySelector('.game');
const computerButton = document.getElementById('Computer');
const playerButton = document.getElementById('Player');

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function initializeGame() {
    gameElement.style.display = 'none';
    computerButton.style.display = 'block';
    playerButton.style.display = 'block';
}

function loadComputer() {
    isVsComputer = true;
    gameActive = true;
    chooseModeElement.textContent = 'Game Mode: Player vs Computer';
    computerButton.style.display = 'none';
    playerButton.style.display = 'block';
    playerButton.textContent = 'Switch to Player vs Player';
    gameElement.style.display = 'flex';
    displayModeElement.textContent = 'Player vs Computer';
    startGame();
}

function loadPlayer() {
    isVsComputer = false;
    gameActive = true;
    chooseModeElement.textContent = 'Game Mode: Player vs Player';
    playerButton.style.display = 'none';
    computerButton.style.display = 'block';
    computerButton.textContent = 'Switch to Player vs Computer';
    gameElement.style.display = 'flex';
    displayModeElement.textContent = 'Player vs Player';
    startGame();
}

computerButton.addEventListener('click', function() {
    loadComputer();
});

playerButton.addEventListener('click', function() {
    loadPlayer();
});

restartButton.addEventListener('click', startGame);

function startGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = X_CLASS;
    gameActive = true;
    isComputerTurn = false;
    
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleCellClick);
        cell.addEventListener('click', handleCellClick);
    });
    
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleCellClick(e) {
    if (!gameActive || isComputerTurn) return;
    
    const cell = e.target;
    const index = Array.from(cellElements).indexOf(cell);
    
    if (board[index] !== '') return;
    
    placeMark(cell, index, currentPlayer);
    
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
        
        if (isVsComputer && currentPlayer === O_CLASS && gameActive) {
            isComputerTurn = true;
            boardElement.classList.remove(O_CLASS);
            
            setTimeout(computerMove, 700);
        }
    }
}

function computerMove() {
    if (!gameActive || isDraw() || checkWin(X_CLASS) || checkWin(O_CLASS)) {
        isComputerTurn = false;
        return;
    }
    
    const emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    
    if (emptyCells.length > 0) {
        const winMove = findBestMove(O_CLASS);
        if (winMove !== -1) {
            const cell = cellElements[winMove];
            placeMark(cell, winMove, O_CLASS);
            if (checkWin(O_CLASS)) {
                endGame(false);
                return;
            }
        } 
        else {
            const blockMove = findBestMove(X_CLASS);
            if (blockMove !== -1) {
                const cell = cellElements[blockMove];
                placeMark(cell, blockMove, O_CLASS);
            } 
            else if (board[4] === '') {
                const cell = cellElements[4];
                placeMark(cell, 4, O_CLASS);
            }
            else {
                const randomIndex = Math.floor(Math.random() * emptyCells.length);
                const cellIndex = emptyCells[randomIndex];
                const cell = cellElements[cellIndex];
                placeMark(cell, cellIndex, O_CLASS);
            }
        }
        
        if (checkWin(O_CLASS)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            setBoardHoverClass();
        }
    }
    
    isComputerTurn = false;
}

function findBestMove(player) {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i];
        
        if (board[a] === player && board[b] === player && board[c] === '') {
            return c;
        }
        if (board[a] === player && board[c] === player && board[b] === '') {
            return b;
        }
        if (board[b] === player && board[c] === player && board[a] === '') {
            return a;
        }
    }
    
    return -1;
}

function placeMark(cell, index, currentClass) {
    board[index] = currentClass;
    cell.classList.add(currentClass);
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return board[index] === currentClass;
        });
    });
}

function isDraw() {
    return board.every(cell => cell !== '');
}

function endGame(draw) {
    gameActive = false;
    isComputerTurn = false;
    
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        const winner = currentPlayer === X_CLASS ? 'X' : 'O';
        winningMessageTextElement.innerText = `${winner} Wins!`;
    }
    
    winningMessageElement.classList.add('show');
}

function swapTurns() {
    currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
}

function setBoardHoverClass() {
    boardElement.classList.remove(X_CLASS);
    boardElement.classList.remove(O_CLASS);
    
    if (!isComputerTurn) {
        if (currentPlayer === X_CLASS) {
            boardElement.classList.add(X_CLASS);
        } else {
            boardElement.classList.add(O_CLASS);
        }
    }
}

const checkbox = document.querySelector('.checkbox');

checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});
initializeGame();