import React, { useEffect } from "react";
import { useModelActions } from "model/hooks";
import { useCRUDComponent, useRouteParams } from "logic/hooks";
import { injectModel } from "model/hocs";
import { getModalName } from "model/helpers";

const CRUDModals = ({ model }) => {
    const { CreateModalContainer, UpdateModalContainer, DeleteModalContainer } = useCRUDComponent();
    const { actionId } = useRouteParams();

    const modalName = getModalName(actionId);
    const showModal = `show${modalName}`;
    const hideModal = `hide${modalName}`;

    const {
        [showModal]: showModalFunc,
        [hideModal]: hideModalFunc
    } = useModelActions(model);

    useEffect(() => {
        showModalFunc && showModalFunc();
        return () => {
            hideModalFunc && hideModalFunc();
        };
    }, [actionId]);

    return (
        <>
            <CreateModalContainer />
            <DeleteModalContainer />
            <UpdateModalContainer />
        </>
    );
};

export default injectModel(CRUDModals);
