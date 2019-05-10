import React, { useEffect } from "react";
import { useCRUDComponent, useRouteParams } from "logic/hooks";
import { injectModel } from "model/hocs";
import { getModalName } from "model/helpers";
import {useModelActions} from "model_v3/hooks/use-model-actions";

// const CRUDModals = ({ model }) => {
//     const { CreateModalContainer, UpdateModalContainer, DeleteModalContainer } = useCRUDComponent();
//     const { actionId } = useRouteParams();
//
//     const modalName = getModalName(actionId);
//     const showModal = `show${modalName}`;
//     const hideModal = `hide${modalName}`;
//
//     const {
//         [showModal]: showModalFunc,
//         [hideModal]: hideModalFunc
//     } = useModelActions(model);
//
//     useEffect(() => {
//         showModalFunc && showModalFunc();
//         return () => {
//             hideModalFunc && hideModalFunc();
//         };
//     }, [actionId]);
//
//     return (
//         <>
//             <CreateModalContainer />
//             {/*<DeleteModalContainer />*/}
//             {/*<UpdateModalContainer />*/}
//         </>
//     );
// };

const CRUDModals = ({ model }) => {
    const { CreateModalContainer, UpdateModalContainer, DeleteModalContainer } = useCRUDComponent();
    const { actionId } = useRouteParams();

    const modalName = getModalName(actionId);

    const {getField} = useModelActions(model);
    const modalField = getField('modal');

    useEffect(() => {
        actionId && modalField.set(actionId, true);
        return () => {
            actionId && modalField.set(actionId, false);
        };
    }, [actionId]);

    return (
        <>
            <CreateModalContainer />
            {/*<DeleteModalContainer />*/}
            {/*<UpdateModalContainer />*/}
        </>
    );
};

export default injectModel(CRUDModals);
