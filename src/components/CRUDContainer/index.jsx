import React from "react";
import {
    DEFAULT_COMPONENT_CONFIG,
    CRUDComponentConfigContext,
    CRUDFormFieldContext,
    CRUDModelContext,
    CRUDBasePathContext
} from "logic/context";

const CRUDContainer = ({ config, basePath, model, fieldConfig }) => {
    const resultConfig = {
        ...DEFAULT_COMPONENT_CONFIG,
        ...config
    };

    return (
        <CRUDComponentConfigContext.Provider value={resultConfig}>
            <CRUDFormFieldContext.Provider value={fieldConfig}>
                <CRUDModelContext.Provider value={model}>
                    <CRUDBasePathContext.Provider value={basePath}>
                        <resultConfig.Layout />
                    </CRUDBasePathContext.Provider>
                </CRUDModelContext.Provider>
            </CRUDFormFieldContext.Provider>
        </CRUDComponentConfigContext.Provider>
    );
};

CRUDContainer.defaultProps = {
    config: {}
};

export default React.memo(CRUDContainer);
