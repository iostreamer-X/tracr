import * as stackTrace from 'stack-trace';
import { ContextCapture, Context } from '../context-capturing/context-capturing';
import { Config } from '../types/config.type';

export class Action {
    constructor(readonly config: Config) {

    }
    handler(target, operation, key, value) {
        const frames = stackTrace.get();
        const context = ContextCapture.getContext(frames, operation, key, value);
        if (this.config.maintainChangeLog) {
            this.config.changeLog.push(context);
        }
        if (this.config.log) {
            console.log(ContextCapture.getPrettyLog(context));
        }
    }
}