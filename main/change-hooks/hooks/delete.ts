import { Action } from "../action";

export class DeleteHandler extends Action {
    handler(target, key) {
        super.handler(target, key);
        delete target[key];
        return true;
    }
}