import { Action } from "../action";

export class DeleteHandler {
    constructor(readonly action: Action) {

    }
    handler(target, key) {
        this.action.handler(target, 'delete', key, target[key]);
        delete target[key];
        return true;
    }
}