import { cleanInput } from "./repl.js"

function main() {
    let inputArray = cleanInput("Hello World");

    for (let i = 0; i < inputArray.length; i++) {
        console.log(inputArray[i]);
    }
}

main();