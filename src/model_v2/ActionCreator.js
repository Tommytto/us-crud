export default class ActionCreator {
    constructor({ type, handler }) {
        this.type = type;
        this.handler = handler;
    }

    getType() {
        return this.type;
    }

    getHandler() {
        return this.handler;
    }

    setHandler(handler) {
        this.handler = handler;
    }
}