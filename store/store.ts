import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "@/store/slices/player";

export const makeStore = () => {
  return configureStore({
    reducer: {
      player: playerReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
