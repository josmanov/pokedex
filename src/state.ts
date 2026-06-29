import { createInterface, type Interface } from "readline";

import { PokeAPI } from "./pokeapi.js"

import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";


export type State = {
    readlineInterface: Interface,
    commands: Record<string, CLICommand>,
    PokeApiInstance: PokeAPI,
    nextLocationsURL?: string,
    prevLocationsURL?: string
}

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Describes how to use the REPL",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Displays pokemon locations",
            callback: commandMap,
        }
    }
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};

export function initState(): State {
    const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > "
});


    const commands = getCommands();
    return {
        readlineInterface: rl,
        commands: commands,
        PokeApiInstance: new PokeAPI(),
        nextLocationsURL: undefined,
        prevLocationsURL: undefined
    }
}