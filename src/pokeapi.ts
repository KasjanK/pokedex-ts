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

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const fullURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`; 

        try {
            const response = await fetch(fullURL, {
                method: "GET",
                mode: "cors",
            });

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const pokemon = (await response.json()) as Pokemon;
            return pokemon;
        } catch (e) {
            throw new Error(`Error fetching pokemon '${pokemonName}': ${(e as Error).message}`);
        }
    }
}

export type ShallowLocations = {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
    }[];
};


export type Location = {
    encounter_method_rates: {
        encounter_method: {
            name: string;
            url: string;
        };
        version_details: {
            rate: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
    game_index: number;
    id: number;
    location: {
        name: string;
        url: string;
    };
    name: string;
    names: {
        language: {
            name: string;
            url: string;
        };
        name: string;
    }[];
    pokemon_encounters: {
        pokemon: {
            name: string;
            url: string;
        };
        version_details: {
            encounter_details: {
                chance: number;
                condition_values: any[];
                max_level: number;
                method: {
                    name: string;
                    url: string;
                };
                min_level: number;
            }[];
            max_chance: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
};

export type Pokemon = {
    id: number
    name: string
    base_experience: number
    height: number
    is_default: boolean
    order: number
    weight: number
    location_area_encounters: string
}
