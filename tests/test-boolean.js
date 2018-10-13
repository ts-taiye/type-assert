import test from 'ava';
import assert from '../src';
import { except } from './data';
import { TypeAssertionError } from '../src/exceptions';

test('value is boolean', t => {
    assert.isBoolean(false);
    t.pass();
});

test('value is not boolean', t => {
    const valuesToCheck = except('boolean');
    Object.keys(valuesToCheck).forEach((key) => {
        let typeValue = valuesToCheck[key];
        t.throws(() => { assert.isBoolean(typeValue); }, TypeAssertionError);
    });
    t.pass();
});
