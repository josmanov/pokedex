import { createInterface } from "readline";

import { CLICommand } from "./command.js"

import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";


const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > "
});

export function cleanInput(input: string): string[] {

    const words = input.trim().toLowerCase().split(" ");
    return words;
};

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exists the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Describes how to use the REPL",
            callback: commandHelp,
        }
    }
}

export function startREPL() {

    // Get the commands
    const commands = getCommands();  

    // Prefix prompt
    rl.prompt()

    // Loop reading input and detecting commands
    rl.on("line", (input) => {
        try {
            let result = cleanInput(input);
            
            if (result[0] === "") {
                rl.prompt();
                return;
            }
            const cmd = commands[result[0]];
            
            if (cmd === undefined) {
                console.log(`Unknown command`);
                rl.prompt();
                return
            }
            cmd.callback(commands);
            rl.prompt();

        } catch (error) {
            console.error(error);
            rl.prompt();
        }
    });
};