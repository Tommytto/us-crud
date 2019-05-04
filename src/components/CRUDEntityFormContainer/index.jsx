import React from "react";
import { useCRUDComponent } from "logic/hooks";

const CRUDEntityFormContainer = props => {
    const { EntityForm } = useCRUDComponent();
    return <EntityForm {...props} />;
};

export default CRUDEntityFormContainer;
