import React from "react";
import CRUDListWrapper from "components/CRUDListWrapper";

export const CRUDConfigContext = React.createContext(null);

const CRUDLayout = ({ config, model }) => {
    return (
        <CRUDConfigContext.Provider value={config}>
            <CRUDListWrapper model={model} />
        </CRUDConfigContext.Provider>
    );
};

export default CRUDLayout;
