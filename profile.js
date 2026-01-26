// protect page
if (localStorage.getItem("isLoggedIn") !== "true") {
  alert("Please login first");
  window.location.href = "login.html";
}

function saveProfile() {
  const animal = document.getElementById("animalSelect").value;

  if (animal === "") {
    alert("Please select your animal");
    return;
  }

  localStorage.setItem("userAnimal", animal);

  // go to match page
  window.location.href = "match.html";
}
