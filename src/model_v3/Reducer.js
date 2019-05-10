export default class Reducer {
    constructor(fields) {
        this.fields = fields;
        this.reducer = this.fields.reduce((result, field) => {

            return {
                ...result,
                ...this.getReducerPart(field)
            }
        }, {})
    }

    getReducerPart(field) {
        const actions = field.getActions();
        const handlers = field.getHandlers();
        return Object.keys(actions).reduce((result, actionName) => {
            const action = actions[actionName];
            const type = action.getType();
            return {
                ...result,
                [type]: handlers[actionName],
            }
        }, {})
    }

    getReducer() {
        return (state = {modal:{}}, { type, payload }) => {
            const handler = this.reducer[type];
            if (!handler) {
                return state;
            }
            return handler(state, payload);
        };

    }
}