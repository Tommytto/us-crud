import React from "react";
import { Form, Modal } from "antd";
import { useBackToBase, useCRUDComponent } from "logic/hooks";
import { compose } from "redux";
import { forwardFormRef } from "logic/hoc";

const CRUDCreateModal = ({ isActive, form, model, onCreate }) => {
    const { EntityFormContainer } = useCRUDComponent();
    const backToBase = useBackToBase();
    return (
        <Modal
            onOk={onCreate}
            title={"Add" + model.getName()}
            onCancel={backToBase}
            visible={isActive}
        >
            <EntityFormContainer form={form} />
        </Modal>
    );
};

export default compose(
    Form.create(),
    forwardFormRef
)(CRUDCreateModal);
