const time = document.querySelector('.time');
const start = document.querySelector('.start');
const pause = document.querySelector('.pause');
const reset = document.querySelector('.reset');

let alarmSound = new Audio('alarm-clock-90867.mp3');
let currentTime = 1500; // 25 minutes in seconds

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTimer() {
    currentTime--;
    time.textContent = formatTime(currentTime);
    if (currentTime === 0) {
        alarmSound.loop = true;
        alarmSound.play();
        clearInterval(interval);
    }
}

function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

start.addEventListener('click', () => {
    interval = setInterval(updateTimer, 1000);
    start.disabled = true;
    pause.disabled = false;
    reset.disabled = false;
});

pause.addEventListener('click', () => {
    clearInterval(interval);
    start.disabled = false;
    pause.disabled = true;
    reset.disabled = false;
});

reset.addEventListener('click', () => {
    clearInterval(interval);
    stopAlarm();
    currentTime = 1500;
    time.textContent = formatTime(currentTime);
    start.disabled = false;
    pause.disabled = true;
    reset.disabled = true;
});

time.textContent = formatTime(currentTime);
