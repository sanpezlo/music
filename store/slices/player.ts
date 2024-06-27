import { Playlist, Song } from "@/lib/data";
import { createSlice } from "@reduxjs/toolkit";

interface PlayerState {
  isPlaying: boolean;
  isRepeating: boolean;
  music: {
    playlist: Playlist | null;
    song: Song | null;
    songs: Song[];
  };
  volume: number;
}

const initalPlayerState: PlayerState = {
  isPlaying: false,
  isRepeating: false,
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
    tooogleIsRepeating(state) {
      state.isRepeating = !state.isRepeating;
    },
    setIsPlaying(state, action) {
      if (!state.music.song) return;
      state.isPlaying = action.payload;
    },
    setIsRepeating(state, action) {
      state.isRepeating = action.payload;
    },
    setMusic(state, action) {
      state.music = action.payload;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
    nextSong(state) {
      if (!state.music.playlist) return;
      const currentIndex = state.music.songs.findIndex(
        (song) => song.id === state.music.song?.id,
      );
      const nextIndex = (currentIndex + 1) % state.music.songs.length;
      state.music.song = state.music.songs[nextIndex];
    },
    previousSong(state) {
      if (!state.music.playlist) return;
      const currentIndex = state.music.songs.findIndex(
        (song) => song.id === state.music.song?.id,
      );
      const previousIndex =
        (currentIndex - 1 + state.music.songs.length) %
        state.music.songs.length;
      state.music.song = state.music.songs[previousIndex];
    },
    endSong(state) {
      if (!state.music.playlist) return;

      const currentIndex = state.music.songs.findIndex(
        (song) => song.id === state.music.song?.id,
      );

      if (!state.isRepeating && currentIndex === state.music.songs.length - 1) {
        state.isPlaying = false;
        return;
      }

      const nextIndex = (currentIndex + 1) % state.music.songs.length;
      state.music.song = state.music.songs[nextIndex];
    },
  },
});

export const {
  toogleIsPlaying,
  tooogleIsRepeating,
  setIsPlaying,
  setIsRepeating,
  setMusic,
  setVolume,
  nextSong,
  endSong,
} = playerSlice.actions;

export default playerSlice.reducer;
