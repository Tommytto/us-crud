import React from "react";
import { Form, Modal } from "antd";
import { useBackToBase } from "logic/hooks";
import { compose } from "redux";
import { forwardFormRef } from "logic/hoc";

const CRUDDeleteModal = ({ isActive, name, model, onDelete }) => {
    const backToBase = useBackToBase();
    return (
        <Modal
            onOk={onDelete}
            title={"Delete " + model.getName()}
            onCancel={backToBase}
            visible={isActive}
        >
            Are you sure u want to delete <b>{name}</b>
        </Modal>
    );
};

export default compose(
    Form.create(),
    forwardFormRef
)(CRUDDeleteModal);
