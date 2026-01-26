function goEnding() {
  window.location.href = "ending.html";
}

function restart() {
  window.location.href = "index.html";
}

// Autoplay music when page loads
document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('endingMusic');
  if (audio) {
    audio.volume = 0.5;
    audio.play().catch(error => console.log('Autoplay blocked'));
  }
});

// Alternative: Try playing on any user interaction
document.addEventListener('click', function() {
  const audio = document.getElementById('endingMusic');
  if (audio && audio.paused) {
    audio.play();
  }
}, { once: true });