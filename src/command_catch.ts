import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("you must provide a pokemon");
    }
    const pokemon = await state.api.fetchPokemon(args[0]);
    const catchRate = Math.floor(pokemon.base_experience * Math.random());

    console.log(`Throwing a Pokeball at ${pokemon.name}...`)
    if (catchRate > 40) {
        console.log(`${pokemon.name} escaped!`);
        return;
    }

    console.log(`${pokemon.name} was caught!`);
    state.pokedex[pokemon.name] = pokemon;
}
