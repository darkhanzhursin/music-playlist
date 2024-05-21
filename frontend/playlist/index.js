const SERVER_URL = "http://localhost:3000";
const PLAY_ICON = "../static/play_arrow_icon.svg";
const PAUSE_ICON = "../static/pause_icon.svg";

const musics = [];
let musicsShuffled = [];

var progressBarChanged = false;
var songMode = 0; // 0 = repeat, 1 = shuffle, 2 = repeat 1 song

var progressbar = document.getElementById("progressbar");
var skipPreviousBtn = document.getElementById("skip-previous");
var skipNextBtn = document.getElementById("skip-next");
var playStopBtn = document.getElementById("play-stop");
var playIcon = document.getElementById("play-stop-icon");
var musicNames = document.getElementsByClassName("playlist-music-name");
var audio = document.getElementById("audio");
var musicName = document.getElementById("music-name");
var buttons = document.getElementsByClassName("playbtn");
var txtCurrentTime = document.getElementById("current-time");
var txtDuration = document.getElementById("duration");
var songModeBtn = document.getElementById("song-mode-btn");
var songModeIcon = document.getElementById("song-mode-icon");

window.onload = function () {
    getAllMusics();

    for (const element of buttons) {
        element.addEventListener("click", playMusic);
    }

    audio.addEventListener("timeupdate", timeUpdate);
    audio.addEventListener("playing", playing);
    audio.addEventListener("pause", pause);
    audio.addEventListener("ended", ended);

    skipPreviousBtn.addEventListener("click", skipPrevious);
    skipNextBtn.addEventListener("click", skipNext);
    playStopBtn.addEventListener("click", playStop);
    progressbar.addEventListener("change", progressBarChange);

    songModeBtn.addEventListener("click", changeSongMode);
};

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
        const previousIndex = (index - 1) === -1 ? musics.length - 1 : (index - 1) % musics.length;
        const nextIndex = next ? (index + 1) % musics.length : previousIndex;
        play(musicsShuffled[nextIndex]);
    }
}

function modeRepeat(title, next = true) {
    const index = musics.indexOf(title);
    if (index > -1) {
        const previousIndex = (index - 1) === -1 ? musics.length - 1 : (index - 1) % musics.length;
        const nextIndex = next ? (index + 1) % musics.length : previousIndex;
        play(musics[nextIndex]);
    }
}

function timeUpdate(e) {
    if (!progressBarChanged && e.srcElement.duration && e.srcElement.currentTime) {
        progressbar.value = (e.srcElement.currentTime / e.srcElement.duration) * 100;
        const currentMinutes = parseInt(e.srcElement.currentTime) % 60;
        txtCurrentTime.innerHTML = parseInt(e.srcElement.currentTime / 60) + ":" + currentMinutes.toString().padStart(2, "0"); ;
        const durationMinutes = parseInt(e.srcElement.duration) % 60;
        txtDuration.innerHTML = parseInt(e.srcElement.duration / 60) + ":" + durationMinutes.toString().padStart(2, "0"); 
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
    for (const element of musicNames) {
        const musicName = element.innerHTML;
        if (musicName.endsWith(".mp3") && musicName) { 
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
    audio.src = `${SERVER_URL}/music/${name}`;
    audio.title = name;
    audio.currentTime = 0;
    if (loop) {
        audio.loop = true;
    } else {
        audio.loop = false;
    }
    audio.play();
}