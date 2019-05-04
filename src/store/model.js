import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { createAction, createReducer } from "store/utils";

function getInitialState() {
    return {
        data: {},
        list: [],
        modals: {
            create: false,
            update: false,
            delete: false
        },
        isLoading: false
    };
}

function getSelectors(name) {
    const selectState = state => state[name];
    const selectData = state => selectState(state).data;
    return {
        selectList: state => selectState(state).list,
        selectData,
        selectDataList: state => Object.values(selectData(state)),
        selectOne: (state, id) => selectData(state)[id],
        selectIsLoading: state => selectState(state).isLoading,
        ...generateModalSelectors(selectState)
    };
}

const MODAL_TYPES = {
    create: "create",
    update: "update",
    delete: "delete"
};

function getModalName(modalType) {
    return modalType.charAt(0).toUpperCase() + modalType.substring(1) + "Modal";
}

function generateModalActions(modalAction) {
    return Object.keys(MODAL_TYPES).reduce((result, modalType) => {
        const modalName = getModalName(modalType);
        const createFunc = {
            [`show${modalName}`]: () =>
                modalAction({ type: modalType, isVisible: true }),
            [`hide${modalName}`]: () =>
                modalAction({ type: modalType, isVisible: false })
        };
        return {
            ...result,
            ...createFunc
        };
    }, {});
}

function generateModalSelectors(selectState) {
    return Object.keys(MODAL_TYPES).reduce((result, modalType) => {
        const modalName = getModalName(modalType);

        return {
            ...result,
            [`selectIsActive${modalName}`]: state => selectState(state).modals[modalType]
        };
    }, {});
}

export function createModel(name) {
    const addOne = createAction("Add one");
    const addMany = createAction("Add many");
    const startLoading = createAction("Loading start");
    const stopLoading = createAction("Loading stop");
    const changeModalVisibility = createAction("Show/hide modal");
    const initialState = getInitialState();

    const reducer = createReducer(
        {
            [addMany]: (state, { data, list }) => ({
                ...state,
                data,
                list
            }),
            [addOne]: (state, entity) => ({
                ...state,
                data: {
                    ...state.data,
                    [entity.id]: entity
                },
                list: [...state.list, entity.id]
            }),
            [startLoading]: state => ({
                ...state,
                isLoading: true
            }),
            [stopLoading]: state => ({
                ...state,
                isLoading: false
            }),
            [changeModalVisibility]: (state, { type, isVisible }) => ({
                ...state,
                modals: {
                    ...state.modals,
                    [type]: isVisible
                }
            })
        },
        initialState
    );

    function loadMany(dataPromise, normalizer) {
        return async dispatch => {
            dispatch(startLoading());
            try {
                const data = await dataPromise;
                const normData = normalizer(data);
                dispatch(addMany(normData));
            } finally {
                dispatch(stopLoading());
            }
        };
    }

    return {
        getName: () => name,
        getReducer: () => reducer,
        selectors: getSelectors(name),
        actions: {
            addOne,
            addMany,
            loadMany,
            ...generateModalActions(changeModalVisibility)
        }
    };
}


export function fromStore(selector) {
    return Component => {
        const WrappedComponent = React.memo(Component);
        return props => {
            const data = useSelector(state => selector(state, props));
            return <WrappedComponent {...props} {...data} />;
        };
    };
}

export function useModelActions(model) {
    const dispatch = useDispatch();

    return Object.keys(model.actions).reduce((result, key) => {
        return {
            ...result,
            [key]: (...data) => dispatch(model.actions[key](...data))
        };
    }, {});
}

export const userModel = createModel("user");
