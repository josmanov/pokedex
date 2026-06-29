import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";

describe.each([
    {
        input: "  hello world  ",
        expected: ["hello", "world"],
    }
    //TODO: more test cases
])