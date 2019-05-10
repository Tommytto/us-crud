import { getActionTypeByModel } from "model_v3/helpers/name";

export default class Action {
    constructor(type, modelName) {
        this.type = getActionTypeByModel(type, modelName);
        this.modelName = modelName;
    }
    getType() {
        return this.type;
    }
    getActionCreator() {
        return (...payload) => {
            return {
                type: this.type,
                payload
            }
        };
    }
}
