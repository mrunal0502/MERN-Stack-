const display = document.getElementById("display");
const counter = document.getElementById("counter");

let timerDuration = 25 * 60; // Default to 25 minutes in seconds
let intervalId = null;
let timeRemaining = timerDuration;
let isPaused = true;
let streakCount = 0;

function updateDisplay() {
  const minutes = Math.floor(timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeRemaining % 60).toString().padStart(2, "0");
  display.textContent = `${minutes}:${seconds}`;
}

function updateStreak() {
  streakCount++;
  counter.textContent = `#${streakCount}`;
}

function startTimer() {
  if (isPaused && timeRemaining > 0) {
    isPaused = false;
    intervalId = setInterval(() => {
      if (!isPaused && timeRemaining > 0) {
        timeRemaining--;
        updateDisplay();
      } else if (timeRemaining === 0) {
        clearInterval(intervalId);
        intervalId = null;
        alert("Time's up!");
        if (timerDuration === 25 * 60) {
          updateStreak(); // Increment streak only for Pomodoro sessions
        }
      }
    }, 1000);
  }
}

function pauseTimer() {
  isPaused = true;
  clearInterval(intervalId); // Stop the interval but keep `timeRemaining`
  intervalId = null;
}

function resetTimer(durationInMinutes) {
  clearInterval(intervalId);
  intervalId = null;
  isPaused = true;
  timerDuration = durationInMinutes * 60;
  timeRemaining = timerDuration;
  updateDisplay();
}

function pomodoro() {
  resetTimer(25); // 25 minutes
}

function shortbreak() {
  resetTimer(5); // 5 minutes
}

function longbreak() {
  resetTimer(15); // 15 minutes
}

// Initialize the display
updateDisplay();
counter.textContent = `#${streakCount}`;
