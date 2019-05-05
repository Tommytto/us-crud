import React from "react";
import { userModel } from "store/model";
import { useCRUDComponent } from "logic/hooks";
import { fromStore } from "model/hocs";

const CRUDRowContainer = props => {
    const { Row } = useCRUDComponent();
    return <Row {...props} />;
};

export default fromStore(CRUDRowContainer, (state, { id }) => ({
    rowData: userModel.selectors.selectOne(state, id)
}));
