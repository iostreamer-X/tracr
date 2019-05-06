import { Config } from "./types/config.type";
import { Action } from "./change-hooks/action";
import { DeleteHandler } from "./change-hooks/hooks/delete";
import { GetHandler } from "./change-hooks/hooks/get";
import { SetHandler } from "./change-hooks/hooks/set";
import { getTracr } from ".";

export type Handler = SetHandler | DeleteHandler | GetHandler
function getHandler<T extends { new (...args: any[]): Handler }>(handlerClass: T, action: Action) {
    const instance = new handlerClass(action)
    return instance.handler.bind(instance);
}

export function handlerFactory(config: Config) {
    const action = new Action(config);
    
    const handler: ProxyHandler<any> = {
        set: function (target, key, value) {
            const handler = getHandler(SetHandler, action);
            if (config.traceNewKeys && target[key] === undefined && typeof value === 'object') {
                value = getTracr(value, config);
            }
            handler(target, key, value);
            return true;
        },
        deleteProperty: getHandler(DeleteHandler, action)
    }

    if (config.logGetCalls) {
        handler.get = getHandler(GetHandler, action);
    }

    return handler;
}