import { fromStore, injectModel } from "model/hocs";
import React, { useMemo } from "react";
import { useCRUDBasePath, useCRUDComponent } from "logic/hooks";
import { compose } from "redux";
import { Divider } from "antd";
import { Link } from "react-router-dom";

const CRUDListContainer = props => {
    const { List } = useCRUDComponent();
    const basePath = useCRUDBasePath();

    const columns = useMemo(() => {
        const result =
            props.dataList[0] &&
            Object.keys(props.dataList[0]).map(key => {
                const lowCase = key.toLowerCase();
                return {
                    title: key,
                    dataIndex: lowCase,
                    key: lowCase
                };
            });

        if (result) {
            result.push({
                title: "Actions",
                key: "action",
                width: 150,
                render: (text, record) => {
                    return (
                        <span>
                            <Link to={`${basePath}/${record.id}/update`}>
                                Update
                            </Link>
                            <Divider type="vertical" />
                            <Link to={`${basePath}/${record.id}/delete`}>
                                Delete
                            </Link>
                        </span>
                    );
                }
            });
        }
        return result;
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
