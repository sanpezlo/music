import { Playlist, Song } from "@/lib/data";
import { createSlice } from "@reduxjs/toolkit";

interface PlayerState {
  isPlaying: boolean;
  music: {
    playlist: Playlist | null;
    song: Song | null;
    songs: Song[];
  };
  volume: number;
}

const initalPlayerState: PlayerState = {
  isPlaying: false,
  music: { playlist: null, song: null, songs: [] },
  volume: 1,
};

const playerSlice = createSlice({
  name: "player",
  initialState: initalPlayerState,
  reducers: {
    toogleIsPlaying(state) {
      if (!state.music.song) return;
      state.isPlaying = !state.isPlaying;
    },
    setIsPlaying(state, action) {
      if (!state.music.song) return;
      state.isPlaying = action.payload;
    },
    setMusic(state, action) {
      state.music = action.payload;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
  },
});

export const { toogleIsPlaying, setIsPlaying, setMusic, setVolume } =
  playerSlice.actions;

export default playerSlice.reducer;
