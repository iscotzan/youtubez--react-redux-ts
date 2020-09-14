import {Dispatch} from "redux";
import {toggleModalOpenAction} from "./typed-action";

export const toggleModalOpen = () => {
    return (dispatch: Dispatch) => {
        dispatch(toggleModalOpenAction())
    }
}
