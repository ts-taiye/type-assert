import assert from './index.js';

class Test {
    toDo() {};
};

const c = new Test();
const d = assert.isInstanceOf(c, Test);
d.toDo
