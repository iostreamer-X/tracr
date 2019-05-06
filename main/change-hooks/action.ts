import * as stackTrace from 'stack-trace';
import { ContextCapture } from '../context-capturing/context-capturing';

export class Action {
    handler(target, ...args) {
        const frames = stackTrace.get();
        const context = ContextCapture.getContext(frames);
        if (!target.changeLog) {
            target.changeLog = [];
        }
        target.changeLog.push(context);
    }
}