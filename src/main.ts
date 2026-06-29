import { startREPL } from "./repl.js"

import { initState } from "./state.js"

function main() {

    const stateObject = initState();
    startREPL(stateObject);
}

main();