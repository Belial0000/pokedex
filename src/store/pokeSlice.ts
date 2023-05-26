import axios, { AxiosResponse } from "axios";
import { WritableDraft } from "immer/dist/internal";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon, PokedexState, PokemonData } from "./const";

const initialState: PokedexState = {
  pokemonsArray: [],
  selectedPokemon: null,
  loading: false,
  error: null,
  limit: 10,
  typesArray: [],
  filterByName: false,
  filteredPokemons: [],
  clearFilter: false,
};

// фетчим список покемонов
export const fetchPokemons = createAsyncThunk<
  { pokemons: PokemonData[] },
  undefined,
  { rejectValue: string; state: { pokemon: PokedexState } }
>("pokemon/fetchPokemons", async (_, { rejectWithValue, getState }) => {
  // получаем лимит из стейта и подставляем в запрос

  const limit = getState().pokemon.limit;

  try {
    const response: AxiosResponse<{
      results: Pokemon[];
    }> = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`
    );
    const { data } = response;

    // проходим циклом по url, делаем запрос и получем массив покемонов
    const pokemonPromises = data.results.map((item: Pokemon) =>
      axios.get<PokemonData>(item.url)
    );
    const pokemonResponses = await Promise.all(pokemonPromises);
    // делаем декомпозицию нужнных данных
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
    };
  } catch (error) {
    return rejectWithValue("Server Error!");
  }
});
// создаем срез
const pokedexSlice = createSlice({
  name: "pokedex",
  initialState,
  reducers: {
    // получем данные отдельного покемона по айди
    selectPokemon(state, action: PayloadAction<number>) {
      const id = action.payload;
      const pokemon = state.pokemonsArray.find((poke) => poke.id === id);
      state.selectedPokemon = pokemon || null;
    },
    // меняем лимит
    changePokemonLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    // фильтруем покемонов по типам
    filterPokemonType(state, action) {
      state.typesArray = action.payload;
      // оставляем тех у кого есть хоть один нужный тип
      const filteredPokemonsByType = state.pokemonsArray.filter((pokemon) => {
        return state.typesArray.every((type) =>
          pokemon.types.some((pokemonType) => pokemonType.type.name === type)
        );
      });
      state.filteredPokemons = filteredPokemonsByType;
    },
    // сортируем по алфавиту
    filterPokemonName(state, action: PayloadAction<boolean>) {
      state.filterByName = action.payload;
      // меняем массив для фильтрации на основе того рендрится ли массив фильтрованных покемонов или массив по дефолту
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
    // очитска фильтров
    clearFilter(state, action: PayloadAction<boolean>) {
      state.clearFilter = action.payload;
      state.typesArray = [];
    },
  },
  extraReducers(builder) {
    builder
      // получем данные
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonsArray = action.payload.pokemons;
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
