import { type State } from "./state.js"

export async function commandMap(state: State) {
    const response = await fetch(
        "https://pokeapi.co/api/v2/ability/?limit=20&offset=20"
    );
    
    const data = await response.json()
}