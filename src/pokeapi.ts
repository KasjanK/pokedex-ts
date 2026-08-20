export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() { }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const fullURL = pageURL || `${PokeAPI.baseURL}/location-area/`;
        try {
            const response = await fetch(fullURL, {
                method: "GET",
                mode: "cors",
            });
            const shallowLocations = (await response.json()) as ShallowLocations;
            return shallowLocations;
        } catch (e) {
            throw new Error(`Error fetching locations: ${(e as Error).message}`);
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const fullURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
        try {
            const response = await fetch(fullURL, {
                method: "GET",
                mode: "cors",
            });
            const location = (await response.json()) as Location;
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
