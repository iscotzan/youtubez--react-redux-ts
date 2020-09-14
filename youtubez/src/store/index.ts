import {combineReducers} from 'redux';
import {userReducer} from './modules/user';
import {productsReducer} from './modules/products';
import {navigationReducer} from "./navigation/reducer";
import {videoReducer} from "./video/reducer";
import {modalDialogReducer} from "./modal-dialog/reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    products: productsReducer,
    navigation: navigationReducer,
    video: videoReducer,
    modalDialog: modalDialogReducer
});
export type RootState = ReturnType<typeof rootReducer>;