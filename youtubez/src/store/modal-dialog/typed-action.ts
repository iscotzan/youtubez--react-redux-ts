import {typedAction} from "../../model";
export const toggleModalOpenAction = () => {
    return typedAction('modalDialog/TOGGLE_MODAL_OPEN')
}

export type ModalDialogAction = ReturnType<typeof toggleModalOpenAction>;
