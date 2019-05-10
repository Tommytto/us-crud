import Action from "model_v3/Action";

export default class Field {
    constructor({attributeName, getState, modelName}) {
        this.attributeName = attributeName;
        this.getState = getState;
        this.modelName = modelName;
    }

    getActions() {
        return {
            set: new Action("SET_" + this.attributeName, this.modelName)
        };
    }

    getHandlers() {
        return {
            set: (state, payload) => ({
                ...state,
                [this.attributeName]: payload,
            })
        }
    }

    getSelectors = () => {
        return {
            select: (state) => {
                return this.getState(state)[this.attributeName];
            }
        }
    };

    getAttributeName() {
        return this.attributeName;
    }
}