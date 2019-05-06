import { Action } from "../action";
import { Config } from "../../types/config.type";

export class SetHandler extends Action {
    constructor(readonly config: Config) {
        super();
    }
    handler(target, key, value) {
        super.handler(target, key);
        target[key] = value;
        return true;
    }
}