"use client";

import PauseIcon from "@/icons/PauseIcon";
import PlayIcon from "@/icons/PlayIcon";
import { useEffect, useRef, useState } from "react";
import Slider from "@/components/Slider";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  endSong,
  nextSong,
  previousSong,
  setVolume,
  toggleIsPlaying,
  toggleIsRepeating,
  toggleIsShuffling,
} from "@/store/slices/player";
import VolumeSilenceIcon from "@/icons/VolumeSilenceIcon";
import VolumeIcon from "@/icons/VolumeIcon";
import { Song } from "@/lib/data";
import PreviousIcon from "@/icons/PreviousIcon";
import NextIcon from "@/icons/NextIcon";
import RepeatIcon from "@/icons/RepeatIcon";
import ShuffleIcon from "@/icons/ShuffleIcon";

export default function Player() {
  const { isPlaying, music, volume, isShuffling, isRepeating } = useAppSelector(
    (state) => state.player,
  );
  const dispatch = useAppDispatch();

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    audioRef.current!.volume = volume;
  }, [volume]);

  useEffect(() => {
    const { song, playlist, songs } = music;
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current!.src = src;
      audioRef.current!.volume = volume;
      audioRef.current!.play();
    }
  }, [music]);

  useEffect(() => {
    isPlaying ? audioRef.current!.play() : audioRef.current!.pause();
  }, [isPlaying]);

  const handleShuffle = () => {
    dispatch(toggleIsShuffling());
  };

  const handlePrevious = () => {
    dispatch(previousSong());
  };

  const handlePlay = () => {
    dispatch(toggleIsPlaying());
  };

  const handleNext = () => {
    dispatch(nextSong());
  };

  const handleRepeat = () => {
    dispatch(toggleIsRepeating());
  };

  return (
    <div className="z-50 flex h-full w-full flex-row items-center justify-between px-2">
      <div className="flex max-w-[200px] flex-1 items-center justify-center">
        {music.song && <CurrentSong song={music.song} />}
      </div>

      <div className="flex flex-1 items-center justify-center gap-4">
        <div className="flex max-w-[700px] flex-1 flex-col items-center justify-center">
          <div className="flex gap-4">
            <button
              className={`opacity-70 transition hover:opacity-100 ${isShuffling ? "text-green-500 opacity-100 hover:text-green-400" : ""}`}
              onClick={handleShuffle}
            >
              <ShuffleIcon />
            </button>
            <button
              className="opacity-70 transition hover:opacity-100"
              onClick={handlePrevious}
            >
              <PreviousIcon />
            </button>
            <button
              className="rounded-full bg-white p-2 text-black opacity-70 transition hover:opacity-100"
              onClick={handlePlay}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              className="opacity-70 transition hover:opacity-100"
              onClick={handleNext}
            >
              <NextIcon />
            </button>
            <button
              className={`opacity-70 transition hover:opacity-100 ${isRepeating ? "text-green-500 opacity-100 hover:text-green-400" : ""}`}
              onClick={handleRepeat}
            >
              <RepeatIcon />
            </button>
          </div>

          <SongControl audio={audioRef} />
          <audio ref={audioRef} />
        </div>
      </div>

      <div className="flex max-w-[200px] flex-1 items-center justify-center">
        <VolumeControl />
      </div>
    </div>
  );
}

function CurrentSong({ song }: { song: Song }) {
  return (
    <div className={`relative flex items-center gap-5 overflow-hidden`}>
      <picture className="h-16 w-16 overflow-hidden rounded-md bg-zinc-800 shadow-lg">
        <img src={song.image} alt={song.title} />
      </picture>

      <div className="flex flex-col">
        <h3 className="block text-sm font-semibold">{song.title}</h3>
        <span className="text-xs opacity-80">{song.artists?.join(", ")}</span>
      </div>
    </div>
  );
}

function SongControl({ audio }: { audio: React.RefObject<HTMLAudioElement> }) {
  const [currentTime, setCurrentTime] = useState(0);
  const player = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const audioElement = audio.current;

    audioElement!.addEventListener("timeupdate", handleTimeUpdate);
    audioElement!.addEventListener("ended", handleEnded);

    return () => {
      audioElement!.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement!.removeEventListener("ended", handleEnded);
    };
  }, [player]);

  const handleTimeUpdate = () => {
    if (audio.current?.currentTime) setCurrentTime(audio.current!.currentTime);
  };

  const handleEnded = () => {
    dispatch(endSong());
  };

  const duration = audio.current?.duration ?? 0;

  const formatTime = (time: number) => {
    if (time == null) return `0:00`;

    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex w-full gap-x-3 pt-2 text-xs">
      <span className="w-12 text-right opacity-50">
        {formatTime(currentTime)}
      </span>

      <Slider
        value={[currentTime]}
        max={audio.current?.duration ?? 0}
        min={0}
        className="w-full"
        onValueChange={(value) => {
          if (!audio.current) return;
          const [newCurrentTime] = value;
          if (Number.isNaN(newCurrentTime)) return;

          audio.current!.currentTime = newCurrentTime;
        }}
      />
      <span className="w-12 opacity-50">
        {duration ? formatTime(duration) : "0:00"}
      </span>
    </div>
  );
}

function VolumeControl() {
  const { volume } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();

  const previousVolumeRef = useRef(volume);

  const isVolumeSilenced = volume < 0.01;

  const handleClickVolumen = () => {
    if (isVolumeSilenced) {
      dispatch(setVolume(previousVolumeRef.current));
    } else {
      previousVolumeRef.current = volume;
      dispatch(setVolume(0));
    }
  };

  return (
    <div className="flex w-full max-w-32 justify-center gap-x-2 text-white">
      <button
        className="opacity-70 transition hover:opacity-100"
        onClick={handleClickVolumen}
      >
        {isVolumeSilenced ? <VolumeSilenceIcon /> : <VolumeIcon />}
      </button>

      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        value={[volume * 100]}
        className="w-full"
        onValueChange={(value) => {
          const [newVolume] = value;
          dispatch(setVolume(newVolume / 100));
        }}
      />
    </div>
  );
}
