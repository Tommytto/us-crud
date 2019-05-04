import React from "react";
import { useModelActions } from "store/model";
import { Form, Modal } from "antd";
import { useCRUDComponent } from "logic/hooks";
import { compose } from "redux";

const CRUDCreateModal = ({ isActive, model, onCreate }) => {
    const { EntityFormContainer } = useCRUDComponent();
    const { hideCreateModal } = useModelActions(model);

    return (
        <Modal
            onOk={onCreate}
            title={'Add' + model.getName()}
            onCancel={hideCreateModal}
            visible={isActive}
        >
            <EntityFormContainer />
        </Modal>
    );
};

export default compose(Form.create({name: 'qwd '}))(CRUDCreateModal);
