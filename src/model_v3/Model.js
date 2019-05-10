import ModalField from "model_v3/data-sets/Modal/ModalField";
import Reducer from "model_v3/Reducer";

export default class Model {
    initialState = {
        list: [],
        data: {},
        loading: {},
    };

    constructor({modelName, fields = [], idAttribute}) {
        this.modelName = modelName;
        this.idAttribute = idAttribute;
        const fieldList = [
            ...fields,
            new ModalField({getState: (state) => {
                    return state[modelName]
                }, modelName})
        ];

        this.fields = this.prepareFields(fieldList);

        this.reducer = new Reducer(fieldList, modelName);
    }

    prepareFields(fields) {
        return fields.reduce((result, field) => {
            return {
                ...result,
                [field.getAttributeName()]: field,
            }
        }, {})
    }

    getReducer() {
        return this.reducer.getReducer();
    }

    getField = (fieldName) => {
        return this.fields[fieldName];
    };

    getActions() {
        return {
            getField: this.getField
        }
    }

    getName() {
        return this.modelName;
    }
}