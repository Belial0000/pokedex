import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { WritableDraft } from "immer/dist/internal";

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
  filterByName: boolean;
  filteredPokemons: PokemonData[];
  clearFilter: boolean;
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
  filterByName: false,
  filteredPokemons: [],
  clearFilter: false,
};

export const fetchPokemons = createAsyncThunk<
  { pokemons: PokemonData[]; next: string; previous: string },
  undefined,
  { rejectValue: string; state: { pokemon: PokedexState } }
>("pokemon/fetchPokemons", async (_, { rejectWithValue, getState }) => {
  const limit = getState().pokemon.limit;

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

    return {
      pokemons: pokemons,
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

      const filteredPokemonsByType = state.pokemonsArray.filter((pokemon) => {
        return state.typesArray.every((type) =>
          pokemon.types.some((pokemonType) => pokemonType.type.name === type)
        );
      });
      state.filteredPokemons = filteredPokemonsByType;
    },
    filterPokemonName(state, action: PayloadAction<boolean>) {
      state.filterByName = action.payload;
      const pokemonsArray =
        state.typesArray.length > 0
          ? state.filteredPokemons
          : state.pokemonsArray;
      let filterByName: WritableDraft<PokemonData>[] = [];
      filterByName = pokemonsArray.slice().sort((a, b) => {
        if (state.filterByName ? a.name < b.name : a.name > b.name) {
          return -1;
        }
        if (state.filterByName ? a.name > b.name : a.name < b.name) {
          return 1;
        }
        return 0;
      });

      state.filteredPokemons = filterByName;
      state.pokemonsArray = filterByName;
    },
    clearFilter(state, action: PayloadAction<boolean>) {
      state.clearFilter = action.payload;
      state.typesArray = [];
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

export const {
  selectPokemon,
  changePokemonLimit,
  filterPokemonType,
  filterPokemonName,
  clearFilter,
} = pokedexSlice.actions;

export default pokedexSlice.reducer;
