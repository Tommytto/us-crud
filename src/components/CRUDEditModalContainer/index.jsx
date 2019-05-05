import React from "react";
import { compose } from "redux";
import { fromStore, injectModel } from "model/hocs";
import {useCRUDComponent} from "logic/hooks";
import { withRouter } from "react-router";

const CRUDDeleteModalContainer = props => {
    const { DeleteModal } = useCRUDComponent();
    return <DeleteModal {...props} />;
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
