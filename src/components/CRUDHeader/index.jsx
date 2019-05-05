import React from "react";
import "./style.css";
import { compose } from "redux";
import { injectModel } from "model/hocs";
import {useCRUDBasePath} from "logic/hooks";
import {Link} from "react-router-dom";

const CRUDHeader = ({ model }) => {
    const basePath = useCRUDBasePath();

    return (
        <div className="crud-header">
            <h1>{model.getName()} list</h1>
            <Link className="ant-btn" to={basePath + '/create'}>{`Add one ${model.getName()}`}</Link>
        </div>
    );
};

export default compose(injectModel)(CRUDHeader);
