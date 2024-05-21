const SERVER = "http://localhost:3000";
const userId = sessionStorage.getItem("userId");
const credentials = sessionStorage.getItem("credentials");
let counterId = 1;
let headers = new Headers();
headers.set("Authorization", "Basic " + credentials);
headers.set("Content-type", "application/json");
window.onload = function () {
  loadGlobalMusics();
  document
    .getElementById("global-tbody")
    .addEventListener("click", handleButtonClick);
  document.getElementById("logoutBtn").onclick = logout;
};

function handleButtonClick(e) {
  if (e.target.id === "addBtn") addToPlaylist(e);
}

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
  console.log("Issue need to solve");
  const response = await fetch("http://localhost:3000/user/playlist", {
    method: "POST",
    body: JSON.stringify({
      title,
      author,
      userId,
    }),
    headers: headers,
  });
  const music = await response.json();

  console.log(music);
}

function loadGlobalMusics() {
  let html = "";
  fetch(SERVER + "/users/" + userId + "/musics?page=2&limit=5", {
    method: "GET",
    headers,
  })
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
