import { type State } from "./state.js"

export async function commandPokedex(state: State) {
    
    const pokedex = Object.keys(state.pokedex);

    if (pokedex == undefined) {
        console.log("Your pokedex is empty. Go catch one!")
        return;
    }

    let pokemons = "Your Pokedex:\n";
    for (let pokemon of pokedex) {
        pokemons += ` - ${pokemon}\n`;
    }
    console.log(pokemons.trim())
}