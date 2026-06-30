import { type State } from "./state.js"

export async function commandMapb(state: State) {
  
    if (state.prevLocationsURL === undefined) {
        console.log("you're on the first page");
        return;
    }
    else {
        const locations = await state.PokeApiInstance.fetchLocations(state.prevLocationsURL)
        
        state.nextLocationsURL = locations.next ?? undefined;
        state.prevLocationsURL = locations.previous ?? undefined;

        for (const location of locations.results) {
            console.log(location.name);
        };
    }
};