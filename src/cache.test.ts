import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";

test("cache stores and expired entires", async () => {
    const testObject = new Cache(100);
    testObject.add("test-url", "test-data");
    let cached = testObject.get<string>("test-url");

    expect(cached).toBe("test-data");

    await new Promise((resolve) => setTimeout(resolve, 250));

    cached = testObject.get<string>("test-url");
    expect(cached).toBe(undefined);

    testObject.stopReapLoop();
})