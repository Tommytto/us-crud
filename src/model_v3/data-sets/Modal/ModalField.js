import Field from "model_v3/Field";

export default class ModalField extends Field {
    constructor(props) {
        super({attributeName: "modal", ...props});
    }
    getHandlers() {
        return {
            set: (state, [modalName, isVisible]) => ({
                ...state,
                [this.attributeName]: {
                    ...state,
                    [modalName]: isVisible
                },
            })
        }
    };

    getSelectors = () => {
        return {
            select: (state, modalName) => {
                return this.getState(state).modal[modalName]
            }
        };
    }
}