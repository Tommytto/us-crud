import React, { useContext } from "react";
import { userModel, fromStore } from "store/model";
import { CRUDConfigContext } from "components/CRUDLayout";

const CRUDRowWrapper = props => {
    const { Row } = useContext(CRUDConfigContext);
    return <Row {...props} />;
};

export default fromStore(CRUDRowWrapper, (state, { id }) => ({
    rowData: userModel.selectors.selectOne(state, id)
}));
