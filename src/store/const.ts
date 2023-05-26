// покемоны

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonData {
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

export interface PokedexState {
  pokemonsArray: PokemonData[];
  selectedPokemon: PokemonData | null;
  filteredPokemons: PokemonData[];
  typesArray: string[];
  filterByName: boolean;
  error: string | null;
  loading: boolean;
  clearFilter: boolean;
  limit: number;
}
// Модалка
export type Modal = {
  open: boolean;
};
