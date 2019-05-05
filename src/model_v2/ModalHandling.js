import {capitalize} from "model/helpers";

export default class ModalHandling {
    constructor({modalTypes, modalAction}) {
        this.modalTypes = modalTypes;
        this.modalAction = modalAction;
    }

    getModalName(modalType) {
        return modalType && capitalize(modalType) + "Modal";
    }

    getModalActions() {
        const { modalTypes, modalAction } = this;

        return Object.keys(modalTypes).reduce((result, modalType) => {
            const modalName = this.getModalName(modalType);
            const modalFuncs = {
                [`show${modalName}`]: () =>
                    modalAction({ type: modalType, isVisible: true }),
                [`hide${modalName}`]: () =>
                    modalAction({ type: modalType, isVisible: false })
            };
            return {
                ...result,
                ...modalFuncs
            };
        }, {});
    }

}