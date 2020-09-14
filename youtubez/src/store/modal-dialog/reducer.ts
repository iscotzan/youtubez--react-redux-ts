import {ModalDialogAction} from "./typed-action";
import {ModalDialogState} from "./types";

const initialState: ModalDialogState = {
    modalOpen: false
};


export function modalDialogReducer(
    state = initialState,
    action: ModalDialogAction
): ModalDialogState {
    switch (action.type) {
        case "modalDialog/TOGGLE_MODAL_OPEN":
            return {...state, modalOpen: !state.modalOpen}
        default:
            return state;
    }
}