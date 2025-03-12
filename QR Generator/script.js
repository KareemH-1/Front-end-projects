const frame = document.getElementById("qr-code");

function generateQRCode(size = 128) {
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
        let size;
        switch (event.target.textContent.toLowerCase()) {
            case "small":
                size = 100;
                break;
            case "medium":
                size = 150;
                break;
            case "large":
                size = 200;
                break;
            default:
                size = 128;
        }
        generateQRCode(size);
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
