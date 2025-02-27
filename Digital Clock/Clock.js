document.addEventListener("DOMContentLoaded", function () {
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let ampm = document.getElementById("AMPM");

        if (hours >= 12) {
            ampm.textContent = "PM";
        } else {
            ampm.textContent = "AM";
        }

        if (hours > 12) {
            hours -= 12;
        }
        
        if (hours === 0) {
            hours = 12;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        document.getElementById("clock").querySelector("p").innerHTML = hours + ":" + minutes + ":" + seconds + " <span id='AMPM'>" + ampm.textContent + "</span>";
    }

    setInterval(updateClock, 1000);
    updateClock();
});
