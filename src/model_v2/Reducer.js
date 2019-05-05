export default class Reducer {
    constructor({ handlerList }) {
        this.handlerList = handlerList;
        this.initialState = {
            data: {},
            list: [],
            modals: {
                create: false,
                update: false,
                delete: false
            },
            loading: {}
        };
        this.reducer = null;

        this.makeReducer();
    }

    add(handler) {
        this.handlerList.push(handler);
    }

    makeReducer() {
        this.reducer = this.handlerList.reduce((result, actionHandler) => {
            const actionType = actionHandler.getActionCreator().getType();
            return {
                ...result,
                [actionType]: actionHandler.getHandler()
            };
        }, {});
    }

    getReducer() {
        return this.reducer;
    }

    createReducer() {
        return (state = this.initialState, { type, payload }) => {
            const handler = this.reducer[type];
            if (!handler) {
                return state;
            }
            return handler(state, payload);
        };
    }
}