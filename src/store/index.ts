import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import pokemonReducer from "./pokeSlice";
const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    modal: modalReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
