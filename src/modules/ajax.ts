const timeoutErrObj = {
  result: null,
  errorCode: 'timeout',
  errorMsg: '请求超时',
  success: false
}

type methodsUnion = 'get' | 'post' | 'GET' | 'POST'
interface IAjaxOptions {
  type: methodsUnion;
  url: string;
  data: { [K: string]: unknown };
  ContentType: 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data' | undefined;
  timeout: number
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
export default function ajax (options: IAjaxOptions) {
  return new Promise((resolve, reject) => {
    /**
     * type 请求方法类型
     * url 接口path
     * data 请求参数
     * ContentType POST请求头的数据格式
     * timeout 超时时间
     */
    let { type, url, data, ContentType, timeout } = options
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.timeout = timeout || 10000

    type = typeof type === 'string' ? (type.toUpperCase() as methodsUnion) : 'POST'

    xmlhttp.onreadystatechange = function () {
      try {
        if (xmlhttp.readyState === XMLHttpRequest.DONE) {
          // eslint-disable-next-line no-mixed-operators
          if (xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status === 304) {
            resolve(xmlhttp.response)
          // 引用对象里的函数，要加括号和括号里的参数，
          // 该函数的名字就是函数在对象中的名字
          } else {
            reject(Error('net work error'))
          }
        }
      } catch (err) {
        resolve(xmlhttp.response)
      }
    }
    xmlhttp.ontimeout = function () {
      resolve(JSON.stringify(timeoutErrObj))
    }

    if (type === 'GET') {
      const str = obj2str(data)
      xmlhttp.open(type, url + '?' + str, true)
      xmlhttp.send()
    }
    if (type === 'POST') {
      xmlhttp.open(type, url, true)
      ContentType = ContentType || 'application/json'
      xmlhttp.setRequestHeader('Content-Type', ContentType)
      let newData: Document | XMLHttpRequestBodyInit | null | undefined
      if (ContentType.includes('application/json')) {
        newData = JSON.stringify(data)
      }
      if (ContentType === 'application/x-www-form-urlencoded') {
        newData = obj2str(data)
      }
      if (ContentType === 'multipart/form-data') {
        newData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
          (newData as FormData).append(key, value as Blob)
        })
      }
      xmlhttp.send(newData)
    }
  })
}

function obj2str (obj) {
  const res:string[] = []
  for (const key in obj) {
    res.push(key + '=' + obj[key])
  }
  return res.join('&')
  // res.join("&")让数组的元素转换成一个字符串，用&分隔开
  // split是将字符串分割成数组
}
