import { createInterface, type Interface } from "readline";

import { type Pokemon } from "./pokeapi.js"
import { PokeAPI } from "./pokeapi.js"

import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";




export type State = {
    readlineInterface: Interface,
    commands: Record<string, CLICommand>,
    pokedex: Record<string, Pokemon>;
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
        },
        mapb: {
            name: "mapb",
            description: "Displays previous pokemon locations",
            callback: commandMapb,
        },
        explore: {
            name: "explore",
            description: "Displays pokemons from a location",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Catches a pokemon",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect",
            description: "Inspects a pokemon from the pokedex",
            callback: commandInspect,
        },
        pokedex: {
            name: "pokedex",
            description: "Inspects all pokemons caught from the pokedex",
            callback: commandPokedex,
        }
    }
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
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
        pokedex: {},
        PokeApiInstance: new PokeAPI(),
        nextLocationsURL: undefined,
        prevLocationsURL: undefined
    }
}