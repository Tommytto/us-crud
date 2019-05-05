import { getModalName } from "model/helpers";

function makeDescription({ modelName, description }) {
    return description + "_" + modelName.toUpperCase();
}

function getMutations({ makeActionCreator, modelName }) {
    const actionDescription = {
        createOne: "CREATE_ONE",
        updateOne: "UPDATE_ONE",
        deleteOne: "DELETE_ONE",
        readMany: "READ_MANY",
        startLoading: "START_LOADING",
        stopLoading: "STOP_LOADING",
        changeModalVisibility: "SHOW/HIDE_MODAL"
    };

    return Object.keys(actionDescription).reduce((result, key) => {
        const description = makeDescription({
            modelName,
            description: actionDescription[key]
        });

        return {
            ...result,
            [key]: makeActionCreator(description)
        };
    }, {});
}

function getModalActions({ modalTypes, modalAction }) {
    return Object.keys(modalTypes).reduce((result, modalType) => {
        const modalName = getModalName(modalType);
        const modalFuncs = {
            [`show${modalName}`]: () =>
                modalAction({ type: modalType, isVisible: true }),
            [`hide${modalName}`]: () =>
                modalAction({ type: modalType, isVisible: false })
        };
        return {
            ...result,
            ...modalFuncs
        };
    }, {});
}

function getAsyncActions({ mutations, asyncActions }) {
    const {
        startLoading,
        readMany,
        createOne,
        deleteOne,
        updateOne,
        stopLoading
    } = mutations;

    function asyncWrapper(dataPromise) {
        return async dispatch => {
            dispatch(startLoading());
            try {
                return await dataPromise;
            } finally {
                dispatch(stopLoading());
            }
        };
    }

    function asyncReadMany() {
        return async dispatch => {
            const data = await dispatch(
                asyncWrapper(asyncActions.readMany.async())
            );
            const normData = asyncActions.readMany.normalizer(data);
            dispatch(readMany(normData));
        };
    }

    function asyncDeleteOne(entityId) {
        return async dispatch => {
            await dispatch(
                asyncWrapper(asyncActions.deleteOne.async(entityId))
            );
            dispatch(deleteOne(entityId));
        };
    }

    function asyncCreateOne(data) {
        return async dispatch => {
            const responseData = await dispatch(
                asyncWrapper(asyncActions.createOne.async(data))
            );
            dispatch(createOne(responseData));
        };
    }

    function asyncUpdateOne(data) {
        return async dispatch => {
            await dispatch(asyncWrapper(asyncActions.createOne.async(data)));
            dispatch(updateOne(data));
        };
    }

    return {
        asyncReadMany,
        asyncDeleteOne,
        asyncCreateOne,
        asyncUpdateOne
    };
}

function getComplexActions({ mutations, modalTypes }) {
    const { changeModalVisibility } = mutations;

    const modalActions = getModalActions({
        modalTypes,
        modalAction: changeModalVisibility
    });

    return {
        ...modalActions
    };
}

export function getActions({
    modelName,
    modalTypes,
    asyncActions: asyncApi,
    makeActionCreator
}) {
    const mutations = getMutations({ modelName, makeActionCreator });
    const complexActions = getComplexActions({
        mutations,
        modalTypes
    });
    const complexAsyncActions = getAsyncActions({
        asyncActions: asyncApi,
        mutations
    });

    return {
        ...mutations,
        ...complexActions,
        ...complexAsyncActions
    };
}
