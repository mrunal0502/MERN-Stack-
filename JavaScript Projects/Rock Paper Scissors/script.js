const choices = ["rock", "paper", "scissors"];

const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");

let result = "";

function playGame(playerChoice) {
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  console.log(computerChoice);

  if (playerChoice === computerChoice) {
    result = "It's a tie!";
  } else {
    switch (playerChoice) {
      case "rock":
        result = computerChoice === "scissors" ? "You win" : "You loose";
        break;
      case "paper":
        result = computerChoice === "rock" ? "You win" : "You loose";
        break;
      case "scissors":
        result = computerChoice === "paper" ? "You win" : "You loose";
        break;
    }
  }

  playerDisplay.textContent = `Player : ${playerChoice}`;
  computerDisplay.textContent = `Computer : ${computerChoice}`;
  resultDisplay.textContent = result;
  resultDisplay.classList.remove("greenText", "redText");
  switch (result) {
    case "You win":
      resultDisplay.classList.add("greenText");
      break;
    case "You loose":
      resultDisplay.classList.add("redText");
      break;
  }
}
