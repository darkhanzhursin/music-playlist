const SERVER_URL = "http://localhost:3000";
const PLAY_ICON = "../static/play_arrow_icon.svg";
const PAUSE_ICON = "../static/pause_icon.svg";

let musics = [];
let musicsShuffled = [];

let progressBarChanged = false;
let songMode = 0; // 0 = repeat, 1 = shuffle, 2 = repeat 1 song

let progressbar = document.getElementById("progressbar");
let skipPreviousBtn = document.getElementById("skip-previous");
let skipNextBtn = document.getElementById("skip-next");
let playStopBtn = document.getElementById("play-stop");
let playIcon = document.getElementById("play-stop-icon");
let musicNames = document.getElementsByClassName("playlist-music-name");
let audio = document.getElementById("audio");
let musicName = document.getElementById("music-name");
let buttons = document.getElementsByClassName("playbtn");
let txtCurrentTime = document.getElementById("current-time");
let txtDuration = document.getElementById("duration");
let songModeBtn = document.getElementById("song-mode-btn");
let songModeIcon = document.getElementById("song-mode-icon");
let removebuttons = document.getElementsByClassName("removebtn");
let musicPageButtons = document.getElementsByClassName("page-number-btn");
let musicnextPageButtons = document.getElementById("music-next-page-button");
let musicpreviousPageButtons = document.getElementById("music-previous-page-button");

function refresh() {
    removebuttons = document.getElementsByClassName("removebtn");
    buttons = document.getElementsByClassName("playbtn");
    musicPageButtons = document.getElementsByClassName("page-number-btn");
    musicnextPageButtons = document.getElementById("music-next-page-button");
    musicpreviousPageButtons = document.getElementById("music-previous-page-button");

    if (musicnextPageButtons) {
        musicnextPageButtons.addEventListener("click", nextpage);
    }
    if (musicpreviousPageButtons) {
        musicpreviousPageButtons.addEventListener("click", previouspage);
    }
    for (const element of buttons) {
        element.addEventListener("click", playMusic);
    }

    for (const element of removebuttons) {
        element.addEventListener("click", removeFromPlaylist);
    }

    for (const element of musicPageButtons) {
        element.addEventListener("click", onChangeMusicPage);
    }

    getAllMusics();
}

window.onload = function () {
    getAllMusics();
  audio.addEventListener("timeupdate", timeUpdate);
  audio.addEventListener("playing", playing);
  audio.addEventListener("pause", pause);
  audio.addEventListener("ended", ended);

  skipPreviousBtn.addEventListener("click", skipPrevious);
  skipNextBtn.addEventListener("click", skipNext);
  playStopBtn.addEventListener("click", playStop);
  progressbar.addEventListener("change", progressBarChange);

    songModeBtn.addEventListener("click", changeSongMode);

    loadGlobalMusics();
    loadPlaylistUser();
    document
        .getElementById("global-tbody")
        .addEventListener("click", handleButtonClick);
    document.getElementById("logoutBtn").onclick = logout;

    for (const element of buttons) {
        element.addEventListener("click", playMusic);
    }

    for (const element of removebuttons) {
        element.addEventListener("click", removeFromPlaylist);
    }
    songModeBtn.addEventListener("click", changeSongMode);

    for (const element of musicPageButtons) {
        element.addEventListener("click", onChangeMusicPage);
    }

}
function previouspage(e) {
    let currentpage = parseInt(document.getElementsByClassName("page-item active")[0].firstChild.innerHTML) - 1;
    if (currentpage >= 1)
        loadGlobalMusics(currentpage);
}

function nextpage(e) {
    let currentpage = parseInt(document.getElementsByClassName("page-item active")[0].firstChild.innerHTML) + 1;

    if (e.target.parentElement.className.indexOf('enable') > -1)
        loadGlobalMusics(currentpage);
}
function onChangeMusicPage(e) {
    loadGlobalMusics(parseInt(e.target.innerHTML));
}

function changeSongMode(e) {
  songMode = (songMode + 1) % 3;
  switch (songMode) {
    case 0:
      songModeIcon.src = "../static/repeat_icon.svg";
      break;
    case 1:
      musicsShuffled = fisherYatesShuffle(musics);
      songModeIcon.src = "../static/shuffle_icon.svg";
      break;
    case 2:
      songModeIcon.src = "../static/repeat_one_icon.svg";
      break;
  }
}

function fisherYatesShuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function ended(e) {
  const title = e.target.title;
  nextMusic(title, true);
}

function nextMusic(title, next = true) {
  switch (songMode) {
    case 0: // repeat
      modeRepeat(title, next);
      break;
    case 1: // shuffle
      modeShuffle(title, next);
      break;
    case 2: // repeat 1 song
      modeRepeatOneSong(title);
      break;
  }
}

function modeRepeatOneSong(title) {
  play(title);
}

function modeShuffle(title, next = true) {
  const index = musicsShuffled.indexOf(title);
  if (index > -1) {
    const previousIndex =
      index - 1 === -1 ? musics.length - 1 : (index - 1) % musics.length;
    const nextIndex = next ? (index + 1) % musics.length : previousIndex;
    play(musicsShuffled[nextIndex]);
  }
}

function modeRepeat(title, next = true) {
  const index = musics.indexOf(title);
  if (index > -1) {
    const previousIndex =
      index - 1 === -1 ? musics.length - 1 : (index - 1) % musics.length;
    const nextIndex = next ? (index + 1) % musics.length : previousIndex;
    play(musics[nextIndex]);
  }
}

function timeUpdate(e) {
  if (
    !progressBarChanged &&
    e.srcElement.duration &&
    e.srcElement.currentTime
  ) {
    progressbar.value =
      (e.srcElement.currentTime / e.srcElement.duration) * 100;
    const currentMinutes = parseInt(e.srcElement.currentTime) % 60;
    txtCurrentTime.innerHTML =
      parseInt(e.srcElement.currentTime / 60) +
      ":" +
      currentMinutes.toString().padStart(2, "0");
    const durationMinutes = parseInt(e.srcElement.duration) % 60;
    txtDuration.innerHTML =
      parseInt(e.srcElement.duration / 60) +
      ":" +
      durationMinutes.toString().padStart(2, "0");
  }
}

function progressBarChange(e) {
  progressBarChanged = true;
  audio.pause();
  audio.currentTime = (e.target.value / 100) * audio.duration;
  audio.play();
  progressBarChanged = false;
}

function getAllMusics() {
    musicNames = document.getElementsByClassName("playlist-music-name");
    musics = [];

    for (const element of musicNames) {
        const musicName = element.innerHTML;
        if (musicName) {
            musics.push(musicName);
        }
    }
  
}

function playStop(e) {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function skipNext(e) {
  const title = audio.title;
  nextMusic(title, true);
}

function skipPrevious(e) {
  const title = audio.title;
  nextMusic(title, false);
}

function pause(e) {
  playIcon.src = PLAY_ICON;
}

function playing(e) {
  playIcon.src = PAUSE_ICON;
}

function playMusic(e) {
  const music = e.target.attributes["music"].value;
  play(music);
}

function play(name, loop = false) {
    musicName.innerHTML = name;
    audio.src = `${SERVER_URL}/static/music/${name}`;
    audio.title = name;
    audio.currentTime = 0;
    if (loop) {
        audio.loop = true;
    } else {
        audio.loop = false;
    }
    audio.play();
}
