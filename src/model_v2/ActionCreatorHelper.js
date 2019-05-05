import ActionHandler from "model_v2/ActionHandler";
import ActionCreator from "model_v2/ActionCreator";

export default class ActionCreatorHelper {
    static getActionHandlerList(actionCreatorConfig) {
        const {
            createOne,
            readMany,
            deleteOne,
            updateOne,
            changeModalVisibility
        } = actionCreatorConfig;
        return [
            new ActionHandler({
                actionCreator: createOne,
                handler: (state, entity) => ({
                    ...state,
                    data: {
                        ...state.data,
                        [entity.id]: entity
                    },
                    list: [...state.list, entity.id]
                })
            }),
            new ActionHandler({
                actionCreator: readMany,
                handler: (state, { data, list }) => ({
                    ...state,
                    data,
                    list
                })
            }),
            new ActionHandler({
                actionCreator: deleteOne,
                handler: (state, idToDelete) => {
                    const { [idToDelete]: _, ...rest } = state.data;
                    return {
                        ...state,
                        data: rest,
                        list: state.list.filter(id => id !== idToDelete)
                    };
                }
            }),
            new ActionHandler({
                actionCreator: updateOne,
                handler: (state, entity) => ({
                    ...state,
                    data: {
                        ...state.data,
                        [entity.id]: entity
                    }
                })
            }),
            new ActionHandler({
                actionCreator: changeModalVisibility,
                handler: (state, { type, isVisible }) => ({
                    ...state,
                    modals: {
                        ...state.modals,
                        [type]: isVisible
                    }
                })
            })
        ];
    }

    static prepareActionCreators(actionCreatorData) {
        return Object.keys(actionCreatorData).reduce((result, funcName) => {
            const actionCreator = actionCreatorData[funcName];
            return {
                ...result,
                [funcName]: payload => ({
                    type: actionCreator.getType(),
                    payload
                })
            };
        }, {});
    }

    static makeActionCreators({ config, modelName }) {
        return Object.keys(config).reduce((result, actionCreatorName) => {
            const actionType = config[actionCreatorName];
            const updatedType = ActionCreatorHelper.getActionTypeByModel(
                actionType,
                modelName
            );
            return {
                ...result,
                [actionCreatorName]: new ActionCreator({ type: updatedType })
            };
        }, {});
    }

    static getActionTypeByModel(type, modelName) {
        return `${type}_${modelName.toUpperCase()}`;
    }
}
