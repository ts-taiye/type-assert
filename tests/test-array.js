import test from 'ava';
import assert from '../';
import { except } from './data';
import { TypeAssertionError } from '../lib/exceptions';

test('value is array', t => {
    assert.isArray([]);
    t.pass();
});

test('value is not array', t => {
    const valuesToCheck = except('array');
    Object.keys(valuesToCheck).forEach((key) => {
        let typeValue = valuesToCheck[key];
        t.throws(() => { assert.isArray(typeValue); }, TypeAssertionError);
    });
    t.pass();
});
