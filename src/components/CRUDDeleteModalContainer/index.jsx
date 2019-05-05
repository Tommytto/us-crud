import React from "react";
import { compose } from "redux";
import { fromStore, injectModel } from "model/hocs";
import {useBackToBase, useCRUDComponent, useRouteParams} from "logic/hooks";
import { withRouter } from "react-router";
import { useModelActions } from "model/hooks";

const CRUDDeleteModalContainer = props => {
    const { DeleteModal } = useCRUDComponent();
    const { asyncDeleteOne } = useModelActions(props.model);
    const { entityId } = useRouteParams();
    const backToBase = useBackToBase();

    function hideModal() {
        backToBase();
    }

    async function onOk() {
        await asyncDeleteOne(entityId);
        hideModal();
    }

    return <DeleteModal {...props} onCancel={hideModal} onOk={onOk} />;
};

function mapStateToProps(state, { model, match: { params } }) {
    const { selectOne, selectIsActiveDeleteModal } = model.selectors;

    const entity = selectOne(state, params.entityId);
    return {
        isActive: selectIsActiveDeleteModal(state),
        name: entity && entity.name
    };
}

export default compose(
    injectModel,
    withRouter,
    fromStore(mapStateToProps)
)(CRUDDeleteModalContainer);
