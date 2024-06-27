"use client";

import PauseIcon from "@/icons/PauseIcon";
import PlayIcon from "@/icons/PlayIcon";
import { Playlist, Song } from "@/lib/data";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsPlaying, setMusic } from "@/store/slices/player";

export default function PlayButton({
  playlist,
  songs,
  index,
  className = "",
}: {
  playlist: Playlist;
  songs: Song[];
  index: number;
  className?: string;
}) {
  const { music, isPlaying } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();

  const isPlayingSong = isPlaying && music?.song?.id === index + 1;

  const handleClick = () => {
    if (isPlayingSong) {
      dispatch(setIsPlaying(false));
    } else {
      dispatch(setMusic({ songs, playlist, song: songs[index] }));
      dispatch(setIsPlaying(true));
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {isPlayingSong ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}
