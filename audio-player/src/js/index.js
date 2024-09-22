import { playList } from "./play-list.js";
// import { playAudio } from "./play-pause.js";

let isPlay = false;
let trackNumber = 0;
const playPauseBtn = document.querySelector(".pause-play");
const playerSinger = document.querySelector(".player__singer");
const playerSongTitle = document.querySelector(".player__song-title");
const cover = document.querySelector(".player__cover");
const totalTime = document.querySelector(".player__total-time");
const nextAudioBtn = document.querySelector(".forward");
const prevAudioBtn = document.querySelector(".backward");

const playListLength = playList.length;
const audio = new Audio('../src/assets/songs/CherStrongEnough.mp3');

export const playAudio = () => {
  if (!isPlay) {
    isPlay = true;
    playPauseBtn.classList.add("pause");
    playPauseBtn.classList.remove("play");
    audio.play();
  } else {
    playPauseBtn.classList.remove("pause");
    playPauseBtn.classList.add("play");
    isPlay = false;
    audio.pause();
  }
}

export const switchTrack = () => {

}

export const fillSongData = () => {
  playerSinger.innerHTML = playList[trackNumber].singer;
  playerSongTitle.innerHTML = playList[trackNumber].songTitle;
  cover.style.background = `url(${playList[trackNumber].coverPath})`;
  cover.style.backgroundSize = 'cover';
};

export const switchNextAudio = () => {
  trackNumber < playListLength - 1 ? trackNumber += 1 : trackNumber = 0;
  if (audio.src) {
    audio.pause();
}
  audio.src = playList[trackNumber].songPath;
  audio.currentTime = 0;
  fillSongData();
  isPlay ? audio.play() : audio.pause();
};

const switchPrevAudio = () => {
  trackNumber = 0 ? trackNumber = playListLength - 1 : trackNumber -= 1;
  isPlay = !isPlay;
  playAudio();
  fillSongData();
};

playPauseBtn.addEventListener("click", playAudio);

nextAudioBtn.addEventListener("click", switchNextAudio);