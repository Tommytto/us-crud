import React from "react";

export function forwardFormRef(Component) {
    return class MyComponent extends React.Component {
        render() {
            return <Component {...this.props} />;
        }
    };
}