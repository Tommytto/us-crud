export function createAction(actionName) {
    function actionCreator(payload) {
        return {
            type: actionCreator,
            payload
        };
    }
    const uniqueId = Symbol(actionName);
    actionCreator.toString = () => uniqueId;
    return actionCreator;
}

export function createReducer(reducer, initialState) {
    return (state = initialState, { type, payload }) => {
        const handler = reducer[type];
        if (!handler) {
            return state;
        }
        return handler(state, payload);
    };
}
