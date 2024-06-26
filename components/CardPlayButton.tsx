"use client";

import PauseIcon from "@/icons/PauseIcon";
import PlayIcon from "@/icons/PlayIcon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsPlaying, setMusic } from "@/store/slices/player";

export function CardPlayButton({
  id,
  size = "small",
}: {
  id: string;
  size?: "small" | "large";
}) {
  const { music, isPlaying } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();

  const isPlayingPlaylist = isPlaying && music?.playlist?.id === id;

  const handleClick = () => {
    if (isPlayingPlaylist) {
      dispatch(setIsPlaying(false));
      return;
    }

    fetch(`/api/?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data;

        dispatch(setMusic({ songs, playlist, song: songs[0] }));
        dispatch(setIsPlaying(true));
      });
  };

  const iconClassName = size === "small" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 p-4 transition hover:scale-105 hover:bg-green-400"
    >
      {isPlayingPlaylist ? (
        <PauseIcon className={iconClassName} />
      ) : (
        <PlayIcon className={iconClassName} />
      )}
    </button>
  );
}
