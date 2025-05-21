// Global Variables
var numSquares = 6; // Default to 6 squares (Hard mode)
var colors = [];
var pickedColor;
var score = 0;
var gameWon = false; // Tracks if the current game round has been won

// DOM Element Selections
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var h2 = document.querySelector("h2");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var veryHardBtn = document.querySelector("#veryHardBtn");
var scoreDisplay = document.querySelector("#scoreDisplay");

// Initialization Function
function init() {
    setupEventListeners();
    resetGame(true); // Initial game setup, reset score
}

// Setup Event Listeners
function setupEventListeners() {
    // Difficulty buttons - Listeners will be (re-)attached in resetGame
    // Reset button
    resetButton.addEventListener("click", function () {
        resetGame(); // Do not reset score on "New Color" / "Play Again?"
    });

    // Square click listeners
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", handleSquareClick); // Use named handler
    }
}

// Event Handlers
function handleSquareClick() {
    if (gameWon) { // If game is already won, do nothing more
        return;
    }
    var clickedColor = this.style.backgroundColor;

    if (clickedColor === pickedColor) {
        gameWon = true; // Set game as won
        score += 10;
        scoreDisplay.textContent = score;
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        resetButton.classList.add("play-again-button");
        h1.style.backgroundColor = clickedColor;
        h2.style.backgroundColor = clickedColor;
        changeAllSquaresColor(clickedColor);

        // Remove difficulty button listeners to prevent mode change until reset
        easyBtn.removeEventListener("click", handleEasyButtonClick);
        hardBtn.removeEventListener("click", handleHardButtonClick);
        veryHardBtn.removeEventListener("click", handleVeryHardButtonClick);
        // easyBtn.removeAttribute('listener'); // REMOVE THIS HACK

        this.classList.add("correct-guess-feedback");
                setTimeout(() => {
                    this.classList.remove("correct-guess-feedback");
                }, 300);
            } else {
                this.classList.add("incorrect-guess-feedback");
                setTimeout(() => {
                    this.classList.remove("incorrect-guess-feedback");
                }, 400);
                messageDisplay.textContent = "Try Again!";
            }
        });
    }
}

// Game Logic and State Management Functions
function resetGame(resetScoreFlag = false) {
    gameWon = false; // Reset the game won status
    if (resetScoreFlag) {
        score = 0;
    }
    scoreDisplay.textContent = score; // Update score display regardless

    colors = generateRandomColors(numSquares);
    pickedColor = choosePickColor();
    colorDisplay.textContent = pickedColor;

    messageDisplay.textContent = "";
    resetButton.textContent = "New Color";
    resetButton.classList.remove("play-again-button");
    h1.style.backgroundColor = "#732323"; // Default header background
    h2.style.backgroundColor = "#732323"; // Default header background

    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        } else {
            squares[i].style.display = "none";
        }
    }

    // Re-attach event listeners for difficulty buttons if they were removed
    // Re-attach event listeners for difficulty buttons
    // Remove first to prevent duplicates, then add.
    easyBtn.removeEventListener("click", handleEasyButtonClick);
    hardBtn.removeEventListener("click", handleHardButtonClick);
    veryHardBtn.removeEventListener("click", handleVeryHardButtonClick);

    easyBtn.addEventListener("click", handleEasyButtonClick);
    hardBtn.addEventListener("click", handleHardButtonClick);
    veryHardBtn.addEventListener("click", handleVeryHardButtonClick);
    // easyBtn.setAttribute('listener', 'true'); // REMOVE THIS HACK
}

// Event Handlers - Renamed for consistency
function handleEasyButtonClick() {
    // Do nothing if already selected or if game is won (difficulty listeners are removed then)
    if (this.classList.contains("selected")) return; 
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    veryHardBtn.classList.remove("selected");
    numSquares = 3;
    resetGame(true);
}

function handleHardButtonClick() {
    if (this.classList.contains("selected")) return;
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    veryHardBtn.classList.remove("selected");
    numSquares = 6;
    resetGame(true);
}

function handleVeryHardButtonClick() {
    if (this.classList.contains("selected")) return;
    veryHardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    hardBtn.classList.remove("selected");
    numSquares = 9;
    resetGame(true);
}

// Helper Functions
function changeAllSquaresColor(color) {
    // Change color of all squares to the given color
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function choosePickColor() {
    // Pick a random color from the 'colors' array
    var randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function generateRandomColors(num) {
    // Generate an array of 'num' random RGB colors
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(randomRGB());
    }
    return arr;
}

function randomRGB() {
    // Generates a single random RGB color string
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

// Start the game
init();
