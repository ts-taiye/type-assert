import test from 'ava';
import assert from '../lib';
import { except } from './data';
import { TypeAssertionError } from '../lib/exceptions';

test('value is object', t => {
    assert.isObject({});
    t.pass();
});

test('value is not object', t => {
    const valuesToCheck = except('object');
    Object.keys(valuesToCheck).forEach((key) => {
        let typeValue = valuesToCheck[key];
        t.throws(() => { assert.isObject(typeValue); }, TypeAssertionError);
    });
    t.pass();
});
