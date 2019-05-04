import { fromStore } from "store/model";
import React, {useMemo} from "react";
import { useCRUDComponent } from "logic/hooks";
import { compose } from "redux";
import { injectModel } from "logic/hoc";

const CRUDListContainer = props => {
    const { List } = useCRUDComponent();

    const columns = useMemo(() => {
        return props.dataList[0] && Object.keys(props.dataList[0]).map((key) => {
            const lowCase = key.toLowerCase();
            return {
                title: key,
                dataIndex: lowCase,
                key: lowCase,
            }
        })
    }, [props.dataList]);

    return <List columns={columns} {...props} />;
};

function mapStateToProps(state, { model }) {
    return {
        dataList: model.selectors.selectDataList(state),
        isLoading: model.selectors.selectIsLoading(state)
    };
}

export default compose(
    injectModel,
    fromStore(mapStateToProps)
)(CRUDListContainer);
