import * as stackTrace from 'stack-trace';
import * as colors from 'colors/safe';

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
        const frame = frames[3];
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
        const key = colors.red(context.key);
        const operation = colors.yellow(colors.underline(context.operation));
        const value = colors.green(context.value);
        const fileName = colors.cyan(context.fileName);
        const functionName = colors.cyan(context.functionName);
        const lineNumber = colors.cyan(context.lineNumber.toString());
        return `${key} modified/accessed at ${fileName}:${lineNumber} by function '${functionName}' with ${operation} operation and value '${value}'.`;
    }
}