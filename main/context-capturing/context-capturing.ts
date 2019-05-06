import * as stackTrace from 'stack-trace';

export type Context = {
    fileName: string,
    functionName: string,
    lineNumber: number,
    operation: string,
    key: string, 
    value: string
};
export class ContextCapture {
    static getContext(frames: stackTrace.StackFrame[], operation: string, key: string, value: string): Context {
        const frame = frames[2];
        const fileName = frame.getFileName();
		const functionName = frame.getFunctionName() || '[anonymous]';
        const lineNumber = frame.getLineNumber();
        
        return {
            fileName,
            functionName,
            lineNumber,
            operation,
            key,
            value
        };
    }

    static getPrettyLog(context: Context) {
        return `
        ${context.key} modified/accessed at ${context.fileName}:${context.lineNumber} by function '${context.functionName}' with ${context.operation} operation and value '${context.value}'.
        `;
    }
}