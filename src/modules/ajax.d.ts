declare type methodsUnion = 'get' | 'post' | 'GET' | 'POST';
interface IAjaxOptions {
    type: methodsUnion;
    url: string;
    data: {
        [K: string]: unknown;
    };
    ContentType: 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data' | undefined;
    timeout: number;
}
/**
 *
 * @param options {
*   type 请求方法类型
*   url 接口path
*   data 请求参数
*   ContentType POST请求头的数据格式
*   timeout 超时时间
 * }
 * @return Promise<XMLHttpRequest.response>
 */
export default function ajax(options: IAjaxOptions): Promise<unknown>;
export {};
