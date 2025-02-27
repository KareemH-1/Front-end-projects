// Select canvas and get context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Function to set canvas size dynamically
function updateCanvasSize() {
    var container = document.querySelector(".canvas");
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}

// Call updateCanvasSize initially
updateCanvasSize();

// Ensure size updates if the window is resized
window.addEventListener("resize", updateCanvasSize);

// Initial brush settings
var painting = false;
var brushColor = "black";
var brushSize = 5;

// Create a cursor ball for the eraser
var cursorBall = document.createElement("div");
cursorBall.style.position = "absolute";
cursorBall.style.width = "30px";
cursorBall.style.height = "30px";
cursorBall.style.borderRadius = "50%";
cursorBall.style.border = "2px solid red";
cursorBall.style.pointerEvents = "none";
cursorBall.style.display = "none";
cursorBall.style.zIndex = "1000";
document.body.appendChild(cursorBall);

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
    if (!painting) return;
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
    document.getElementById("eraser").classList.remove("active-eraser");
    cursorBall.style.display = "none";
    document.querySelectorAll(".color-options button").forEach(btn => btn.classList.remove("active-color"));
    document.getElementById(color).classList.add("active-color");
}

document.querySelectorAll(".color-options button").forEach(button => {
    button.addEventListener("click", function() {
        changeColor(this.id);
    });
});

document.getElementById("color-picker").addEventListener("input", function() {
    brushColor = this.value;
});

// Function to change brush size
function changeBrushSize(size, element) {
    brushSize = size;
    document.querySelectorAll(".size-options button").forEach(btn => btn.classList.remove("active-size"));
    element.classList.add("active-size");
}

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
document.getElementById("clear").addEventListener("click", function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Set default active selections
document.getElementById("black").classList.add("active-color");
document.getElementById("medium").classList.add("active-size");

// Function to activate eraser
function activateEraser() {
    brushColor = "white";
    brushSize = 30;
    document.querySelectorAll(".color-options button").forEach(btn => btn.classList.remove("active-color"));
    document.querySelectorAll(".size-options button").forEach(btn => btn.classList.remove("active-size"));
    document.getElementById("eraser").classList.add("active-eraser");
    cursorBall.style.display = "block";
    cursorBall.style.width = brushSize + "px";
    cursorBall.style.height = brushSize + "px";
}

document.getElementById("eraser").addEventListener("click", activateEraser);

// Update cursor ball position
canvas.addEventListener("mousemove", function (event) {
    if (cursorBall.style.display === "block") {
        cursorBall.style.left = event.pageX - brushSize / 2 + "px";
        cursorBall.style.top = event.pageY - brushSize / 2 + "px";
    }
});
