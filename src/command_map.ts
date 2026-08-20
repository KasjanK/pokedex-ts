import { State } from "./state.js";

export async function commandMap(state: State) {
    const shallowLocations = await state.api.fetchLocations(state.nextLocationsURL);
    for (const shallowLocation of shallowLocations.results) {
        console.log(shallowLocation.name)
    }
    state.prevLocationsURL = shallowLocations.previous;
    state.nextLocationsURL = shallowLocations.next;
}
