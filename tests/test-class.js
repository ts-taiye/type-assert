import test from 'ava';
import assert from '../src';
import { TypeAssertionError } from '../src/exceptions';
import { except } from './data';

class Test {
};

class Test2 {
};

test('value instance of class', t => {
    const instance = new Test();
    assert.isInstanceOf(instance, Test);
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
