// Select canvas and get context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set canvas size based on CSS
canvas.width = 550;
canvas.height = 510;

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
}

// Attach event listeners to color buttons
var colorButtons = document.querySelectorAll(".color-options button");
for (var i = 0; i < colorButtons.length; i++) {
    colorButtons[i].addEventListener("click", function() {
        changeColor(this.id);
    });
}

// Function to change brush size
function changeBrushSize(size) {
    brushSize = size;
}

// Attach event listeners to size buttons
document.getElementById("small").addEventListener("click", function() {
    changeBrushSize(3);
});
document.getElementById("medium").addEventListener("click", function() {
    changeBrushSize(5);
});
document.getElementById("large").addEventListener("click", function() {
    changeBrushSize(8);
});

// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Attach event listener to clear button
document.getElementById("clear").addEventListener("click", clearCanvas);
