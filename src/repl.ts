import { createInterface } from "readline";
import { commandExit } from "./command_exit.js";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > "
});

export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: Record<string, CLICommand>) => void;
};

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
    }
}

export function startREPL() {
    const commands = getCommands();
    console.log(commands)
    
    rl.prompt()
    rl.on("line", (input) => {
        let result = cleanInput(input);

        // console.log(result)
        const cmd = commands[input];
        console.log(`cmd: ${cmd}`);
        

        // Does it make sense to use result[0] to check empty input?
        if (result[0] === "") {
            rl.prompt();
            return;
        }
        rl.prompt();
    });
};