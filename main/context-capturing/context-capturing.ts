import * as stackTrace from 'stack-trace';

export class ContextCapture {
    static getContext(frames: stackTrace.StackFrame[]) {
        const frame = frames[1];
        const fileName = frame.getFileName();
		const functionName = frame.getFunctionName();
        const lineNumber = frame.getLineNumber();
        
        return {
            fileName,
            functionName,
            lineNumber
        };
    }
}