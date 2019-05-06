import { Action } from "../action";

export class GetHandler extends Action {
    handler(target, key) {
        super.handler(target, key);
        return target[key];
    }
}