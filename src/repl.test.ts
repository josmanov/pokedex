import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";

describe.each([
    // TODO [X]: more test cases
    {
        input: "  hello world  ",
        expected: ["hello", "world"],
    },
    {
        input: "hello world",
        expected: ["hello", "world"],
    },
    {
        input: ". . . hello world",
        expected: [".", ".", ".", "hello", "world"],
    },

])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected ${expected}`, () => {
    // TODO [X]: call cleanInput with the input here [X]
    let actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length)
    for (const i in expected) {
        expect(actual[i]).toBe(expected[i]);
    }
    });
});