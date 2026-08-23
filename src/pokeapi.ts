import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;

    constructor(interval: number) {
        this.cache = new Cache(interval);
    }

    closeCache() {
        this.cache.stopReapLoop();
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const fullURL = pageURL || `${PokeAPI.baseURL}/location-area/`;

        const cachedLocations = this.cache.get<ShallowLocations>(fullURL)
        if (cachedLocations) {
            return cachedLocations
        }

        try {
            const response = await fetch(fullURL, {
                method: "GET",
                mode: "cors",
            });

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const shallowLocations = (await response.json()) as ShallowLocations;
            this.cache.add(fullURL, shallowLocations)
            return shallowLocations;
        } catch (e) {
            throw new Error(`Error fetching locations: ${(e as Error).message}`);
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const fullURL = `${PokeAPI.baseURL}/location-area/${locationName}`;

        const cachedLocation = this.cache.get<Location>(fullURL)
        if (cachedLocation) {
            return cachedLocation;
        }

        try {
            const response = await fetch(fullURL, {
                method: "GET",
                mode: "cors",
            });

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const location = (await response.json()) as Location;
            this.cache.add(fullURL, location)
            return location;
        } catch (e) {
            throw new Error(`Error fetching location '${locationName}': ${(e as Error).message}`);
        }
    }
}

export type ShallowLocations = {
    next: string;
    previous: any;
    results: Location[];
}

export type Location = {
    name: string;
    url: string;
}
