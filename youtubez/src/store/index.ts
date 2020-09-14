import {combineReducers} from 'redux';
import {navigationReducer} from "./navigation/reducer";
import {videoReducer} from "./video/reducer";
import {modalDialogReducer} from "./modal-dialog/reducer";

export const rootReducer = combineReducers({
    navigation: navigationReducer,
    video: videoReducer,
    modalDialog: modalDialogReducer
});
export type RootState = ReturnType<typeof rootReducer>;