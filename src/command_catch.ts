import { type State } from "./state.js"

export async function commandCatch(state: State, ...args: string[]) {
    let pokemonName = args[0];

    if (!pokemonName) {
        console.log("Please provide a pokemon name")
        return;
      }
    
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    try {
        const pokemon = await state.PokeApiInstance.fetchPokemon(pokemonName)

        const chance = Math.floor(Math.random() * pokemon.base_experience);
        if (chance < 40) {
            console.log(`${pokemonName} was caught!`)
            state.pokedex[pokemonName] = pokemon;
        }
        else {
            console.log(`${pokemonName} escaped!`)
        }
    }catch(error) {
        console.log(error);
    }
}