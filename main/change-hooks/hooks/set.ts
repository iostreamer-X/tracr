import { Action } from "../action";

export class SetHandler extends Action {
    handler(target, key, value) {
        super.handler(target, key);
        target[key] = value;
        return true;
    }
}