import { fillSongData } from "./index.js";
import { playList } from "./play-list.js";


export const playAudio = (trackNumber, audio) => {
  audio.src = playList[trackNumber].songPath;
  audio.currentTime = 0;
  audio.play();
}

export const pauseAudio = () => {
  audio.pause();
};

