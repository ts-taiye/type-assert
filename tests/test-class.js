import test from 'ava';
import assert from '../lib';
import { TypeAssertionError } from '../lib/exceptions';
import { except, only } from './data';

class Test {
};

class Test2 {
};

test('value instance of class', t => {
    const instance = new Test();
    assert.isInstanceOf(instance, Test);
    t.pass();
});

test('value of IntArray is instance of class', t => {
    const intArray = only('int8array');
    assert.isInstanceOf(intArray, Int8Array);
    t.pass();
});

test('value instance of class with string param', t => {
    const instance = new Test();
    assert.isInstanceOf(instance, 'Test');
    t.pass();
});

test('value is not instance of class', t => {
    const instance = new Test();
    t.throws(() => {
        assert.isInstanceOf(instance, Test2);
    }, TypeAssertionError);
});

test('value is not class instance', t => {
    const valuesToCheck = except();
    Object.keys(valuesToCheck).forEach((key) => {
        let typeValue = valuesToCheck[key];
        t.throws(() => { assert.isInstanceOf(typeValue, Test); }, TypeAssertionError);
    });
    t.pass();
});
