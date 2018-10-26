export class TypeAssertionError extends Error {
    /**
     *
     * @param {*} type of test variable found
     * @param {String} expectedType of test variable
     * @param  {...*} args
     */
    constructor(type, expectedType, ...args) {
        super(`Type check failed, found: ${type}, expected: ${expectedType}, `, ...args);
    }
}

export class NotAllKeysPresentError extends Error {
    /**
     *
     * @param {*} value of test variable found
     * @param {Array} keys to check
     * @param  {...any} args
     */
    constructor(value, keys, ...args) {
        super(`Not found keys: ${keys} in: ${value}`, ...args);
    }
};
