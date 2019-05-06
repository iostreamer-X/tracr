import { Config } from "./types/config.type";
import { handlerFactory } from "./handler.factory";



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
    const handler = handlerFactory(config);
    return new Proxy(target, handler);
}

export function getTracr(target, givenConfig?: Partial<Config>) {
    const config: Config = {
        traceNewKeys: true, 
        logGetCalls: false,
        maintainChangeLog: false,
        log: true,
        changeLog: [],
        ...givenConfig
    }
    convertToProxyRecursively(target, config);
    return getHookedProxy(
        target,
        config
    );
}