import test from 'ava';
import assert from '../lib';
import { except, only } from './data';
import { TypeAssertionError } from '../lib/exceptions';

test('value is Promise', t => {
    const promise = only('promise');
    assert.isPromise(promise);
    t.pass();
});

test('value is not promise', t => {
    const valuesToCheck = except('promise');
    Object.keys(valuesToCheck).forEach((key) => {
        let typeValue = valuesToCheck[key];
        t.throws(() => { assert.isPromise(typeValue); }, TypeAssertionError);
    });
    t.pass();
});
