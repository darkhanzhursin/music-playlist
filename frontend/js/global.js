const SERVER = "http://localhost:3000";
const userId = sessionStorage.getItem("userId");
const credentials = sessionStorage.getItem("credentials");
let counterIdtableglobal = 1;
let counterIdtableplaylist = 1;
let headers = new Headers();
headers.set("Content-type", "application/json");


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

  if (!checkIfMusicIsInPlaylist(title, author)) {
    fetch("http://localhost:3000/users/playlist", {
    method: "POST",
    body: JSON.stringify({
      title,
      author,
      userId,
    }),
    headers: headers,
    }).then(data => data.json()).then(data => populatetableplaylist(data)).catch(data => console.log());
    refresh();
  }

}

function checkIfMusicIsInPlaylist(title, author) {
  const trs = document.getElementById("playlist-tbody").children;

  for (const tr of trs) {
    if (tr.cells[1].innerHTML === title && tr.cells[2].innerHTML === author) {
      return true;
    }
  }
  return false;
}

async function removeFromPlaylist(e) {
  e.preventDefault();
  const musicId = e.target.attributes["musicId"].value;
  const title = document.getElementById(`title_${musicId}`).innerHTML;
  const author = document.getElementById(`author_${musicId}`).innerHTML;
  await fetch(`${SERVER}/users/${userId}/music`, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify({
      title,
      author
    })
  }).then(data => data.json()).then(data => {
    const dt = data.filter(x => x.title !== title && x.author !== author);
    populatetableplaylist(dt);
    getAllMusics();
  }).catch(data => console.log(data));
}
function loadGlobalMusics() {
  let html = "";
  const credential = sessionStorage.getItem("credentials");
  if (credential) {
    headers.set("Authorization", credential);
  }
  fetch(SERVER + "/users/" + userId + "/musics?page=2&limit=5", {
    method: "GET",
    headers,
  })
    .then((response) => response.json())
    .then((musics) => {
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
    })
    .catch((error) => window.location.replace("../index.html"));
}

function loadPlaylistUser() {
  let html = "";
  fetch(SERVER + "/users/" + userId + "/playlist?page=2&limit=5", {
    method: "GET",
    headers,
  })
    .then((response) => response.json())
    .then((musics) => {
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
        <td id="title_${counterIdtableplaylist}">${music.title}</td>
        <td id="author_${counterIdtableplaylist}" hidden>${music.author}</td>
        <td id="src_${counterIdtableplaylist}" class="playlist-music-name" hidden>${music.src}</td>
        <td>
          <button class="removebtn">
            <img src="../static/remove-icon.svg" musicId="${counterIdtableplaylist++}" alt="Remove from playlist" class="remove-from-playlist-icon">
          </button>
          <button class="playbtn">
            <img src="../static/play-icon.svg" music="${music.src}" alt="Play from playlist" class="play-from-playlist-icon">
          </button>
        </td>
      </tr>
    `;
  });
  document.getElementById("playlist-tbody").innerHTML = html;
  refresh();
}
