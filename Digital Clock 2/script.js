const hourElement = document.getElementById("hour");
const minuteElement = document.getElementById("minute");
const secondElement = document.getElementById("second");
const ampmElement = document.querySelector(".ampm");
const dateElement = document.querySelector(".date");
const settingsButton = document.querySelector(".settings-button");
const dropdownContent = document.querySelector(".dropdown-content");
const formatToggle = document.querySelector(".cb");

let is24HourFormat = false;

settingsButton.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownContent.classList.toggle("show");
});

document.addEventListener("click", () => {
    dropdownContent.classList.remove("show");
});

dropdownContent.addEventListener("click", (e) => {
    e.stopPropagation();
});

formatToggle.addEventListener("change", () => {
    is24HourFormat = formatToggle.checked;
    updateClock();
});

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    if (is24HourFormat) {
        hourElement.textContent = hours.toString().padStart(2, '0');
        ampmElement.style.display = "none";
    } else {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        hourElement.textContent = hours.toString().padStart(2, '0');
        ampmElement.textContent = ampm;
        ampmElement.style.display = "block";
    }

    minuteElement.textContent = minutes;
    secondElement.textContent = seconds;
    dateElement.textContent = `${monthNames[now.getMonth()]}, ${dayNames[now.getDay()]} ${now.getDate()}`;
}

updateClock();
setInterval(updateClock, 1000);