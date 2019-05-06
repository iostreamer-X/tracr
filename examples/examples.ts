import { getTracr } from '../main/index';

const tracerObject = getTracr({ message: 'This is a test', value: 1 }, { maintainChangeLog: true });
function f1() {
    tracerObject.message = 'This is not a very good test!'
    tracerObject.value = -1;   
}
function f2() {
    tracerObject.message = 'This is a very good test!'
    tracerObject.value = 3000;   
}
f1();
f2();
console.log(tracerObject.changeLog);