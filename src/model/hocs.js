import React, { useContext } from "react";
import { CRUDModelContext } from "logic/context";
import { useSelector } from "react-redux";

export function injectModel(Component) {
    return function(props) {
        const model = useContext(CRUDModelContext);
        return <Component model={model} {...props} />;
    };
}

export function fromStore(selector) {
    return Component => {
        const WrappedComponent = React.memo(Component);
        return props => {
            const data = useSelector(state => selector(state, props));
            return <WrappedComponent {...props} {...data} />;
        };
    };
}