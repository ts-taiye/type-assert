import { TypeAssertionError, NotAllKeysPresentError } from './exceptions';

export default class Assert {
    /**
     * Try to get real type of given value
     * @param {*} value to inspect type
     * @returns {String} type
     */
    _guessType(value) {
        return ({}).toString.call(value).match(/\s([^\]]+)/)[1].toLowerCase();
    }

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
     *
     * @param value to check
     * @param _class expected
     * @returns {className} instance
     */
    isInstanceOf(value, _class) {
        let className = _class;
        if (typeof(className) === 'string') {
            className = _class;
        } else {
            className = _class.name;
        }
        if (value && value.constructor && value.constructor.name.toLowerCase() === className.toLowerCase()) {
            return value;
        }

        throw new TypeAssertionError(this._getType(value), className);
    }
}
