import test from 'ava';
import assert from '../src';
import { except } from './data';
import { TypeAssertionError } from '../src/exceptions';

test('value is number', t => {
    assert.isNumber(1);
    t.pass();
});

test('value is not number', t => {
    const valuesToCheck = except('number');
    Object.keys(valuesToCheck).forEach((key) => {
        let typeValue = valuesToCheck[key];
        t.throws(() => { assert.isNumber(typeValue); }, TypeAssertionError);
    });
    t.pass();
});
