import { userModel, fromStore } from "store/model";
import React, { useContext } from "react";
import { CRUDConfigContext } from "components/CRUDLayout";

const CRUDListWrapper = props => {
    const { List } = useContext(CRUDConfigContext);
    return <List {...props} />;
};

function mapStateToProps(state, {model}) {
    return {
        list: model.selectors.selectList(state),
        isLoading: model.selectors.selectIsLoading(state)
    }
}

export default fromStore(CRUDListWrapper, mapStateToProps);
