// LOGIN CHECK
if (localStorage.getItem("isLoggedIn") !== "true") {
  alert("Please login first!");
  window.location.href = "login.html";
}

// GET SELECTED ANIMALS
const userAnimal = localStorage.getItem("userAnimal");
const matchAnimal = localStorage.getItem("matchAnimal");

const chat = document.getElementById("chat");
const header = document.getElementById("chatHeader");

header.innerText = `🦁 ${userAnimal.toUpperCase()} chatting with 🐾 ${matchAnimal.toUpperCase()}`;

// ANIMAL SOUNDS
const sounds = {
  lion: "ROARRR 😤",
  wolf: "Awoooo 🌙",
  bird: "Tweet tweet 🐦",
  snake: "Sssss 🐍"
};

// TRANSLATIONS
const translateMap = {
  "ROARRR 😤": "I'm dominant but emotionally unavailable.",
  "Awoooo 🌙": "I miss my ex-pack but pretend I'm fine.",
  "Tweet tweet 🐦": "I want attention 24/7.",
  "Sssss 🐍": "Trust me… or don’t."
};

// SEND USER MESSAGE (RIGHT SIDE)
function sendUser() {
  playSound(userAnimal);
  addMessage(sounds[userAnimal], "sent");
}

// AUTO REPLY FROM MATCH (LEFT SIDE)
function autoReply() {
  playSound(matchAnimal);
  addMessage(sounds[matchAnimal], "received");
}

// TRANSLATE LAST MESSAGE
function translate() {
  const msgs = document.querySelectorAll(".msg");
  if (msgs.length === 0) return;

  const last = msgs[msgs.length - 1];
  const meaning = translateMap[last.innerText] || "No translation.";

  const div = document.createElement("div");
  div.className = "msg received";
  div.innerText = meaning;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// ADD MESSAGE TO CHAT
function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  div.innerText = text;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// PLAY SOUND
function playSound(animal) {
  const audio = new Audio(`sounds/${animal}.mp3`);
  audio.play();
}
