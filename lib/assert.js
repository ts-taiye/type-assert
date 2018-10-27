import { TypeAssertionError, NotAllKeysPresentError } from './exceptions';

export default class Assert {
    /**
     * Try to get real type of given value
     * @private
     * @param {*} value to inspect type
     * @returns {String} type
     */
    _guessType(value) {
        return ({}).toString.call(value).match(/\s([^\]]+)/)[1].toLowerCase();
    }

    /**
     * @private
     * @param {*} value get type of value
     */
    _getType(value) {
        const constructorTypes = [
            'object',
            'error'
        ];
        let guessedType = this._guessType(value);
        if (constructorTypes.indexOf(guessedType) >= 0) {
            guessedType = value.constructor.name;
        }
        return guessedType;
    }

    /**
     * Checks if given value is Boolean
     * @param {*} value
     * @throws {TypeAssertionError}
     * @returns {Boolean} checked value
     */
    isBoolean(value) {
        if (typeof(value) === 'boolean') {
            return value;
        }

        throw new TypeAssertionError(this._getType(value), 'Boolean');
    }

    /**
     * Checks if given value is String
     * @param {*} value
     * @throws {TypeAssertionError}
     * @returns {String} checked value
     */
    isString(value) {
        if (typeof(value) === 'string') {
            return value;
        }

        throw new TypeAssertionError(this._getType(value), 'String');
    }

    /**
     * Checks if given value is Number
     * @param {*} value
     * @throws {TypeAssertionError}
     * @returns {Number} checked value
     */
    isNumber(value) {
        if (typeof(value) === 'number') {
            return value;
        }

        throw new TypeAssertionError(this._getType(value), 'Number');
    }

    /**
     * Checks if given value is Array
     * @param {*} value
     * @throws {TypeAssertionError}
     * @returns {Array} checked value
     */
    isArray(value) {
        if (Array.isArray(value) === true) {
            return value;
        }

        throw new TypeAssertionError(this._getType(value), 'Array');
    }

    /**
     * Checks if given value is Null
     * @param {*} value
     * @throws {TypeAssertionError}
     * @returns {null} checked value
     */
    isNull(value) {
        if (value === null) {
            return value;
        }

        throw new TypeAssertionError(this._getType(value), 'Null');
    }

    /**
     *
     * @param {*} value
     */
    isObject(value) {
        if (value && value.constructor && value.constructor.name.toLowerCase() === 'object') {
            return value;
        }

        throw new TypeAssertionError(this._getType(value), 'Object');
    }

    /**
     * Checks if value is object and has needed keys
     * @param {*} value object
     * @param {Array} keys to check
     * @throws {NotAllKeysPresentError, TypeAssertionError}
     * @returns {Object} value
     */
    isObjectWithKeys(value, keys) {
        this.isObject(value);
        const valueKeys = Object.keys(value);
        const result = keys.every((key) => { return valueKeys.indexOf(key) >= 0; });
        if (!result) {
            throw new NotAllKeysPresentError(value, keys);
        }
        return value;
    }

    /**
     * Check if value is instance if class
     * @param value to check
     * @param {String|Function} class_ expected
     * @returns {className} instance
     */
    isInstanceOf(value, class_) {
        let className = class_;
        if (typeof(className) === 'string') {
            className = class_;
        } else {
            className = class_.name;
        }
        if (
            value &&
            value.constructor &&
            value.constructor.name &&
            value.constructor.name.toLowerCase() === className.toLowerCase()
        ) {
            return value;
        }

        throw new TypeAssertionError(this._getType(value), className);
    }

    /**
     * Checks if value is function
     * @param {*} value to check
     * @throws {TypeAssertionError}
     * @return {Function}
     */
    isFunction(value) {
        const type = this._getType(value);
        if (['function', 'generatorfunction', 'asyncfunction'].indexOf(type) >= 0) {
            return value;
        }

        throw new TypeAssertionError(type, 'Function');
    }

    /**
     * Checks if value is Promise
     * @param {*} value to check
     * @throws {TypeAssertionError}
     * @return {Promise}
     */
    isPromise(value) {
        const type = this._getType(value);
        if (type === 'promise') {
            return value;
        }

        throw new TypeAssertionError(type, 'Promise');
    }
}
