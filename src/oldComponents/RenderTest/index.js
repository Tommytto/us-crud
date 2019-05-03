import React, { useContext } from "react";
import { DispatchContext, StoreContext } from "store/store";

const RenderTest = () => {
    // useContext(StoreContext);
    console.log("RENDER TEST");
    return null;
};

export default React.memo(RenderTest);
