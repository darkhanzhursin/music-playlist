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
  if (res.success === true) {
    sessionStorage.setItem("user", res.username);
    sessionStorage.setItem("date", res.date);
    sessionStorage.setItem("userId", res.id);
    sessionStorage.setItem("credentials", btoa(`${username}:${password}`));
    window.location.replace("./playlist/index.html");
  } else {
    alert("Wrong username or password");
  }
}
