'use strict'
exports.__esModule = true
var timeoutErrObj = {
  result: null,
  errorCode: 'timeout',
  errorMsg: '请求超时',
  success: false
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
function ajax(options) {
  return new Promise(function (resolve, reject) {
    /**
         * type 请求方法类型
         * url 接口path
         * data 请求参数
         * ContentType POST请求头的数据格式
         * timeout 超时时间
         */
    var type = options.type, url = options.url, data = options.data, ContentType = options.ContentType, timeout = options.timeout
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.timeout = timeout || 10000
    type = typeof type === 'string' ? type.toUpperCase() : 'POST'
    xmlhttp.onreadystatechange = function () {
      try {
        if (xmlhttp.readyState === XMLHttpRequest.DONE) {
          // eslint-disable-next-line no-mixed-operators
          if (xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status === 304) {
            resolve(xmlhttp.response)
            // 引用对象里的函数，要加括号和括号里的参数，
            // 该函数的名字就是函数在对象中的名字
          }
          else {
            reject(Error('net work error'))
          }
        }
      }
      catch (err) {
        resolve(xmlhttp.response)
      }
    }
    xmlhttp.ontimeout = function () {
      resolve(JSON.stringify(timeoutErrObj))
    }
    if (type === 'GET') {
      var str = obj2str(data)
      xmlhttp.open(type, url + '?' + str, true)
      xmlhttp.send()
    }
    if (type === 'POST') {
      xmlhttp.open(type, url, true)
      ContentType = ContentType || 'application/json'
      xmlhttp.setRequestHeader('Content-Type', ContentType)
      var newData_1
      if (ContentType.includes('application/json')) {
        newData_1 = JSON.stringify(data)
      }
      if (ContentType === 'application/x-www-form-urlencoded') {
        newData_1 = obj2str(data)
      }
      if (ContentType === 'multipart/form-data') {
        newData_1 = new FormData()
        Object.entries(data).forEach(function (_a) {
          var key = _a[0], value = _a[1]
          newData_1.append(key, value)
        })
      }
      xmlhttp.send(newData_1)
    }
  })
}
exports['default'] = ajax
function obj2str(obj) {
  var res = []
  for (var key in obj) {
    res.push(key + '=' + obj[key])
  }
  return res.join('&')
  // res.join("&")让数组的元素转换成一个字符串，用&分隔开
  // split是将字符串分割成数组
}
