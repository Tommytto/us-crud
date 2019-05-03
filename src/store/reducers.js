import { combineReducers } from "redux";
import { createAction, createReducer } from "store/utils";
import { userModel } from "store/model";

export const actionSetTreeList = createAction("Set tree list");
export const actionSetAppleList = createAction("Set apple list");
export const actionAddApple = createAction("Add apple");

const treeInitialState = {
    idList: [],
    data: {}
};
const treeReducer = createReducer(
    {
        [actionAddApple]: (state, payload) => {
            return {
                ...state,
                data: {
                    ...state.data,
                    [payload.parentId]: {
                        ...state.data[payload.parentId],
                        appleList: [
                            ...state.data[payload.parentId].appleList,
                            payload.id
                        ]
                    }
                }
            };
        },
        [actionSetTreeList]: (state, payload) => {
            return {
                idList: payload.idList,
                data: payload.data
            };
        }
    },
    treeInitialState
);

const appleInitialState = {
    data: {}
};

const appleReducer = createReducer(
    {
        [actionAddApple]: (state, payload) => {
            return {
                data: {
                    ...state.data,
                    [payload.id]: payload
                }
            };
        },
        [actionSetAppleList]: (state, payload) => {
            return {
                data: payload
            };
        }
    },
    appleInitialState
);

const rootReducer = combineReducers({
    tree: treeReducer,
    apple: appleReducer,
    user: userModel.getReducer()
});

export const initialState = {
    tree: treeInitialState,
    apple: appleInitialState
};

export default rootReducer;
