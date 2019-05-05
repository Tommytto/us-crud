import { capitalize } from "model/helpers";
import ActionCreatorHelper from "model_v2/ActionCreatorHelper";
import ActionHandler from "model_v2/ActionHandler";

export default class LoadingHandling {
    constructor({ actionCreatorConfig, modelName }) {
        this.config = actionCreatorConfig;
        this.modelName = modelName;
        const { actions, handlers } = this.createLoadingConfig();
        this.actionCreators = null;
        this.actionHandlersInfo = handlers;
        this.actionCreatorsInfo = actions;

        this.makeActionCreators();
    }

    makeActionCreators() {
        this.actionCreators = ActionCreatorHelper.makeActionCreators({
            modelName: this.modelName,
            config: this.actionCreatorsInfo
        });
    }

    getHandlers() {
        return Object.keys(this.actionHandlersInfo).reduce(
            (result, actionCreatorFuncName) => {
                const actionCreator = this.actionCreators[
                    actionCreatorFuncName
                ];
                const handler = this.actionHandlersInfo[actionCreatorFuncName];
                const actionHandler = new ActionHandler({
                    actionCreator,
                    handler
                });
                return [...result, actionHandler];
            },
            []
        );
    }

    getActionCreators() {
        return ActionCreatorHelper.prepareActionCreators(this.actionCreators);
    }

    getSelectors() {}

    createLoadingConfig() {
        const { config } = this;

        return Object.keys(config).reduce((result, actionName) => {
            const actionTypeStart = "START_" + config[actionName];
            const actionTypeStop = "STOP_" + config[actionName];

            const startFuncName = `start${capitalize(actionName)}`;
            const stopFuncName = `stop${capitalize(actionName)}`;

            return {
                ...result,
                actions: {
                    ...result.actions,
                    [startFuncName]: actionTypeStart,
                    [stopFuncName]: actionTypeStop
                },
                handlers: {
                    ...result.handlers,
                    [startFuncName]: state => ({
                        ...state,
                        loading: {
                            ...state.loading,
                            [actionName]: true
                        }
                    }),
                    [stopFuncName]: state => ({
                        ...state,
                        loading: {
                            ...state.loading,
                            [actionName]: false
                        }
                    })
                }
            };
        }, {});
    }
}
