export function getReducer({ actions, actionIdSelector }) {
    const {
        readMany,
        createOne,
        startLoading,
        updateOne,
        stopLoading,
        changeModalVisibility,
        deleteOne
    } = actions;

    const initialState = {
        data: {},
        list: [],
        modals: {
            create: false,
            update: false,
            delete: false
        },
        isLoading: false
    };

    function getActionType(action) {
        return actionIdSelector(action);
    }

    const reducer = {
        [getActionType(readMany)]: (state, { data, list }) => ({
            ...state,
            data,
            list
        }),
        [getActionType(deleteOne)]: (state, idToDelete) => {
            const {[idToDelete]:_, ...rest} = state.data;
            return {
                ...state,
                data: rest,
                list: state.list.filter((id) => id !== idToDelete)
            }
        },
        [getActionType(createOne)]: (state, entity) => ({
            ...state,
            data: {
                ...state.data,
                [entity.id]: entity
            },
            list: [...state.list, entity.id]
        }),
        [getActionType(updateOne)]: (state, entity) => ({
            ...state,
            data: {
                ...state.data,
                [entity.id]: entity
            },
        }),
        [getActionType(startLoading)]: state => ({
            ...state,
            isLoading: true
        }),
        [getActionType(stopLoading)]: state => ({
            ...state,
            isLoading: false
        }),
        [getActionType(changeModalVisibility)]: (
            state,
            { type, isVisible }
        ) => ({
            ...state,
            modals: {
                ...state.modals,
                [type]: isVisible
            }
        })
    };
    return [reducer, initialState];
}
