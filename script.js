// Function to generate bubbles
function makeBubble() {
    let clutter = "";

    for (let i = 1; i <= 119; i++) {
        let rn = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${rn}</div>`;
    }

    document.querySelector("#pbtm").innerHTML = clutter;
}

makeBubble();

let timer = 60;
let score = 0;
let hitrn = 0; // The target number to hit
const targetScore = 100; // New: Set target score to win

// Timer function
function runTimer() {
    let timerint = setInterval(function () {
        if (timer > 0 && score < targetScore) { // Update: Stop the timer if the player wins
            timer--;
            document.querySelector("#timerval").textContent = timer;
        } else {
            clearInterval(timerint);
            if (score >= targetScore) {
                gameOver("You Win!"); // Player won
            } else {
                gameOver("Game Over"); // Player lost
            }
        }
    }, 1000);
}

runTimer();

// Function to generate a new random target number
function getNewHit() {
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector("#hitval").textContent = hitrn;
}

getNewHit();

// Function to increase score
function increaseScore() {
    score += 10;
    document.querySelector("#scoreval").textContent = score;
    checkWinCondition(); // Check if the player has won
}

// Function to check if the player has won
function checkWinCondition() {
    if (score >= targetScore) {
        gameOver("You Win!"); // Show win message if target score is reached
    }
}

// Function to handle game over or win scenarios
function gameOver(message) {
    document.querySelector("#pbtm").innerHTML = `<h1>${message}</h1><button id="restart">Restart Game</button>`;
    document.querySelector("#restart").addEventListener("click", function () {
        resetGame();
    });
}

// Event listener for bubble clicks using event delegation
document.querySelector("#pbtm").addEventListener("click", function (e) {
    if (e.target.classList.contains("bubble")) { // Check if the clicked element has the class 'bubble'
        if (parseInt(e.target.textContent) === hitrn) {
            e.target.remove();
            increaseScore();
            getNewHit(); // Change the target number
        }
    }
});

// Function to reset the game after it ends
function resetGame() {
    timer = 60;
    score = 0;
    document.querySelector("#timerval").textContent = timer;
    document.querySelector("#scoreval").textContent = score;
    makeBubble();
    runTimer();
    getNewHit();
}


// Function to update the theme toggle button icon and text
function updateThemeToggleButton() {
    const themeToggleButton = document.querySelector("#themeToggle");
    const icon = document.createElement("span"); // Create span for icon
    
    if (document.body.classList.contains("dark")) {
        themeToggleButton.textContent = "Light Mode"; // Change text
        icon.textContent = "☀️"; // Sun icon for light mode
        themeToggleButton.classList.remove("light");
        themeToggleButton.classList.add("dark");
    } else {
        themeToggleButton.textContent = "Dark Mode"; // Change text
        icon.textContent = "🌙"; // Moon icon for dark mode
        themeToggleButton.classList.remove("dark");
        themeToggleButton.classList.add("light");
    }

    // Append icon to the button
    themeToggleButton.appendChild(icon);
}

// Event listener to toggle the theme and update the button
document.querySelector("#themeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark");
    updateThemeToggleButton();
});

// Initial setup of the button
updateThemeToggleButton();

// Function to handle game over and show the restart button
function gameOver(message) {
    document.querySelector("#pbtm").innerHTML = `<h1>${message}</h1>`;
    document.querySelector("#restart").style.display = "block"; // Show the restart button
}

// Function to handle restart button click
document.querySelector("#restart").addEventListener("click", function () {
    resetGame();
});
