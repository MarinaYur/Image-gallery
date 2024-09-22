import { playList } from "./play-list.js";

let isPlay = false;
let trackNumber = 0;
const playPauseBtn = document.querySelector(".pause-play");
const playerSinger = document.querySelector(".player__singer");
const playerSongTitle = document.querySelector(".player__song-title");
const cover = document.querySelector(".player__cover");
const totalTime = document.querySelector(".player__total-time");
const playerCurrentTime = document.querySelector(".player__current-time");
const progressBar = document.querySelector(".progress-bar");

const nextAudioBtn = document.querySelector(".forward");
const prevAudioBtn = document.querySelector(".backward");

const playListLength = playList.length;
const audio = new Audio("./src/assets/songs/CherStrongEnough.mp3");

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
  setInterval(setCurrentTime, 1000);
};

export const setCurrentTime = () => {
  const currentTime = audio.currentTime;
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  playerCurrentTime.innerHTML = formattedTime;
  const duration = audio.duration;
  progressBar.value = (currentTime / duration) * 100 || 0;
  if (currentTime === duration) {
    switchNextAudio();
  }
};

export const switchTrack = () => {
  if (audio.src) {
    audio.pause();
  }
  audio.src = playList[trackNumber].songPath;
  audio.currentTime = 0;

  fillSongData();
  isPlay ? audio.play() : audio.pause();
  progressBar.value = '0';
};

export const fillSongData = () => {
  playerSinger.innerHTML = playList[trackNumber].singer;
  playerSongTitle.innerHTML = playList[trackNumber].songTitle;
  totalTime.innerHTML = playList[trackNumber].totalTime;
  cover.style.background = `url(${playList[trackNumber].coverPath})`;
  cover.style.backgroundSize = "cover";
};

export const switchNextAudio = () => {
  trackNumber < playListLength - 1 ? (trackNumber += 1) : (trackNumber = 0);
  switchTrack();
};

const switchPrevAudio = () => {
  trackNumber === 0 ? (trackNumber = playListLength - 1) : (trackNumber -= 1);
  switchTrack();
};

playPauseBtn.addEventListener("click", playAudio);
nextAudioBtn.addEventListener("click", switchNextAudio);
prevAudioBtn.addEventListener("click", switchPrevAudio);
progressBar.addEventListener("input", () => {
    const duration = audio.duration;
    audio.currentTime = (progressBar.value / 100) * duration;
});
