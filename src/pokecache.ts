export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#startReapLoop();
        this.#interval = interval;
    }

    add<T>(key: string, val: T) {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val,
        }
        this.#cache.set(key, entry);
    }

    get<T>(key: string) {
        const entry = this.#cache.get(key)
        if (entry !== undefined) {
            return entry.val as T;
        }
        return undefined;
    }

    #reap() {
        for (const [key, entry] of this.#cache) {
            if (entry !== undefined) {
                if (entry.createdAt < (Date.now() - this.#interval)) {
                    this.#cache.delete(key)
                }
            }
        }
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => { this.#reap() }, this.#interval)
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}
