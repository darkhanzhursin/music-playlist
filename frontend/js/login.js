const SERVER = "http://localhost:3000";
window.onload = function () {
  document.getElementById("loginBtn").onclick = sendCredentials;
};

async function sendCredentials(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch(SERVER + "/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
  const res = await response.json();
  localStorage.setItem("User", res.username);
  localStorage.setItem("Date", res.date);
}
