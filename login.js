function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  // demo login (no backend)
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("username", username);

  // go to profile page
  window.location.href = "profile.html";
}
