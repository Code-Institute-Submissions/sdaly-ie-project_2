// Obtain DOM elements for scores and choices.
const playerScoreEl = document.getElementById("playerScore");
const playerChoiceEl = document.getElementById("playerChoice");
const computerScoreEl = document.getElementById("computerScore");
const computerChoiceEl = document.getElementById("computerChoice");

// Reference DOM elements to player's choices.
const playerRock = document.getElementById("playerRock");
const playerPaper = document.getElementById("playerPaper");
const playerScissors = document.getElementById("playerScissors");
const playerLizard = document.getElementById("playerLizard");
const playerSpock = document.getElementById("playerSpock");

// Reference DOM elements to computer's choices.
const computerRock = document.getElementById("computerRock");
const computerPaper = document.getElementById("computerPaper");
const computerScissors = document.getElementById("computerScissors");
const computerLizard = document.getElementById("computerLizard");
const computerSpock = document.getElementById("computerSpock");

// Obtain all game icons from the DOM.
const allGameIcons = document.querySelectorAll(".far");

// Reference DOM element for displaying game result.
const resultText = document.getElementById("resultText");

// Define the game's rules and interactions.
const choices = {
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
    allGameIcons.forEach((icon) => {
        icon.classList.remove("selected");
    });
}

// Reset game state: scores, choices, and visual indicators.
function resetAll() {
    playerScoreNumber = 0;
    computerScoreNumber = 0;
    playerScoreEl.textContent = playerScoreNumber;
    computerScoreEl.textContent = computerScoreNumber;
    playerChoiceEl.textContent = "";
    computerChoiceEl.textContent = "";
    resultText.textContent = "";
    resetSelected();
}
window.resetAll = resetAll;

// Determine computer's choice randomly.
function computerRandomChoice() {
    const computerChoiceNumber = Math.random();
    if (computerChoiceNumber < 0.2) {
        computerChoice = "rock";
    } else if (computerChoiceNumber <= 0.4) {
        computerChoice = "paper";
    } else if (computerChoiceNumber <= 0.6) {
        computerChoice = "scissors";
    } else if (computerChoiceNumber <= 0.8) {
        computerChoice = "lizard";
    } else {
        computerChoice = "spock";
    }
}

// Display the computers choice in text format.
function displayComputerChoice() {
    switch (computerChoice) {
        case "rock":
            computerRock.classList.add("selected");
            computerChoiceEl.textContent = " chose 'Rock'";
            break;
        case "paper":
            computerPaper.classList.add("selected");
            computerChoiceEl.textContent = " chose 'Paper'";
            break;
        case "scissors":
            computerScissors.classList.add("selected");
            computerChoiceEl.textContent = " chose 'Scissors'";
            break;
        case "lizard":
            computerLizard.classList.add("selected");
            computerChoiceEl.textContent = " chose 'Lizard'";
            break;
        case "spock":
            computerSpock.classList.add("selected");
            computerChoiceEl.textContent = " chose 'Spock'";
            break;
        default:
            break;
    }
}

// Check result, update scores and show feedback.
function updateScore(playerChoice) {
    if (playerChoice === computerChoice) {
        resultText.textContent = "It's a tie.";
    } else {
        const choice = choices[playerChoice];
        if (choice.defeats[computerChoice]) {
            resultText.textContent = `You Won! ${choice.defeats[computerChoice]}`;
            playerScoreNumber++;
            playerScoreEl.textContent = playerScoreNumber;
        } else {
            const defeatText = choices[computerChoice].defeats[playerChoice];
            resultText.textContent = `You Lost! ${defeatText}`;
            computerScoreNumber++;
            computerScoreEl.textContent = computerScoreNumber;
        }
    }
}

// Process a game, determine computer's choice, display choice & update scores.
function checkResult(playerChoice) {
    resetSelected();
    computerRandomChoice();
    displayComputerChoice();
    updateScore(playerChoice);
}

// Player's selection to start game and displays choice in text format.
function select(playerChoice) {
    checkResult(playerChoice);
    switch (playerChoice) {
        case "rock":
            playerRock.classList.add("selected");
            playerChoiceEl.textContent = "- selected 'Rock'";
            break;
        case "paper":
            playerPaper.classList.add("selected");
            playerChoiceEl.textContent = "- selected 'Paper'";
            break;
        case "scissors":
            playerScissors.classList.add("selected");
            playerChoiceEl.textContent = "- selected 'Scissors'";
            break;
        case "lizard":
            playerLizard.classList.add("selected");
            playerChoiceEl.textContent = "- selected 'Lizard'";
            break;
        case "spock":
            playerSpock.classList.add("selected");
            playerChoiceEl.textContent = "- selected 'Spock'";
            break;
        default:
            break;
    }
}
window.select = select;

// Initialize game when script loads.
resetAll();

// Hamburger menu toggle for mobile view.
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

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
