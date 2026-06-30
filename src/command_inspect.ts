import { type State } from "./state.js"

export async function commandInspect(state: State, ...args: string[]) {
    const pokemon = args[0];
    
    console.log(state.pokedex[pokemon]);
}