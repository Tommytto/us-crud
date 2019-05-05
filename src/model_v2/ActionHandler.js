export default class ActionHandler {
    constructor({ actionCreator, handler }) {
        this.actionCreator = actionCreator;
        this.handler = handler;

        actionCreator.setHandler(handler);
    }

    getActionCreator() {
        return this.actionCreator;
    }

    getHandler() {
        return this.handler;
    }
}