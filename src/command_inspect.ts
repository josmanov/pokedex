import { type State } from "./state.js"

export async function commandInspect(state: State, ...args: string[]) {
    const pokemon = args[0];
    const pokemonObject = state.pokedex[pokemon];

    if (pokemonObject == undefined) {
        console.log("you have not caught that pokemon");
        return;
    }
    const pokemonInfo = `Name: ${pokemonObject.name}\nHeight: ${pokemonObject.height}\nWeight: ${pokemonObject.weight}`;
    
    let pokemonStats =  "Stats:\n"
    for (const entry of pokemonObject.stats) {
        pokemonStats += `  -${entry.stat.name}: ${entry.base_stat}\n`;
    }

    let pokemonTypes = "Types:\n"
    for (const entry of pokemonObject.types) {
        pokemonTypes += `  - ${entry.type.name}\n`;
    }

    console.log(`${pokemonInfo.trim()}\n${pokemonStats.trim()}\n${pokemonTypes.trim()}`);
}