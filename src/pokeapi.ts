import { Cache } from "./pokecache.js"

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor() {
    this.#cache = new Cache(5000);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {

    const url = pageURL ?? PokeAPI.baseURL + "/location-area"; 
    
    const cachedLocations = this.#cache.get<ShallowLocations>(url);
    if (cachedLocations !== undefined) {
      return cachedLocations;
    }

    const response = await fetch(url);

    const locations = (await response.json()) as ShallowLocations;
    this.#cache.add(url, locations);
    return locations;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    // implement this
    return {}
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
  // add properties here
};