const frame = document.getElementById("qr-code");
let currentSize = 128;

function generateQRCode(size = currentSize) {
    const input = document.getElementById("input").value.trim();

    if (!input) {
        frame.innerHTML = "";
        return;
    }

    frame.innerHTML = "";

    new QRCode(frame, {
        text: input,
        width: size,
        height: size,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

document.getElementById("Sizes").addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        switch (event.target.textContent.toLowerCase()) {
            case "small":
                currentSize = 100;
                break;
            case "medium":
                currentSize = 150;
                break;
            case "large":
                currentSize = 200;
                break;
        }
        generateQRCode(currentSize);
        changeColor(event.target);
    }
});

document.getElementById("input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        generateQRCode();
    }
});

document.getElementById("input").addEventListener("input", function() {
    generateQRCode();
});

function changeColor(activeButton) {
    document.querySelectorAll("#Sizes button").forEach(button => {
        button.style.backgroundColor = "#4A90E2";
    });
    activeButton.style.backgroundColor = "#357ABD";
    activeButton.style.border="2px solid rgb(0, 157, 255)";
}
