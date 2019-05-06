import ActionCreatorHelper from "model_v2/ActionCreatorHelper";
import LoadingHandling from "model_v2/LoadingHandling";
import Reducer from "model_v2/Reducer";
import { MODAL_TYPES } from "model/constants";
import ModalHandling from "model_v2/ModalHandling";
import { getSelectors } from "model/selectors";

const CRUDActionCreators = {
    createOne: "CREATE_ONE",
    updateOne: "UPDATE_ONE",
    deleteOne: "DELETE_ONE",
    readMany: "READ_MANY"
};

const actionCreatorsConfig = {
    ...CRUDActionCreators,
    changeModalVisibility: "SHOW/HIDE_MODAL"
};

//TODO rewrite
function getAsyncActions({ mutations, asyncActions }) {
    const {
        startLoading,
        readMany,
        createOne,
        deleteOne,
        updateOne,
        stopLoading,
        startReadMany,
        stopReadMany,
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
            dispatch(startReadMany());
            const data = await asyncActions.readMany.async();
            const normData = asyncActions.readMany.normalizer(data);
            dispatch(readMany(normData));
            dispatch(stopReadMany());
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

export function getModel({ modelName, asyncActions }) {
    // Action creators
    const actionCreatorData = ActionCreatorHelper.makeActionCreators({
        config: actionCreatorsConfig,
        modelName
    });
    const preparedActionCreators = ActionCreatorHelper.prepareActionCreators(
        actionCreatorData
    );

    // Action handlers
    const actionHandlerList = ActionCreatorHelper.getActionHandlerList(
        actionCreatorData
    );

    // Action creators and Action handlers
    const loadingHandling = new LoadingHandling({
        actionCreatorConfig: CRUDActionCreators,
        modelName
    });
    const modalHandling = new ModalHandling({
        modalTypes: MODAL_TYPES,
        modalAction: preparedActionCreators.changeModalVisibility
    });

    // Reducer
    const reducer = new Reducer({
        handlerList: [...actionHandlerList, ...loadingHandling.getHandlers()]
    });
    return {
        getName: () => modelName,
        getReducer: () => reducer.createReducer(),
        actions: {
            ...preparedActionCreators,
            ...loadingHandling.getActionCreators(),
            ...modalHandling.getModalActions(),
            ...getAsyncActions({
                mutations: {
                    ...preparedActionCreators,
                    ...loadingHandling.getActionCreators()
                },
                asyncActions
            })
        },
        // TODO Create Selector class
        selectors: getSelectors({ modalTypes: MODAL_TYPES, modelName })
    };
}
