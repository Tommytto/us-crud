import React, { useRef } from "react";
import { compose } from "redux";
import { fromStore, injectModel } from "model/hocs";
import { useBackToBase, useCRUDComponent, useRouteParams } from "logic/hooks";
import { withRouter } from "react-router";
import { useModelActions } from "model/hooks";

const CRUDUpdateModalContainer = props => {
    const formRef = useRef();

    const { UpdateModal } = useCRUDComponent();
    const { entityId } = useRouteParams();
    const { asyncUpdateOne } = useModelActions(props.model);
    const backToBase = useBackToBase();

    async function onOk() {
        const userInfo = formRef.current.props.form.getFieldsValue();
        await asyncUpdateOne({
            ...userInfo,
            id: entityId
        });
        backToBase();
    }

    return <UpdateModal wrappedComponentRef={formRef} {...props} onOk={onOk} />;
};

function mapStateToProps(state, { model, match: { params } }) {
    const { selectOne, selectIsActiveUpdateModal } = model.selectors;

    return {
        isActive: selectIsActiveUpdateModal(state),
        entityData: selectOne(state, params.entityId)
    };
}

export default compose(
    injectModel,
    withRouter,
    fromStore(mapStateToProps)
)(CRUDUpdateModalContainer);
