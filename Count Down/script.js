document.addEventListener('DOMContentLoaded', function() {
    const dateTimeInput = document.getElementById('datetime');
    const startButton = document.getElementById('start');
    
    let countdownInterval;
    let targetDate;
    let alarmSound = new Audio('alarm-clock-90867.mp3');
    alarmSound.loop = true;
    
    function setDefaultDateTime() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(12, 0, 0, 0);
        
        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');
        const hours = String(tomorrow.getHours()).padStart(2, '0');
        const minutes = String(tomorrow.getMinutes()).padStart(2, '0');
        
        dateTimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    
    function loadFromLocalStorage() {
        const savedTargetDate = localStorage.getItem('countdownTargetDate');
        
        if (savedTargetDate) {
            const savedDate = new Date(parseInt(savedTargetDate));
            
            if (!isNaN(savedDate.getTime()) && savedDate > new Date()) {
                const year = savedDate.getFullYear();
                const month = String(savedDate.getMonth() + 1).padStart(2, '0');
                const day = String(savedDate.getDate()).padStart(2, '0');
                const hours = String(savedDate.getHours()).padStart(2, '0');
                const minutes = String(savedDate.getMinutes()).padStart(2, '0');
                
                dateTimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
                targetDate = savedDate.getTime();
                startCountdown();
                return true;
            } else {
                localStorage.removeItem('countdownTargetDate');
            }
        }
        return false;
    }
    
    if (!loadFromLocalStorage()) {
        setDefaultDateTime();
    }
    
    startButton.addEventListener('click', function() {
        if (alarmSound.paused === false) {
            stopAlarm();
            return;
        }
        startCountdown();
    });
    
    dateTimeInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            startCountdown();
        }
    });
    
    function startCountdown() {
        clearInterval(countdownInterval);
        stopAlarm();
        
        const inputDateTime = dateTimeInput.value;
        
        if (!inputDateTime) {
            showError('Please select a date and time');
            return;
        }
        
        targetDate = new Date(inputDateTime).getTime();
        
        if (isNaN(targetDate) || targetDate <= new Date().getTime()) {
            showError('Please select a future date and time');
            return;
        }
        
        localStorage.setItem('countdownTargetDate', targetDate.toString());
        
        startButton.textContent = 'Countdown Started';
        setTimeout(function() {
            startButton.textContent = 'Restart Countdown';
        }, 1500);
        
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }
    
    function showError(message) {
        alert(message);
        dateTimeInput.focus();
    }
    
    function updateCountdown() {
        const currentTime = new Date().getTime();
        const timeRemaining = targetDate - currentTime;
        
        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            displayTimeElements(0, 0, 0, 0);
            startButton.textContent = 'Stop Alarm';
            localStorage.removeItem('countdownTargetDate');
            playAlarm();
            return;
        }
        
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        displayTimeElements(days, hours, minutes, seconds);
    }
    
    function displayTimeElements(days, hours, minutes, seconds) {
        document.getElementById('days').innerHTML = formatTime(days) + '<span class="time-label">Days</span>';
        document.getElementById('hours').innerHTML = formatTime(hours) + '<span class="time-label">Hours</span>';
        document.getElementById('minutes').innerHTML = formatTime(minutes) + '<span class="time-label">Minutes</span>';
        document.getElementById('seconds').innerHTML = formatTime(seconds) + '<span class="time-label">Seconds</span>';
    }
    
    function formatTime(time) {
        if (time < 10) {
            return '0' + time;
        } else {
            return time;
        }
    }
    
    function playAlarm() {
        try {
            alarmSound.play();
            document.title = "⏰ TIME'S UP! ⏰";
        } catch (error) {
            console.error("Could not play alarm sound:", error);
        }
    }
    
    function stopAlarm() {
        alarmSound.pause();
        alarmSound.currentTime = 0;
        document.title = "Countdown Timer";
        startButton.textContent = "Set New Countdown";
    }
});