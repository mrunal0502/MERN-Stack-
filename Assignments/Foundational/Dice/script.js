var randomNumber1 = Math.floor(Math.random() * 6 + 1);
console.log("First dice " + randomNumber1);
var randomNumber2 = Math.floor(Math.random() * 6 + 1);
console.log("Second dice " + randomNumber2);
document.querySelectorAll("img")[0].src = `./images/${randomNumber1}.png`;
document.querySelectorAll("img")[1].src = `./images/${randomNumber2}.png`;

var heading = document.getElementsByTagName("h1")[0];

if (randomNumber1 > randomNumber2) {
  heading.innerHTML = "Player 1 Wins";
  console.log("Player 1 wins");
} else if (randomNumber1 === randomNumber2) {
  heading.innerHTML = "It's a Draw!";
} else {
  heading.innerHTML = "Player 2 Wins";
  console.log("Player 2 wins");
}
