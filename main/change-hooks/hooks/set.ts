import { Action } from "../action";
import { Config } from "../../types/config.type";

export class SetHandler{
    constructor(readonly action: Action) {
    }
    handler(target, key, value) {
        this.action.handler(target, 'set', key, value);
        target[key] = value;
        return true;
    }
}