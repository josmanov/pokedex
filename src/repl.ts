import { createInterface } from "readline";

import { type State } from "./state.js"

export function cleanInput(input: string): string[] {

    const words = input.trim().toLowerCase().split(" ");
    return words;
};


export function startREPL(stateObject: State) {

    // Prefix prompt
    stateObject.readlineInterface.prompt()

    // Loop reading input and detecting commands
    stateObject.readlineInterface.on("line", async (input) => {
        try {
            let result = cleanInput(input);
            
            if (result[0] === "") {
                stateObject.readlineInterface.prompt();
                return;
            }
            const cmd = stateObject.commands[result[0]];
            
            if (cmd === undefined) {
                console.log(`Unknown command`);
                stateObject.readlineInterface.prompt();
                return
            }
            await cmd.callback(stateObject, ...result.slice(1));
            stateObject.readlineInterface.prompt();

        } catch (error) {
            console.error(error);
            stateObject.readlineInterface.prompt();
        }
    });
};