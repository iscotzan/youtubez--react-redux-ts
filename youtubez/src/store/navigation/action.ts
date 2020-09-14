import {NavigationMode} from "./types";
import {typedAction} from "../../model";
import {Dispatch} from "redux";


const switchNavigationMode = (mode: NavigationMode) => {
    return typedAction('navigation/SWITCH_MODE', mode)
}
// Action creator returning a thunk!
export const switchMode = (mode: NavigationMode) => {
    return (dispatch: Dispatch) => {
        dispatch(switchNavigationMode(mode))
    }
}


export type NavigationAction = ReturnType<typeof switchNavigationMode>;
