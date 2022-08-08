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
/**
 * 将十六进制颜色转换为具有RGB
 * @param { string } hex 十六进制颜色代码
 * @returns RGB 值的字符串
 */
export declare const hexToRgb: (hex: string) => string;
/**
 * 当页面可见性发生改变
 * @param { Function } cb
 */
export declare const onVisibilityChange: (cb: (isHidden: boolean) => unknown) => () => void;
export declare const cMath: {
    add: (fl1: number, fl2: number) => number;
    subtract: (fl1: number, fl2: number) => number;
    multiply: (fl1: number, fl2: number) => number;
    divide: (fl1: number, fl2: number) => number;
};
export declare const linkMath: {
    res: number;
    input(num: any): any;
    add(num: any): any;
    subtract(num: any): any;
    multiply(num: any): any;
    divide(num: any): any;
    getResult(): any;
};
/**
 * 按照月利率获取贷款还款总额
 * @param param
 * @returns 还款总额
 */
export declare const getReturnMoney: ({ loan, months, monthRate }: {
    loan: any;
    months: any;
    monthRate: any;
}) => any;
export {};
