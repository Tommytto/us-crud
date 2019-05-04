import React from "react";
import {
    DEFAULT_COMPONENT_CONFIG,
    CRUDComponentConfigContext,
    CRUDFormFieldContext,
    CRUDModelContext
} from "logic/context";




const CRUDContainer = ({ config, texts, model, fieldConfig }) => {
    const resultConfig = {
        ...DEFAULT_COMPONENT_CONFIG,
        ...config
    };

    return (
        <CRUDComponentConfigContext.Provider value={resultConfig}>
            <CRUDFormFieldContext.Provider value={fieldConfig}>
                <CRUDModelContext.Provider value={model}>
                    <resultConfig.Layout texts={texts} />
                </CRUDModelContext.Provider>
            </CRUDFormFieldContext.Provider>
        </CRUDComponentConfigContext.Provider>
    );
};

CRUDContainer.defaultProps = {
    config: {}
};

export default React.memo(CRUDContainer);
