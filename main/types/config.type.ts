import { Context } from "../context-capturing/context-capturing";

export type Config = {
    traceNewKeys: boolean,
    logGetCalls: boolean,
    maintainChangeLog: boolean,
    log: boolean,
    changeLog: Context[]
};