import { createInterface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { CLICommand } from "./command.js";


export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        }
    };
}

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    rl.prompt();
    rl.on('line', (input) => {
        const words = cleanInput(input);
        if (words.length == 0) {
            rl.prompt();
            return;
        }
        const commandName = words[0];
        const commandList = getCommands()
        const cmd = commandList[commandName]
        if (!cmd) {
            console.log(`Unknown command: "${commandName}"`);
            rl.prompt();
            return
        }

        try {
            cmd.callback(commandList);
        } catch (e) {
            console.log(e);
        }
        rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().split(" ").filter((word) => word !== "");
}

