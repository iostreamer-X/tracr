import { getTracr } from '../main/index';

const logs = [];
const originalObject: any = { message: 'This is a test', value: 1 };
const tracerObject = getTracr(
    originalObject, 
    { maintainChangeLog: true, changeLog: logs}
);
function f1() {
    tracerObject.message = 'This is not a very good test!'
    tracerObject.value = -1;   
}
function f2() {
    tracerObject.message = 'This is a very good test!'
    tracerObject.value = 3000;   
}
function f3() {
    tracerObject.newKey = 'Added new key';
    tracerObject.anotherNewKey = {
        anotherMessage: 'Added another message'
    };
}
function f4() {
    (function f5(){
        tracerObject.newKey = 'Modified new key';
        tracerObject.anotherNewKey.anotherMessage = 'Modified another message';
    })();
}
f1();
f2();
f3();
f4();
console.log(logs);