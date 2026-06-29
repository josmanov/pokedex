import { type State } from "./state.js"

export async function commandMap(state: State) {
    
    const locations = await state.PokeApiInstance.fetchLocations(state.nextLocationsURL)
    state.nextLocationsURL = locations.next ?? undefined;
    state.prevLocationsURL = locations.previous ?? undefined;
    for (const location of locations.results) {
        console.log(location.name)
    }
}