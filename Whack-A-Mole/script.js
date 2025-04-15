document.addEventListener('DOMContentLoaded', () => {
    const holes = document.querySelectorAll('.hole');
    const scoreDisplay = document.getElementById('score');
    const highScoreDisplay = document.getElementById('highScore');
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    
    let score = 0;
    let highScore = localStorage.getItem('whackAMoleHighScore') || 0;
    let timeLeft = 30;
    let gameInterval;
    let moleInterval;
    let isPlaying = false;
    let currentMole = null;
    
    highScoreDisplay.textContent = `High Score: ${highScore}`;

    holes.forEach(hole => {
      const mole = document.createElement('div');
      mole.className = 'mole';
      mole.style.display = 'none';
      hole.appendChild(mole);
      
      mole.addEventListener('click', () => {
        if (!isPlaying || mole !== currentMole) return;
        
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        
        mole.classList.add('whacked');
        setTimeout(() => {
          mole.classList.remove('whacked');
        }, 200);
        
        hideMole();
      });
    });
    
    function showRandomMole() {
      hideMole(); 
      
      const randomHoleIndex = Math.floor(Math.random() * holes.length);
      const hole = holes[randomHoleIndex];
      
      // Get mole from that hole
      const mole = hole.querySelector('.mole');
      mole.style.display = 'block';
      mole.style.top = '10px';
      
      currentMole = mole;
      
    const showDuration = Math.max(700, 1500 - score * 20);
      setTimeout(hideMole, showDuration);
    }
    
    function hideMole() {
      if (currentMole) {
        currentMole.style.top = '100%';
        currentMole.style.display = 'none';
        currentMole = null;
      }
    }
    
    function startGame() {
      if (isPlaying) return;
      
      resetGame();
      isPlaying = true;
      startButton.disabled = true;
      
      gameInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}`;
        
        if (timeLeft <= 0) {
          endGame();
        }
      }, 1000);
      
      moleInterval = setInterval(() => {
        if (isPlaying) {
          showRandomMole();
        }
      }, 1500);
    }
    
    function endGame() {
      isPlaying = false;
      clearInterval(gameInterval);
      clearInterval(moleInterval);
      hideMole();
      startButton.disabled = false;
      
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('whackAMoleHighScore', highScore);
        highScoreDisplay.textContent = `High Score: ${highScore}`;
        alert(`New High Score: ${highScore}!`);
      }
    }
    
    function resetGame() {
      clearInterval(gameInterval);
      clearInterval(moleInterval);
      score = 0;
      timeLeft = 30;
      scoreDisplay.textContent = `Score: ${score}`;
      timerDisplay.textContent = `Time Left: ${timeLeft}`;
      hideMole();
      startButton.disabled = false;
      isPlaying = false;
    }
    
    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);
  });