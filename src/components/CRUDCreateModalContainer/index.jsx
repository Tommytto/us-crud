import React, {useRef} from "react";
import { compose } from "redux";
import { fromStore } from "store/model";
import { injectModel } from "logic/hoc";
import { useCRUDComponent } from "logic/hooks";

const CRUDCreateModalContainer = props => {
    const formRef = useRef();
    const { CreateModal } = useCRUDComponent();
    function onCreate() {
        console.log(formRef.current);
    }

    return <CreateModal wrappedComponentRef={(item) => formRef.current = item} {...props} onCreate={onCreate}/>;
};

function mapStateToProps(state, { model }) {
    return {
        isActive: model.selectors.selectIsActiveCreateModal(state)
    };
}

export default compose(
    injectModel,
    fromStore(mapStateToProps),
)(CRUDCreateModalContainer);
