import { TypeAssertionError, NotAllKeysPresentError } from './exceptions';

export default class Assert {
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

    isBoolean(value) {
        if (typeof(value) === 'boolean') {
            return value;
        }

        throw new TypeAssertionError(this._getType(value), 'Boolean');
    }

    isString(value) {
        if (typeof(value) === 'string') {
            return value;
        }

        throw new TypeAssertionError(this._getType(value), 'String');
    }

    isNumber(value) {
        if (typeof(value) === 'number') {
            return value;
        }

        throw new TypeAssertionError(this._getType(value), 'Number');
    }

    isArray(value) {
        if (Array.isArray(value) === true) {
            return value;
        }

        throw new TypeAssertionError(this._getType(value), 'Array');
    }

    isNull(value) {
        if (value === null) {
            return value;
        }

        throw new TypeAssertionError(this._getType(value), 'Null');
    }

    isObject(value) {
        if (value && value.constructor && value.constructor.name.toLowerCase() === 'object') {
            return value;
        }

        throw new TypeAssertionError(this._getType(value), 'Object');
    }

    isObjectWithKeys(value, keys) {
        this.isObject(value);
        const valueKeys = Object.keys(value);
        const result = keys.every((key) => { return valueKeys.indexOf(key) >= 0; });
        if (!result) {
            throw new NotAllKeysPresentError(value, keys);
        }
        return value;
    }

    isInstanceOf(class_, value) {
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

    isFunction(value) {
        const type = this._getType(value);
        if (['function', 'generatorfunction', 'asyncfunction'].indexOf(type) >= 0) {
            return value;
        }

        throw new TypeAssertionError(type, 'Function');
    }

    isPromise(value) {
        const type = this._getType(value);
        if (type === 'promise') {
            return value;
        }

        throw new TypeAssertionError(type, 'Promise');
    }
}
