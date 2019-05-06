import { Action } from "../action";

export class GetHandler{
    constructor(readonly action: Action) {

    }
    handler(target, key) {
        this.action.handler(target, 'get', key, target[key]);
        return target[key];
    }
}