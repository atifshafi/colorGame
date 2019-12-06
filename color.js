var numSquares = 6;
var squares = document.querySelectorAll(".square");
var colors = randomColor(numSquares);
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
// var body_color = document.getElementsByTagName("body");
var h1 = document.querySelector("h1");
colorDisplay.textContent = pickedColor;
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

var hardBtn_handler = function () {
    this.classList.add("selected");
    easyBtn.classList.remove("selected");
    numSquares = 6;
    colors = randomColor(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
    }
};

var easyBtn_handler = function () {
    this.classList.add("selected");
    hardBtn.classList.remove("selected");
    numSquares = 3;
    colors = randomColor(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i < squares.length; i++) {
        if (colors[i])
        {
            squares[i].style.backgroundColor = colors[i];
        }
        else{
            squares[i].style.display = "none";
        }
    }
};

hardBtn.addEventListener("click", hardBtn_handler);
easyBtn.addEventListener("click", easyBtn_handler);

resetButton.addEventListener("click", function () {
    colors = randomColor(numSquares);
    pickedColor = pickColor();
    messageDisplay.textContent = "";
    resetButton.textContent = "New Color";
    h1.style.backgroundColor = "#732323";
    colorDisplay.textContent = pickedColor;
    hardBtn.addEventListener("click", hardBtn_handler);
    easyBtn.addEventListener("click", easyBtn_handler);
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    }

});

for(var i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click", function () {
        var clickedColor = this.style.backgroundColor;
        if (clickedColor === pickedColor) {
            messageDisplay.textContent = "Correct!";
            resetButton.textContent = "Play Again?";
            h1.style.backgroundColor = clickedColor;
            changeColors(clickedColor);
            easyBtn.removeEventListener("click", easyBtn_handler);
            hardBtn.removeEventListener("click",  hardBtn_handler);
        } else {
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try Again!"

        }
    })
}

function changeColors(color) {
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    return colors[Math.floor(Math.random()*colors.length)];
}

function randomColor(num) {
var lst = [];
    for(var i = 0; i < num; i++){
        first_shade = Math.floor(Math.random()*255);
        second_shade = Math.floor(Math.random()*255);
        third_shade = Math.floor(Math.random()*255);
        lst.push("rgb(" + first_shade.toString(10)
            + ", " + second_shade.toString(10)
            + ", " + third_shade.toString(10) + ")")
    }
    return lst
}
