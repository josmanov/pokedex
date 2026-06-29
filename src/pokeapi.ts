export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    
    const url = pageURL ?? PokeAPI.baseURL + "/location-area"; 

    const response = await fetch(url);

    const locations = await response.json()
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