import test from 'ava';
import assert from '../lib';
import { except } from './data';
import { TypeAssertionError } from '../lib/exceptions';

test('value is function', t => {
    assert.isFunction(() => {});
    assert.isFunction(function() {});
    assert.isFunction(async function() {});
    assert.isFunction(async() => {});
    t.pass();
});

test('value is not function', t => {
    const valuesToCheck = except('function', 'asyncfunction', 'generatorfunction');
    Object.keys(valuesToCheck).forEach((key) => {
        let typeValue = valuesToCheck[key];
        t.throws(() => { assert.isFunction(typeValue); }, TypeAssertionError);
    });
    t.pass();
});
