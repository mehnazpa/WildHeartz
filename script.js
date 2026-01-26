/* ---------------- GO TO LOGIN (INDEX BUTTON) ---------------- */
function goLogin() {
  window.location.href = "login.html";
}

/* ---------------- LOGIN ---------------- */
function login() {
  const username = document.getElementById("username").value;

  if (username === "") {
    alert("Wild Username cannot be empty 🐾");
    return;
  }

  // LOGIN STATUS (needed for chat protection)
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("username", username);

  window.location.href = "profile.html";
}

/* ---------------- SAVE PROFILE ---------------- */
function saveProfile() {
  const mySpecies = document.getElementById("mySpecies").value;
  const pairSpecies = document.getElementById("pairSpecies").value;

  const flags = [];
  document.querySelectorAll("input[type=checkbox]:checked").forEach(cb => {
    flags.push(cb.value);
  });

  // SAVE FOR MATCH PAGE
  localStorage.setItem("mySpecies", mySpecies);
  localStorage.setItem("pairSpecies", pairSpecies);
  localStorage.setItem("flags", JSON.stringify(flags));

  // SAVE FOR CHAT PAGE
  localStorage.setItem("userAnimal", mySpecies);
  localStorage.setItem("matchAnimal", pairSpecies);

  window.location.href = "match.html";
}

/* ---------------- MATCH LOADING ---------------- */
function startMatch() {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("resultBox").style.display = "inline-block";
    showMatch();
  }, 2500);
}

/* ---------------- MATCH RESULT ---------------- */
function showMatch() {
  const mySpecies = localStorage.getItem("mySpecies");
  const pairSpecies = localStorage.getItem("pairSpecies");
  const flags = JSON.parse(localStorage.getItem("flags")) || [];

  const enemies = {
  Lion: ["Deer", "Rabbit"],
  Wolf: ["Deer", "Rabbit"],
  Snake: ["Rabbit", "Bird"],
  Bird: ["Snake"],
  Deer: ["Lion", "Wolf"],
  Rabbit: ["Lion", "Wolf", "Snake"]
};

  let percentage = Math.floor(Math.random() * 30) + 50; // 50–80%
  percentage += flags.length * 5;

  let warning = "";
  if (enemies[mySpecies]?.includes(pairSpecies)) {
    percentage -= 25;
    warning = `⚠️ <b>Predator Alert!</b><br>This may end in dinner, not Dating 🍽️😂`;
  }

  percentage = Math.min(100, Math.max(10, percentage));
  localStorage.setItem("matchPercent", percentage);

  const result = `
  <div>
    <span class="pair-love">${mySpecies}</span> ❤️ <span class="pair-love">${pairSpecies}</span><br><br>
    💘 <b>Match Percentage:</b> ${percentage}%<br>
    ${warning ? `<div class="warning">${warning}</div>` : ""}
    🐾 <b>Traits Selected:</b> ${flags.join(", ") || "None"}
  </div>
  <button id="chatBtn" onclick="goChat()">Start Chat 🐾💬</button>
`;
  document.getElementById("resultBox").innerHTML = result;
}

/* ---------------- GO TO CHAT ---------------- */
function goChat() {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    alert("Please login to chat 🐾");
    return;
  }
  window.location.href = "chat.html";
}

/* ---------------- CHAT PAGE FUNCTIONS ---------------- */
function loadChat() {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    alert("Please login first 🐾");
    window.location.href = "login.html";
    return;
  }

  const userAnimal = localStorage.getItem("userAnimal");
  const matchAnimal = localStorage.getItem("matchAnimal");

  if (!userAnimal || !matchAnimal) {
    alert("Chat data missing 🐾");
    window.location.href = "profile.html";
    return;
  }

  document.getElementById("chatTitle").innerHTML =
    `${userAnimal} 🐾 chatting with ${matchAnimal}`;
}

/* ---------------- SEND MESSAGE ---------------- */
function sendMessage() {
  const input = document.getElementById("msgInput");
  const msg = input.value.trim();
  if (msg === "") return;

  const chatBox = document.getElementById("chatBox");

  // USER MESSAGE (RIGHT SIDE)
  chatBox.innerHTML += `
    <div class="msg right">
      <b>You:</b> ${msg}
    </div>
  `;

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // AUTO REPLY after 1 second
  setTimeout(autoReply, 1000);
}

/* ---------------- AUTO REPLY ---------------- */
function autoReply() {
  const chatBox = document.getElementById("chatBox");
  const animal = localStorage.getItem("matchAnimal");

  const soundsText = {
    Lion: "ROARRR 😤",
    Wolf: "Awoooo 🌙",
    Bird: "Tweet tweet 🐦",
    Deer: "Bleaaat 😏",
    Snake: "Sssss 🐍",
    Rabbit: "Thump thump 🐇"
  };

  const audioFiles = {
    Lion: "chats/sounds/lion.mp3",
    Wolf: "chats/sounds/wolf.mp3",
    Bird: "chats/sounds/bird.mp3",
    Snake: "chats/sounds/snake.mp3",
    Rabbit: "chats/sounds/rabbit.mp3",
    Deer: "chats/sounds/deer.mp3"
  };

  const msg = soundsText[animal] || "👀";
  const audioSrc = audioFiles[animal];

  // LEFT SIDE bubble
  chatBox.innerHTML += `
    <div class="msg left" id="lastAnimalMsg">
      <b>${animal}:</b> ${msg}
    </div>
  `;

  chatBox.scrollTop = chatBox.scrollHeight;

  // PLAY sound automatically
}

/* ---------------- TRANSLATE ---------------- */
function translateLast() {
  const chatBox = document.getElementById("chatBox");
  const messages = chatBox.querySelectorAll(".left");

  if (messages.length === 0) return;

  const last = messages[messages.length - 1];

  const translations = {
    "ROARRR 😤": "I'm dominant but emotionally unavailable",
    "Awoooo 🌙": "I miss you but won't admit it",
    "Tweet tweet 🐦": "You're cute, let's fly away",
    "Bleaaat 😏": "I'm unsure about this",
    "Sssss 🐍": "Trust me... or don't",
    "Thump thump 🐇": "I'm uncomfortable,please slow down"
  };

  Object.keys(translations).forEach(sound => {
    if (last.innerHTML.includes(sound) && !last.innerHTML.includes("(")) {
      last.innerHTML += `<br><i>(${translations[sound]})</i>`;
    }
  });
}

/* ---------------- PLAY SOUND BUTTON ---------------- */
function playAnimalSound() {
  const animal = localStorage.getItem("matchAnimal");
  const audioFiles = {
    Lion: "chats/sounds/lion.mp3",
    Wolf: "chats/sounds/wolf.mp3",
    Bird: "chats/sounds/bird.mp3",
    Snake: "chats/sounds/snake.mp3",
    Rabbit: "chats/sounds/rabbit.mp3",
    Deer: "chats/sounds/deer.mp3"
  };

  const audioSrc = audioFiles[animal];
  if (audioSrc) {
    const audio = new Audio(audioSrc);
    audio.play();
  } else {
    alert("Sound not available for this species 🐾");
  }
}
