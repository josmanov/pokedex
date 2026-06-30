import { type State } from "./state.js"

export async function commandExplore(state: State, ...args: string[]) {
    let locationName = args[0];
    if (!locationName) {
        console.log("Please provide a location name")
        return;
      }
    console.log(`Exploring ${locationName}...`)
    const location = await state.PokeApiInstance.fetchLocation(locationName)
    console.log(`Found Pokemon:`)
    for (const encounter of location.pokemon_encounters) {
        console.log(` - ${encounter.pokemon.name}`)
    }
}