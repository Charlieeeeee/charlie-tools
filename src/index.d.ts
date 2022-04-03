interface IAnyObj {
    [propName: string]: string;
}
export declare const getQueryObject: (url: string) => IAnyObj
export declare const copyTexts: (texts: string) => Promise<void>
export declare const formatTime: (date: Date | string | number, fmt: string) => string
declare const ct: {
    getQueryObject: (url: string) => IAnyObj;
    copyTexts: (texts: string) => Promise<void>;
    formatTime: (date: Date | string | number, fmt: string) => string;
}
export default ct
