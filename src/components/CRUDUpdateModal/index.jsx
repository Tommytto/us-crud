import React from "react";
import { Form, Modal } from "antd";
import {useBackToBase, useCRUDComponent} from "logic/hooks";
import { compose } from "redux";
import { forwardFormRef } from "logic/hoc";

const CRUDUpdateModal = ({ isActive, entityData, form, model, onOk }) => {
    const { EntityFormContainer } = useCRUDComponent();
    const backToBase = useBackToBase();
    return (
        <Modal
            onOk={onOk}
            title={"Update " + model.getName()}
            onCancel={backToBase}
            visible={isActive}
        >
            <EntityFormContainer initialValues={entityData} form={form} />
        </Modal>
    );
};

export default compose(
    Form.create(),
    forwardFormRef
)(CRUDUpdateModal);
