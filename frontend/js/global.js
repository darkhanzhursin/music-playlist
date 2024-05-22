const SERVER = "http://localhost:3000";
const userId = sessionStorage.getItem("userId");
const credentials = sessionStorage.getItem("credentials");
let counterIdtableglobal = 1;
let counterIdtableplaylist = 1;
let headers = new Headers();
headers.set("Authorization", "Basic " + credentials);
headers.set("Content-type", "application/json");
window.onload = function () {
  loadGlobalMusics();
  loadPlaylistUser();
  document
    .getElementById("global-tbody")
    .addEventListener("click", handleButtonClick);
  document.getElementById("logoutBtn").onclick = logout;
};

function handleButtonClick(e) {
  if (e.target.id === "addBtn") addToPlaylist(e);
}
function removeButtonClick(e) {
  if (e.target.id === "removeBtn") removeFromPlaylist(e);
}

function logout(e) {
  e.preventDefault();
  window.location.replace("../index.html");
  sessionStorage.clear();
}

async function addToPlaylist(e) {
  const attr = e.target.attributes["musicId"].value;
  e.preventDefault();
  const title = document.getElementById(`title${attr}`).innerHTML;
  const author = document.getElementById(`author${attr}`).innerHTML;
  console.log(title);
  const response = fetch("http://localhost:3000/users/playlist", {
    method: "POST",
    body: JSON.stringify({
      title,
      author,
      userId,
    }),
    headers: headers,
  }).then(data => data.json()).then(data => populatetableplaylist(data)).catch(data => console.log());
  //const music = await response.json();
  //console.log(music);
}
async function removeFromPlaylist(e) {
  const attr = e.target.attributes["musicId"].value;
  e.preventDefault();
  console.log(attr);
  const response = await fetch("http://localhost:3000/users/" + userId + "/music/" + attr, {
    method: "DELETE",
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
      //console.log(musics);
      musics.forEach((music) => {
        html += `
        <tr>
          <th scope="row">${counterIdtableglobal}</th>
          <td id="title${counterIdtableglobal}">${music.title}</td>
          <td id="author${counterIdtableglobal}">${music.author}</td>
          <td>
              <img src="../static/plus-icon.svg" alt="Add to playlist" class="add-to-playlist-icon" musicId="${counterIdtableglobal++}" id="addBtn">
          </td>
        </tr>
        `;
      });
      document.getElementById("global-tbody").innerHTML = html;
    });
}

function loadPlaylistUser() {
  let html = "";
  fetch(SERVER + "/users/" + userId + "/playlist?page=2&limit=5", {
    method: "GET",
    headers,
  })
    .then((response) => response.json())
    .then((musics) => {
      //console.log(musics);
      populatetableplaylist(musics);
    });
}
function populatetableplaylist(musics) {
  let html = '';
  counterIdtableplaylist = 1;
  musics.forEach((music) => {
    html += `
    <tr>
      <th scope="row">${counterIdtableplaylist}</th>
      <td id="title${counterIdtableplaylist}">${music.title}</td>
      <td>
          <img src="../static/remove-icon.svg" alt="Remove from playlist" class="remove-to-playlist-icon" musicId="${counterIdtableplaylist++}" id="removeBtn">
      </td>
    </tr>
    `;
  });
  document.getElementById("playlist-tbody").innerHTML = html;
}
