import { Cache } from "./pokecache.js"

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor() {
    this.#cache = new Cache(5000);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {

    try {
      const url = pageURL ?? PokeAPI.baseURL + "/location-area"; 
      
      const cachedLocation = this.#cache.get<ShallowLocations>(url);
      if (cachedLocation !== undefined) {
        return cachedLocation;
      }

      const response = await fetch(url);

      const locations = (await response.json()) as ShallowLocations;
      this.#cache.add(url, locations);
      return locations;
    } catch(error) {
      console.log(error);
      throw error;
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    try {
      const url = PokeAPI.baseURL + "/location-area/" + locationName; 
      
      const cachedLocation = this.#cache.get<Location>(url);
      if (cachedLocation !== undefined) {
        return cachedLocation;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const location = (await response.json()) as Location;
      this.#cache.add(url, location);
      return location;

    } catch(error) {
      throw error
    }
    }

  async fetchPokemon(PokemonName: string): Promise<Pokemon> {
    try {
      const url = PokeAPI.baseURL + "/pokemon/" + PokemonName; 
      
      const cachedPokemon = this.#cache.get<Pokemon>(url);
      if (cachedPokemon !== undefined) {
        return cachedPokemon;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const pokemon = (await response.json()) as Pokemon;
      this.#cache.add(url, pokemon);
      return pokemon;

    } catch(error) {
      throw error
    }
    }
}

export type ShallowLocations = {
  next: string | null;
  previous: string | null;
  results: {
    name: string
    url: string;
  }[];
};

export type Location = {
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[]
}

export type Pokemon = {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    }
  }[]
  types: {
    type: {
      name:string;
    }
  }[]
}