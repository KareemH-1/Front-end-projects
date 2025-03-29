const hour = document.querySelector(".hour");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");

const ampm = document.querySelector(".ampm");
const date = document.querySelector(".date");

const button = document.querySelector(".settings-button");
const dropdown = document.querySelector(".dropdown");
const dropdownContent = document.querySelector(".dropdown-content");
button.addEventListener("click", () => {
    if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
        dropdownContent.classList.remove("show");
    } else {
        dropdown.classList.add("show");
        dropdownContent.classList.add("show");

        setTimeout(() => {
            dropdown.classList.remove("show");
            dropdownContent.classList.remove("show");
        }, 5000);
    }
});

