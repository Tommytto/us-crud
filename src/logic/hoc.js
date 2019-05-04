import React, {useContext} from "react";
import {CRUDModelContext} from "logic/context";

export function injectModel(Component) {
    return function(props) {
        const model = useContext(CRUDModelContext);
        return <Component model={model} {...props} />;
    };
}