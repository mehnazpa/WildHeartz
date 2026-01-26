// protect page
if (localStorage.getItem("isLoggedIn") !== "true") {
  alert("Please login first");
  window.location.href = "login.html";
}

const animals = ["lion", "wolf", "bird", "snake"];
const userAnimal = localStorage.getItem("userAnimal");

// choose random match (not same animal)
let matchAnimal;
do {
  matchAnimal = animals[Math.floor(Math.random() * animals.length)];
} while (matchAnimal === userAnimal);

// match percentage
const matchPercent = Math.floor(Math.random() * 51) + 50;

// warnings
const warnings = [
  "🚩 Territorial issues",
  "🚩 Eats partner’s food",
  "🚩 Disappears during mating season",
  "🚩 Howls at night"
];

const randomWarning = warnings[Math.floor(Math.random() * warnings.length)];

// display
document.getElementById("matchAnimal").innerText =
  `You matched with a ${matchAnimal.toUpperCase()} 🐾`;

document.getElementById("matchPercent").innerText =
  `Match Percentage: ${matchPercent}%`;

document.getElementById("warning").innerText =
  `Warning: ${randomWarning}`;

// save match
localStorage.setItem("matchAnimal", matchAnimal);
localStorage.setItem("matchPercent", matchPercent);

// go to chat
function goToChat() {
  window.location.href = "chat.html";
}
