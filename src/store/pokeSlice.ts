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
  limit: number;
  typesArray: string[];
}

const initialState: PokedexState = {
  pokemonsArray: [],
  selectedPokemon: null,
  previous: null,
  next: null,
  loading: false,
  error: null,
  limit: 10,
  typesArray: [],
};

export const fetchPokemons = createAsyncThunk<
  { pokemons: PokemonData[]; next: string; previous: string },
  undefined,
  { rejectValue: string; state: { pokemon: PokedexState } }
>("pokemon/fetchPokemons", async (_, { rejectWithValue, getState }) => {
  const limit = getState().pokemon.limit;
  const typesArray = getState().pokemon.typesArray;

  console.log(getState());

  try {
    const response: AxiosResponse<{
      results: Pokemon[];
      next: string;
      previous: string;
    }> = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`
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

    // Фильтрация покемонов по типам
    const filteredPokemons = pokemons.filter((pokemon) => {
      return typesArray.every((type) =>
        pokemon.types.some((pokemonType) => pokemonType.type.name === type)
      );
    });

    return {
      pokemons: filteredPokemons,
      next: data.next,
      previous: data.previous,
    };
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
    changePokemonLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    filterPokemonType(state, action) {
      state.typesArray = action.payload;
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
        state.pokemonsArray = action.payload.pokemons;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "";
      });
  },
});

export const { selectPokemon, changePokemonLimit, filterPokemonType } =
  pokedexSlice.actions;

export default pokedexSlice.reducer;
