import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { createAction, createReducer } from "store/utils";

export function createModel(name) {
    const addOne = createAction("Add one");
    const addMany = createAction("Add many");

    const startLoading = createAction("Loading start");
    const stopLoading = createAction("Loading stop");

    const initialState = {
        data: {},
        list: [],
        isLoading: false
    };
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
        getReducer: () => reducer,
        selectors: {
            selectList: state => state[name].list,
            selectData: state => state[name].data,
            selectOne: (state, id) => state[name].data[id],
            selectIsLoading: state => state[name].isLoading
        },
        actions: {
            addOne,
            addMany,
            loadMany
        }
    };
}

export const userModel = createModel("user");

export function fromStore(Component, selector) {
    const WrappedComponent = React.memo(Component);
    return props => {
        let data = {};
        if (typeof selector === "object") {
            Object.keys(selector).forEach(key => {
                const handler = selector[key];
                data[key] = useSelector(state => handler(state, props));
            }, {});
        } else {
            data = useSelector(state => selector(state, props));
        }
        return <WrappedComponent {...props} {...data} />;
    };
}

export function useModel(model) {
    const dispatch = useDispatch();

    return Object.keys(model.actions).reduce((result, key) => {
        return {
            ...result,
            [key]: (...data) => dispatch(model.actions[key](...data))
        };
    }, {});
}
