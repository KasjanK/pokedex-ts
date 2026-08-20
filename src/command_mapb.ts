import { State } from "./state.js";

export async function commandMapb(state: State) {
    if (!state.prevLocationsURL) {
        throw new Error("you're on the first page")
    }
    const shallowLocations = await state.api.fetchLocations(state.prevLocationsURL);
    for (const location of shallowLocations.results) {
        console.log(location.name);
    }
    state.prevLocationsURL = shallowLocations.previous;
    state.nextLocationsURL = shallowLocations.next;

}
