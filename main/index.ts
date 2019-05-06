import { GetHandler } from "./change-hooks/hooks/get";
import { SetHandler } from "./change-hooks/hooks/set";
import { DeleteHandler } from "./change-hooks/hooks/delete";
import { Config } from "./types/config.type";



function convertToProxyRecursively(target, config: Config) {
    if (target instanceof Array) {
        target.forEach((data) => convertToProxyRecursively(data, config));
    } else if (typeof target === 'object') {
        for (const key in target) {
            if (typeof target[key] === 'object') {
                target[key] = getHookedProxy(target[key], config);
                convertToProxyRecursively(target[key], config);
            } else if (target[key] instanceof Array) {
                target[key].forEach((data) => convertToProxyRecursively(data, config));
            }
        }
    }
}


function getHookedProxy(target, config: Config) {
    const handler: ProxyHandler<any> = {
        set: new SetHandler(config).handler,
        deleteProperty: new DeleteHandler().handler
    }
    if (config.logGetCalls) {
        handler.get = new GetHandler().handler
    }
    return new Proxy(target, handler);
}

export function getTracr(target, givenConfig?: Config) {
    const config: Config = {
        traceNewKeys: true, 
        logGetCalls: false,
        ...givenConfig
    }
    convertToProxyRecursively(target, config);
    return getHookedProxy(
        target,
        config
    );
}