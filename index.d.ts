// Type definitions for type-assert
// Project: type-assert
// Definitions by: Vadim (Taiye) Tsander

declare class Assert {
    constructor();
    isNumber(value: any): number;
    isBoolean(value: any): boolean;
    isArray(value: any): Array<any>;
    isNull(value: any): null;
    isString(value: any): string;
    isFunction(value: any): Function;
    // isObject(value: any): Map<any, any>;
    isInstanceOf<T>(value: T, class_: new () => T): T
}

declare const assert: Assert;
export default assert;
