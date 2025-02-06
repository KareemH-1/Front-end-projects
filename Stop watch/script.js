let seconds =0;
let centiseconds =0;
let interval = null;
const time = document.getElementById("time");


function zerostart(val){
     return String(val).padStart(2 ,"0");
}


function setTime(){
    const minutes = Math.floor(seconds/60);
    const hours = Math.floor(seconds/3600);
    const secondsCounted = seconds%60;
    const minutesCounted = minutes%60;
    time.innerHTML = `${zerostart(hours)} :${zerostart(minutesCounted)} : ${zerostart(secondsCounted)} : ${zerostart(centiseconds)}`; 
}
function timer(){
    centiseconds++; 
    if (centiseconds >= 100) {  
        centiseconds = 0;
        seconds++;
    }
    setTime();
}

function startClock(){
    if(interval){
        stopClock();
    }

    interval = setInterval(timer, 10);
}

function stopClock(){
    clearInterval(interval);
    document.getElementById("start").textContent = "Continue";
}

function resetClock(){
    stopClock();
    seconds = 0;
    centiseconds =0;
    setTime();
    document.getElementById("start").textContent = "Start";
}