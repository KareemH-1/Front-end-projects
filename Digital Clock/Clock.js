document.addEventListener("DOMContentLoaded", function () {
    function updateClock() {
        const now = new Date(); // Get current time
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let ampm = document.getElementById("AMPM"); // Get AM/PM element

        // Determine AM or PM
        if (hours >= 12) {
            ampm.textContent = "PM";
        } else {
            ampm.textContent = "AM";
        }

        // Convert to 12-hour format
        if (hours > 12) {
            hours -= 12;
        }
        
        if (hours === 0) {
            hours = 12; // Midnight should be 12 AM
        }

        // Add leading zero if needed
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        // Update the clock display
        document.getElementById("clock").querySelector("p").innerHTML = 
            hours + ":" + minutes + ":" + seconds + " <span id='AMPM'>" + ampm.textContent + "</span>";
    }

    function updateDate() {
        const now = new Date(); // Get current date
        let day = now.getDate();
        let month = now.getMonth() + 1; // Months are zero-based, so add 1
        let year = now.getFullYear(); // Get the full year
        
        // Update the date display
        document.getElementById("Date").innerText = `${day}/${month}/${year}`;
    }

    setInterval(updateClock, 1000); // Update the clock every second
    updateClock(); // Initial call to display time immediately
    updateDate(); // Set the date once on load
});
