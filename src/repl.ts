import { State } from "./state.js";

export function startREPL(state: State) {
    state.rl.prompt();
    state.rl.on('line', (input) => {
        const words = cleanInput(input);
        if (words.length == 0) {
            state.rl.prompt();
            return;
        }
        const commandName = words[0];
        const cmd = state.commands[commandName]
        if (!cmd) {
            console.log(`Unknown command: "${commandName}"`);
            state.rl.prompt();
            return
        }

        try {
            cmd.callback(state);
        } catch (e) {
            console.log(e);
        }
        state.rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().split(" ").filter((word) => word !== "");
}

