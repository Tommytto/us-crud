import React from "react";
import { getSelectors } from "model/selectors";
import { getReducer } from "model/reducer";
import { MODAL_TYPES } from "model/constants";
import { getActions } from "model/actions";

function makeActionCreatorDefault(description) {
    return payload => ({
        type: description,
        payload
    });
}

export function makeReducerDefault(reducer, initialState) {
    return (state = initialState, { type, payload }) => {
        const handler = reducer[type];
        if (!handler) {
            return state;
        }
        return handler(state, payload);
    };
}

function actionIdSelectorDefault(action) {
    return action().type;
}

export function createModel({
    modelName,
    handleActionId,
    handleActionCreator,
    asyncActions,
    handleReducer
}) {
    //TODO Remove gavnocode
    const makeActionCreator = handleActionCreator
        ? handleActionCreator
        : makeActionCreatorDefault;
    const makeReducer = handleReducer ? handleReducer : makeReducerDefault;
    const actionIdSelector = handleActionId
        ? handleActionId
        : actionIdSelectorDefault;

    const commonConfig = {
        modelName,
        modalTypes: MODAL_TYPES
    };

    const actions = getActions({
        ...commonConfig,
        makeActionCreator,
        asyncActions
    });
    const selectors = getSelectors(commonConfig);

    const reducer = makeReducer(...getReducer({ actions, actionIdSelector }));

    return {
        getName: () => modelName,
        getReducer: () => reducer,
        selectors,
        actions
    };
}
