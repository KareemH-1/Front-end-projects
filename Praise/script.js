document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".tasbeeh-btn");
    const resetButtons = document.querySelectorAll(".reset");

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            let counter = this.previousElementSibling; 
            let countText = counter.textContent.split("/")[0].trim();

            if (countText === "تم") return;

            let count = parseInt(countText);
            let max = parseInt(counter.getAttribute("data-max"));

            if (count+1 >= max) {
                counter.textContent = "تم";
            } else {
                counter.textContent = `${count + 1} / ${max}`;
                
            }
        });
    });

    resetButtons.forEach(resetButton => {
        resetButton.addEventListener("click", function() {
            let counter = this.previousElementSibling.previousElementSibling;
            let max = counter.getAttribute("data-max");
            counter.textContent = `0 / ${max}`;
        });
    });
});
