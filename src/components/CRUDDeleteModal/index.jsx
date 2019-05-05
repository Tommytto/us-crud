import React from "react";
import { Form, Modal } from "antd";
import { compose } from "redux";
import { forwardFormRef } from "logic/hoc";

const CRUDDeleteModal = ({ isActive, name, model, onOk, onCancel }) => {
    return (
        <Modal
            onOk={onOk}
            title={"Delete " + model.getName()}
            onCancel={onCancel}
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
