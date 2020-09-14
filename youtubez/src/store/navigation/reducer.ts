import {NavigationReducerState} from "./types";
import {NavigationAction} from "./action";

const initialState: NavigationReducerState = {
    mode: "Trends"
};
export function navigationReducer(
    state = initialState,
    action: NavigationAction
): NavigationReducerState {
    switch (action.type) {
        case 'navigation/SWITCH_MODE':
            return {
                ...state,
                mode: action.payload,
            };
        default:
            return state;
    }
}