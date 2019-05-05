import { getModalName } from "model/helpers";

export function getSelectors({ modelName, modalTypes }) {
    const selectState = state => state[modelName];
    const selectData = state => selectState(state).data;
    const selectDataList = state => Object.values(selectData(state));
    const selectList = state => selectState(state).list;
    const selectOne = (state, id) => selectData(state)[id];
    const selectIsLoading = state => selectState(state).isLoading;
    const modalSelectors = createModalSelectors(selectState);

    function createModalSelectors(selectState) {
        return Object.keys(modalTypes).reduce((result, modalType) => {
            const modalName = getModalName(modalType);

            return {
                ...result,
                [`selectIsActive${modalName}`]: state =>
                    selectState(state).modals[modalType]
            };
        }, {});
    }

    return {
        selectState,
        selectData,
        selectDataList,
        selectList,
        selectOne,
        selectIsLoading,
        ...modalSelectors
    };
}
