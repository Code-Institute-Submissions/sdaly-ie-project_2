/* Code Bibliography:
 * Hodovaniuk M. "How to Create Rock Paper Scissors Spock Lizard in JavaScript." Hackernoon, 09 May 2021, https://hackernoon.com/how-to-create-rock-paper-scissors-spock-lizard-in-javascript-991k36hy
 * Dima. "How to code Rock, Paper, Scissors, Lizard and Spoke in Javascript." Competent Programming channel - YouTube, 2021, https://www.youtube.com/watch?v=lV2BMXdsDmc
 * Yadav P. "Rock, Paper, Scissor, Lizard, Spock game in javascript." Learners Bucket, 19 May 2020, https://learnersbucket.com/tutorials/js-projects/rock-paper-scissor-lizard-spock-game-in-javascript/
 * Brennan. "Rock, Paper, Scissors, Lizard, Spock." CodePen, 2023, https://codepen.io/763004/pen/pPGGyP
 * Wong J, Neagoie A. "JavaScript Web Projects: 20 Projects to Build Your Portfolio." ZTM, 2023, https://academy.zerotomastery.io/courses/enrolled/1007166
 * Nunez M. "JavaScript - How to Create a Responsive Hamburger Menu with HTML, CSS, & JavaScript." Web Dev Tutorials - YouTube, 2021, https://www.youtube.com/watch?v=flItyHiDm7E
*/

/* 
 * The constant ELEMENTS, contains references to HTML elements related to the game.
 * Where it organizes these references into 'player' and 'computer'.
 * Each section has its score, choice and game option elements 
 * (rock, paper, scissors, lizard, spock).
 */
const ELEMENTS = {
    player: {
        score: document.getElementById("playerScore"),
        choice: document.getElementById("playerChoice"),
        options: {
            rock: document.getElementById("playerRock"),
            paper: document.getElementById("playerPaper"),
            scissors: document.getElementById("playerScissors"),
            lizard: document.getElementById("playerLizard"),
            spock: document.getElementById("playerSpock")
        }
    },
    computer: {
        score: document.getElementById("computerScore"),
        choice: document.getElementById("computerChoice"),
        options: {
            rock: document.getElementById("computerRock"),
            paper: document.getElementById("computerPaper"),
            scissors: document.getElementById("computerScissors"),
            lizard: document.getElementById("computerLizard"),
            spock: document.getElementById("computerSpock")
        }
    },
    
    // Obtain all game icons from the DOM.
    allGameIcons: document.querySelectorAll(".far"),    
    
    // Reference DOM element for displaying game result.
    resultText: document.getElementById("resultText")
};

// Define the game's rules and interactions.
const CHOICES = {
    rock: {
        name: "Rock",
        defeats: {
            scissors: "Rock crushes Scissors",
            lizard: "Rock crushes Lizard",
        },
    },
    paper: {
        name: "Paper",
        defeats: { rock: "Paper covers Rock", spock: "Paper disproves Spock" },
    },
    scissors: {
        name: "Scissors",
        defeats: {
            paper: "Scissors cuts Paper",
            lizard: "Scissors decapitates Lizard",
        },
    },
    lizard: {
        name: "Lizard",
        defeats: { paper: "Lizard eats Paper", spock: "Lizard poisons Spock" },
    },
    spock: {
        name: "Spock",
        defeats: {
            scissors: "Spock smashes Scissors",
            rock: "Spock vaporizes Rock",
        },
    },
};

// Initialize scores and the computer's choice.
let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = "";

// Remove 'selected' class from all icons.
function resetSelected() {
    ELEMENTS.allGameIcons.forEach(icon => icon.classList.remove("selected"));
}

// Reset game state: scores, choices, and visual indicators.
function resetAll() {
    playerScoreNumber = 0;
    computerScoreNumber = 0;
    ELEMENTS.player.score.textContent = playerScoreNumber;
    ELEMENTS.computer.score.textContent = computerScoreNumber;
    ELEMENTS.player.choice.textContent = "";
    ELEMENTS.computer.choice.textContent = "";
    ELEMENTS.resultText.textContent = "";
    resetSelected();
}

// Make 'resetAll' function globally accessible.
window.resetAll = resetAll;

// Determine computer's choice randomly.
function computerRandomChoice() {
    const choiceKeys = Object.keys(CHOICES);
    computerChoice = choiceKeys[Math.floor(Math.random() * choiceKeys.length)];
}

// Shows chosen icon for computer and writes out the choice for both players in words
function displayChoice(elementMap, choice, role) {
    elementMap[choice].classList.add("selected");
    if (role === "computer") {
        ELEMENTS.computer.choice.textContent = ` chose '${CHOICES[choice].name}'`;
    } else {
        ELEMENTS.player.choice.textContent = ` - selected '${CHOICES[choice].name}'`;
    }
}

// Check result of a game, update scores and provides feedback.
function updateScore(playerChoice) {
    if (playerChoice === computerChoice) {
        ELEMENTS.resultText.textContent = "It's a draw!";
    } else {
        const choice = CHOICES[playerChoice];
        if (choice.defeats[computerChoice]) {
            ELEMENTS.resultText.textContent = `You've Won! ${choice.defeats[computerChoice]}`;
            playerScoreNumber++;
            ELEMENTS.player.score.textContent = playerScoreNumber;
        } else {
            const defeatText = CHOICES[computerChoice].defeats[playerChoice];
            ELEMENTS.resultText.textContent = `Computer Won! ${defeatText}`;
            computerScoreNumber++;
            ELEMENTS.computer.score.textContent = computerScoreNumber;
        }
    }
}

// Process a game, determine computer's choice, display choice & update scores.
function checkResult(playerChoice) {
    resetSelected();
    computerRandomChoice();
    displayChoice(ELEMENTS.computer.options, computerChoice, "computer");
    updateScore(playerChoice);
}

// Player's selection to start game and displays choice in text format.
function select(playerChoice) {
    checkResult(playerChoice);
    displayChoice(ELEMENTS.player.options, playerChoice, "player");
}

// Exposes 'select' function to global scope.
window.select = select;

// Initialize game when script loads.
resetAll();

// Hamburger menu toggle for smaller device screens.
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Toggle 'active' class for hamburger and nav menu on click.
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Removes hamburger menu when nav link is clicked.
document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    })
);