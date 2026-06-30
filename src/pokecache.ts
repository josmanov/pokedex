export type CacheEntry<T> = {
    createdAt: number // for the Date.now() value
    val: T // the generic object to cache
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(input: number) {
        this.#interval = input
        this.#startReapLoop();
    }

    add<T>(key: string, val: T) {
    const cacheEntryObject = {
        createdAt: Date.now(),
        val: val
    }
        this.#cache.set(key, cacheEntryObject);
    }

    get<T>(key: string): T | undefined {
        
        const entry = this.#cache.get(key);

        if (entry === undefined) {
            return undefined;
        }
        return entry.val;
    }

    #reap() {
        for (const [key, entry] of this.#cache) {
            if (Date.now() - entry.createdAt > this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop() {
        const timerId = setInterval(() => {
            this.#reap();
        }, this.#interval)
        this.#reapIntervalId = timerId;
    }

    stopReapLoop() {
        if (this.#reapIntervalId !== undefined) {
            clearInterval(this.#reapIntervalId);
        }
        this.#reapIntervalId = undefined;
    }
}