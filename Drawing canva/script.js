// Select canvas and get context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Function to set canvas size dynamically
function updateCanvasSize() {
    var container = document.querySelector(".canvas");
    canvas.width = container.clientWidth; // Set width dynamically
    canvas.height = container.clientHeight; // Set height dynamically
}

// Call updateCanvasSize initially
updateCanvasSize();

// Ensure size updates if the window is resized
window.addEventListener("resize", updateCanvasSize);

// Initial brush settings
var painting = false;
var brushColor = "black";
var brushSize = 5;

// Get the canvas position to adjust coordinates
function getMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// Function to start drawing
function startPosition(event) {
    painting = true;
    ctx.beginPath();
    var pos = getMousePos(event);
    ctx.moveTo(pos.x, pos.y);
    draw(event);
}

// Function to stop drawing
function endPosition() {
    painting = false;
    ctx.beginPath();
}

// Function to draw
function draw(event) {
    if (!painting) {
        return;
    }

    var pos = getMousePos(event);

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = brushColor;

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

// Event Listeners for drawing
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

// Function to change brush color
function changeColor(color) {
    brushColor = color;

    // Remove active class from all colors
    var colorButtons = document.querySelectorAll(".color-options button");
    for (var i = 0; i < colorButtons.length; i++) {
        colorButtons[i].classList.remove("active-color");
    }

    // Add active class to the selected color
    document.getElementById(color).classList.add("active-color");
}

// Attach event listeners to color buttons
var colorButtons = document.querySelectorAll(".color-options button");
for (var i = 0; i < colorButtons.length; i++) {
    colorButtons[i].addEventListener("click", function() {
        changeColor(this.id);
    });
}
document.getElementById("color-picker").addEventListener("input", function() {
    brushColor = this.value;
});

// Function to change brush size
function changeBrushSize(size, element) {
    brushSize = size;

    // Remove active class from all size buttons
    var sizeButtons = document.querySelectorAll(".size-options button");
    for (var i = 0; i < sizeButtons.length; i++) {
        sizeButtons[i].classList.remove("active-size");
    }

    // Add active class to the selected size button
    element.classList.add("active-size");
}

// Attach event listeners to size buttons
document.getElementById("small").addEventListener("click", function() {
    changeBrushSize(3, this);
});
document.getElementById("medium").addEventListener("click", function() {
    changeBrushSize(5, this);
});
document.getElementById("large").addEventListener("click", function() {
    changeBrushSize(8, this);
});

// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Attach event listener to clear button
document.getElementById("clear").addEventListener("click", clearCanvas);

// Set default active selections
document.getElementById("black").classList.add("active-color");
document.getElementById("medium").classList.add("active-size");
