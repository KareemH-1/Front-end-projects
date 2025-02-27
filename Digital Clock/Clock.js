document.addEventListener("DOMContentLoaded", function () {
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        let ampm;

        if (hours >= 12) {
            ampm = "PM";
        } else {
            ampm = "AM";
        }

        if (hours > 12) {
            hours = hours - 12;
        } 
        
        if (hours === 0) {
            hours = 12;
        }

        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        const timeString = hours + ":" + minutes + ":" + seconds + " " + ampm;
        document.getElementById("clock").querySelector("p").textContent = timeString;
    }

    setInterval(updateClock, 1000);
    updateClock();
});
