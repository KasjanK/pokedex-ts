import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    api: PokeAPI;
    prevLocationsURL: any;
    nextLocationsURL: string;
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
}

export function initState(interval: number) {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    const api = new PokeAPI(interval);

    return {
        rl: rl,
        commands: getCommands(),
        api: api,
        prevLocationsURL: null,
        nextLocationsURL: "",
    }
}
