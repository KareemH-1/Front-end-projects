let seconds =0;
let interval = null;
const time = document.getElementById("time");


function zerostart(val){
     return String(val).padStart(2 ,"0");
}


function setTime(){
    const minutes = Math.floor(seconds/60);
    const secondsCounted = seconds%60; 
    time.innerHTML = `${zerostart(minutes)} : ${zerostart(secondsCounted)}`; 
}
function timer(){
    seconds++;
    setTime();
}

function startClock(){
    if(interval){
        stopClock();
    }

    interval = setInterval(timer,1000)
}

function stopClock(){
    clearInterval(interval);
    document.getElementById("start").textContent = "Continue";
}

function resetClock(){
    stopClock();
    seconds = 0;
    setTime();
    document.getElementById("start").textContent = "Start";
}