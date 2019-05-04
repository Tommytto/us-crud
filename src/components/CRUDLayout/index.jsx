import React from "react";
import {useCRUDComponent} from "logic/hooks";

const CRUDLayout = () => {
    const {Header, ListContainer, CreateModalContainer} = useCRUDComponent();
    return (
        <>
            <Header />
            <ListContainer />
            <CreateModalContainer />
        </>
    );
};

export default CRUDLayout;
