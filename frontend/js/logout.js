window.onload = function () {
  document.getElementById("logoutBtn").onclick = logout;
  document.getElementById("addBtn").onclick = addToPlaylist;
};

function logout(e) {
  e.preventDefault();
  window.location.replace("../index.html");
  sessionStorage.clear();
}

async function addToPlaylist(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const userId = sessionStorage.getItem("userId");

  const response = await fetch("http://localhost:3000/user/playlist", {
    method: "POST",
    body: JSON.stringify({
      title,
      author,
      userId,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
  const music = await response.json();

  console.log(music);
}
