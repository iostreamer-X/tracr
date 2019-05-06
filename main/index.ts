import { GetHandler } from "./change-hooks/hooks/get";
import { SetHandler } from "./change-hooks/hooks/set";

export function getTracr(target) {
    const handler = {
        get: new GetHandler().handler,
        set: new SetHandler().handler
    }

    return new Proxy(target, handler);
}