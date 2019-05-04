import React from "react";
import { useModelActions } from "store/model";
import { Button } from "antd";
import "./style.css";
import { compose } from "redux";
import { injectModel } from "logic/hoc";

const CRUDHeader = ({ model }) => {
    const { showCreateModal } = useModelActions(model);

    return (
        <div className="crud-header">
            <h1>{model.getName()} list</h1>
            <Button
                onClick={showCreateModal}
            >{`Add one ${model.getName()}`}</Button>
        </div>
    );
};

export default compose(injectModel)(CRUDHeader);
