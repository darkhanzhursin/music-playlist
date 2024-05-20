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
  console.log(res);
  if (res.success === true) {
    sessionStorage.setItem("User", res.username);
    sessionStorage.setItem("Date", res.date);
    window.location.replace("./playlist/index.html");
  } else {
    alert("Wrong username or password");
  }
}
