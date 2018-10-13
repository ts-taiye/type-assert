const typeExamples = {
    'boolean': true,
    'null': null,
    'undefined': undefined,
    'number': 42,
    'string': '42',
    'date': new Date(),
    'function': function() {},
    'array': [42, 43],
    'int8array': Int8Array.from([42, -43]),
    'uint8array': Uint8Array.from([42, 43]),
    'uint8clampedarray': new Uint8ClampedArray([42, 142]),
    'int16array': new Int16Array([42, 43]),
    'uint16array': new Uint16Array([42, 43]),
    'int32array': new Int32Array([42, 43]),
    'uint32array': new Uint32Array([42, 43]),
    'float32array': new Float32Array([42.0, 43.0]),
    'float64array': new Float64Array([42.0, 43.0]),
    'set': new Set([42, 43]),
    'weakset': new WeakSet(),
    'map': new Map([[{ a: 'b' }, '42'], [{ b: 'c' }, '43']]),
    'weakmap': new WeakMap([[{ a: 'b' }, '42'], [{ b: 'c' }, '43']]),
    'error': new Error('test'),
    'promise': new Promise(resolve => { resolve(); }),
    'arraybuffer': new ArrayBuffer(42),
    'sharedarraybuffer': new SharedArrayBuffer(8), // eslint-disable-line no-undef
    'generatorfunction': function * gen() { yield 1; },
    'asyncfunction': async function() {}
};
export default typeExamples;

/**
 * Returns data types for checking negative case
 * @param types to exclude from data source
 * @returns {{}}
 */
export function except(...types) {
    if (types.length === 0) {
        return typeExamples;
    }
    return Object.keys(typeExamples)
        .filter(key => { return types.indexOf(key) < 0; })
        .reduce((object, key) => {
            object[key] = typeExamples[key];
            return object;
        }, {});
}

/**
 * Returns only one type value of given type name
 * @param type to get value of
 * @returns {*}
 */
export function only(type) {
    return typeExamples[type];
}
