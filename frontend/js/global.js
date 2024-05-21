const SERVER = "http://localhost:3000";
const userId = sessionStorage.getItem("userId");
let counterId = 1;
window.onload = function () {
  loadGlobalMusics();
  document.getElementById("logoutBtn").onclick = logout;
  document.getElementById("addBtn").onclick = addToPlaylist;
};

function logout(e) {
  e.preventDefault();
  window.location.replace("../index.html");
  sessionStorage.clear();
}

async function addToPlaylist(e) {
  console.log("here");
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;

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

function loadGlobalMusics() {
  let html = "";
  fetch(SERVER + "/users/" + userId + "/musics?page=2&limit=5")
    .then((response) => response.json())
    .then((musics) => {
      console.log(musics);
      musics.forEach((music) => {
        html += `
        <tr>
          <th scope="row">${counterId++}</th>
          <td id="title">${music.title}</td>
          <td id="author">${music.author}</td>
          <td>
              <img src="../static/plus-icon.svg" alt="Add to playlist" class="add-to-playlist-icon" id="addBtn">
          </td>
        </tr>
        `;
      });
      document.getElementById("global-tbody").innerHTML = html;
    });
}
