import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";

type PokeState = {
  list: [];
  loading: boolean;
  error: string | null;
};
const initialState: PokeState = {
  list: [],
  loading: false,
  error: null,
};
const pokedexSlice = createSlice({
  name: "pokedex",
  initialState,
  reducers: {},
});

export default pokedexSlice.reducer;
