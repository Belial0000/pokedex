import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonData {
  // Добавьте нужные свойства покемона
  id: number;
  name: string;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];

  stats: {
    stat: {
      name: string;
      url: string;
    };
    base_stat: number;
  }[];
  types: {
    type: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
}

interface PokedexState {
  pokemonsArray: PokemonData[];
  selectedPokemon: PokemonData | null;
  previous: string | null;
  next: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: PokedexState = {
  pokemonsArray: [],
  selectedPokemon: null,
  previous: null,
  next: null,
  loading: false,
  error: null,
};

export const fetchPokemons = createAsyncThunk<
  PokemonData[],
  undefined,
  { rejectValue: string }
>("pokemon/fetchPokemons", async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<{ results: Pokemon[] }> = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=1&limit=10"
    );
    const { data } = response;

    const pokemonPromises = data.results.map((item: Pokemon) =>
      axios.get<PokemonData>(item.url)
    );
    const pokemonResponses = await Promise.all(pokemonPromises);
    const pokemons = pokemonResponses.map((response) => {
      const { name, abilities, stats, sprites, id, types } = response.data;
      return {
        id,
        name,
        abilities,
        stats,
        sprites,
        types,
      };
    });

    return pokemons;
  } catch (error) {
    return rejectWithValue("Server Error!");
  }
});

const pokedexSlice = createSlice({
  name: "pokedex",
  initialState,
  reducers: {
    selectPokemon(state, action: PayloadAction<number>) {
      const id = action.payload;
      const pokemon = state.pokemonsArray.find((poke) => poke.id === id);
      state.selectedPokemon = pokemon || null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonsArray = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "";
      });
  },
});
export const { selectPokemon } = pokedexSlice.actions;

export default pokedexSlice.reducer;
