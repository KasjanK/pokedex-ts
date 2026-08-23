import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";

import type { CLICommand } from "./state.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";

export function getCommands(): Record<string, CLICommand> {
    return {
        map: {
            name: "map",
            description: "Shows 20 location areas",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Shows previous 20 location areas",
            callback: commandMapb,
        },
        explore: {
            name: "explore",
            description: "Shows a list of all Pokemon in a given area",
            callback: commandExplore,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit,
        },
    };
}

