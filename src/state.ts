import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
}

export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    return {
        rl: rl,
        commands: getCommands(),
    }
}
