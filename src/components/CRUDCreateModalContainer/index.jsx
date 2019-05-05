import React, { useRef } from "react";
import { compose } from "redux";
import { fromStore, injectModel } from "model/hocs";
import { useBackToBase, useCRUDComponent } from "logic/hooks";
import { useModelActions } from "model/hooks";

const CRUDCreateModalContainer = props => {
    const formRef = useRef();
    const { CreateModal } = useCRUDComponent();

    const { asyncCreateOne } = useModelActions(props.model);
    const backToBase = useBackToBase();

    function onCreate() {
        const form = formRef.current.props.form;
        const userInfo = formRef.current.props.form.getFieldsValue();
        asyncCreateOne(userInfo);
        backToBase();
        form.resetFields();
    }

    return (
        <CreateModal
            {...props}
            wrappedComponentRef={formRef}
            onCreate={onCreate}
        />
    );
};

function mapStateToProps(state, { model }) {
    return {
        isActive: model.selectors.selectIsActiveCreateModal(state)
    };
}

export default compose(
    injectModel,
    fromStore(mapStateToProps)
)(CRUDCreateModalContainer);
