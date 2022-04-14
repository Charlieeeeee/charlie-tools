interface IAnyStringValObj {
    [propName: string]: string;
}
declare type AnyFn = (...params: unknown[]) => unknown;
/**
 * 获取链接里的query object
 * @param {string} url
 * @returns {object}
 */
export declare const getQueryObject: (url: string) => IAnyStringValObj;
/**
 * 复制文案
 * @param {string} texts
 * @returns {Promise}
 */
export declare const copyTexts: (texts: string) => Promise<void>;
/**
 * 格式化时间
 * @param {Date | string | number} date
 * @param {string} fmt
 * @returns
 */
export declare const formatTime: (date: Date | string | number, fmt: string) => string;
/**
 * 获取类型
 * @param val
 * @returns {string}
 */
export declare const getTypeOf: (val: unknown) => string;
/**
 *  防抖
 * @param {function} fn
 * @param {number} timeout
 * @returns {function}
 */
export declare const debounce: (fn: AnyFn, timeout?: number) => () => void;
/**
 * 节流
 * @param {function} fn
 * @param {number} timeout
 * @returns {function}
 */
export declare const throttle: (fn: AnyFn, timeout?: number) => () => void;
export {};
