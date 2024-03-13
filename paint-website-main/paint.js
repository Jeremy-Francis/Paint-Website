let isBrush = true;
let isEraser = false;
let isDrawing = false;

let currentColor = "black";
let currentTool = null;

let buttons = document.querySelectorAll('.colors');
let brush = document.querySelector('#brush-icon');
let eraser = document.querySelector('#eraser-icon');
let canvas = document.querySelector('#canvas-section');
let ctx = canvas.getContext('2d');
let drawTools = document.querySelectorAll('.tools');

canvas.addEventListener('mousedown', function () {
    isDrawing = true;
    draw(event);
});

canvas.addEventListener('mouseup', function () {
    isDrawing = false;
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

brush.addEventListener('click', function () {
    currentTool = "brush";
    ctx.globalCompositeOperation = "source-over";
});

eraser.addEventListener('click', function () {
    currentTool = "eraser";
    ctx.globalCompositeOperation = "destination-out";
});

for (let button of buttons) {
    button.addEventListener('click', function () {
        selectColor(button);
    })
}

for (let tool of drawTools) {
    tool.addEventListener('click', function () {
        selectTool(tool);
    })
}

let selectColor = (button) => {
    for (let button of buttons) {
        button.classList.remove('enlarge-color');
    }

    currentColor = window.getComputedStyle(button).backgroundColor;
    ctx.strokeStyle = currentColor;
    if (currentTool === "brush") {
        ctx.strokeStyle = white;
    }
    button.classList.add('enlarge-color');
};

let selectTool = (tool) => {
    for (let tool of drawTools) {
        tool.classList.remove('enlarge-tool');
    }
    tool.classList.add('enlarge-tool');
};

function draw(event) {
    if (!isDrawing) return;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}
