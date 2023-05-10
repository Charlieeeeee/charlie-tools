interface IJSON {
  [propName: string]: string | number
}
type Timer = null | NodeJS.Timeout
type AnyFn = (...params: unknown[]) => unknown

/**
 * 获取链接里的query object
 * @param {string} url
 * @returns {object}
 */
export const getQueryObject = (url: string):IJSON => {
  url = (url === null || url === undefined) ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  try {
    search.replace(reg, (rs: string, $1: string, $2: string) => {
      const name = $1
      const val = $2
      obj[name] = val
      return rs
    })
    return obj
  } catch (e) {
    return obj
  }
}

/**
 * 复制文案
 * @param {string} texts
 * @returns {Promise}
 */
export const copyTexts = (texts: string): Promise<void> => {
  const textArea = document.createElement('textarea')
  textArea.innerText = texts
  textArea.setAttribute('style', 'height: 0px;')
  document.body.appendChild(textArea)
  textArea.select()
  return new Promise((resolve, reject) => {
    if ('execCommand' in document) {
      document.execCommand('copy')
      document.body.removeChild(textArea)
      resolve()
    } else {
      reject()
    }
  })
}

/**
 * 格式化时间
 * @param {Date | string | number} date
 * @param {string} fmt
 * @returns
 */
export const formatTime = (date: Date | string | number, fmt: string): string => {
  if (date && typeof date === 'string') {
    date = date.replace(/-/g, '/') // 时间格式转换
    date = new Date(date)
  }
  if (date && typeof date === 'number') {
    date = new Date(date)
  } else if (!(date instanceof Date)) {
    date = new Date()
  }
  const year = date.getFullYear()
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  let tmpFmt = fmt
  if (/(y+)/.test(tmpFmt)) {
    tmpFmt = tmpFmt.replace(RegExp.$1, `${year}`.substr(4 - RegExp.$1.length))
  }
  const keys = Object.keys(o)
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i]
    if (new RegExp(`(${k})`).test(tmpFmt)) {
      const len = `${o[k]}`.length
      tmpFmt = tmpFmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(len))
    }
  }
  return tmpFmt
}

/**
 * 获取类型
 * @param val
 * @returns {string}
 */
export const getTypeOf = (val: unknown): string => {
  return Object.prototype.toString.call(val).match(/\[object (\w+)\]/)[1]
}

/**
 *  防抖
 * @param {function} fn
 * @param {number} timeout
 * @returns {function}
 */
export const debounce = (fn: AnyFn, timeout = 1000) => {
  let timer: Timer = null
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
      clearTimeout(timer as NodeJS.Timeout)
      timer = null
    }, timeout)
  }
}

/**
 * 节流
 * @param {function} fn
 * @param {number} timeout
 * @returns {function}
 */
export const throttle = (fn: AnyFn, timeout = 1000) => {
  let timer: Timer = null
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        fn()
        clearTimeout(timer as NodeJS.Timeout)
        timer = null
      }, timeout)
    }
  }
}

/**
 * 将十六进制颜色转换为具有RGB
 * @param { string } hex 十六进制颜色代码
 * @returns RGB 值的字符串
 */
export const hexToRgb = (hex: string): string => {
  const extendHex = (shortHex: string) =>
    '#' + shortHex.slice(shortHex.startsWith('#') ? 1 : 0).split('').map((x: string) => x + x).join('')
  const extendedHex = hex.slice(hex.startsWith('#') ? 1 : 0).length === 3 ? extendHex(hex) : hex
  return `rgb(${parseInt(extendedHex.slice(1), 16) >> 16}, ${(parseInt(extendedHex.slice(1), 16) & 0x00ff00) >> 8}, ${parseInt(extendedHex.slice(1), 16) & 0x0000ff})`
}

/**
 * 当页面可见性发生改变
 * @param { Function } cb
 */
export const onVisibilityChange = (cb: (isHidden: boolean) => unknown) => {
  const [hidden, visibilityChange] = 'hidden' in document
    ? ['hidden', 'visibilitychange']
    : 'webkitHidden' in document
      ? ['webkitHidden', 'webkitvisibilitychange']
      : 'msHidden' in document
        ? ['msHidden', 'msvisibilitychange']
        : ['hidden', 'visibilitychange']
  const callback = () => {
    cb(document[hidden]) // 传递isHidden：页面是否隐藏
  }
  if (typeof document[hidden] === 'undefined') {
    console.log('This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.')
  } else {
    // 处理页面可见属性的改变
    document.addEventListener(visibilityChange, callback, false)
  }
  // 返回一个可以取消监听的方法
  return () => {
    document.removeEventListener(visibilityChange, callback)
  }
}


// 获取浮点数去除小数点后得到的整数 例如 1.1 =>  11
// 以及去除小数点需要要乘以10的多少次幂 例如 1.1 => 1
const getNumMi = (fl: number) => {
  const arr = `${fl}`.split('.')
  const mi = arr[1] ? arr[1].length : 0
  return {
    int: +`${fl}`.replace('.', ''),
    mi
  }
}

// 获取两个浮点数的整数，和变成整数所需的10的多少次幂
const getTwoNumMi = (fl1: number, fl2: number) => {
  const nm1 = getNumMi(fl1)
  const nm2 = getNumMi(fl2)
  const num1 = nm1.int
  const num2 = nm2.int
  const mi1 = nm1.mi
  const mi2 = nm2.mi
  return {
    num1, mi1, num2, mi2
  }
}

// 加
const add = (fl1: number, fl2: number) => {
  let { num1, mi1, num2, mi2 } = getTwoNumMi(fl1, fl2)
  if (mi1 > mi2) {
    num2 = num2 * Math.pow(10, mi1 - mi2)
    return (num2 + num1) / Math.pow(10, mi1)
  } else {
    num1 = num1 * Math.pow(10, mi2 - mi1)
    return (num2 + num1) / Math.pow(10, mi2)
  }
}

// 减
const subtract = (fl1: number, fl2: number) => {
  let { num1, mi1, num2, mi2 } = getTwoNumMi(fl1, fl2)
  if (mi1 > mi2) {
    num2 = num2 * Math.pow(10, mi1 - mi2)
    return (num1 - num2) / Math.pow(10, mi1)
  } else {
    num1 = num1 * Math.pow(10, mi2 - mi1)
    return (num1 - num2) / Math.pow(10, mi2)
  }
}

// 乘
const multiply = (fl1: number, fl2: number) => {
  const { num1, mi1, num2, mi2 } = getTwoNumMi(fl1, fl2)
  return (num1 * num2) / Math.pow(10, mi1 + mi2)
}

// 除
const divide = (fl1: number, fl2: number) => {
  let { num1, mi1, num2, mi2 } = getTwoNumMi(fl1, fl2)
  if (mi1 > mi2) {
    num2 = num2 * Math.pow(10, mi1 - mi2)
  } else {
    num1 = num1 * Math.pow(10, mi2 - mi1)
  }
  return num1 / num2
}

export const cMath = {
  add, subtract, multiply, divide
}

export const linkMath = {
  res: 0,
  input (num: number) {
    this.res = num
    return this
  },
  add (num: number) {
    this.res = add(this.res, num)
    return this
  },
  subtract (num: number) {
    this.res = subtract(this.res, num)
    return this
  },
  multiply (num: number) {
    this.res = multiply(this.res, num)
    return this
  },
  divide (num: number) {
    this.res = divide(this.res, num)
    return this
  },
  getResult () {
    return this.res
  }
}

/**
 * 按照月利率获取贷款还款总额
 * @param param
 * @returns 还款总额
 */
export const getReturnMoney = ({
  loan, // 贷款总额
  months, // 贷款月数
  monthRate // 月利率
}) => {
  let leftMoney = loan // 剩余还款
  let interestSum = 0 // 利息
  const monthBack = leftMoney / months // 每月固定还款
  let monthInterest = 0 // 当月利息
  for (let i = months; i > 0; i--) {
    monthInterest = leftMoney * monthRate
    interestSum += monthInterest
    leftMoney = leftMoney - (monthInterest + monthBack)
  }
  return loan + interestSum
}


export { default as ajax } from './modules/ajax'

export function query2String(query) {
  return Object.entries(query)
    .map(([key, value]) => `&${key}=${value}`)
    .join('')
    .slice(1)
}

/**
 * 给链接拼接参数
 * 例如：传入 url: https://www.baidu.com?a=1, params: { b: 2 }
 * 返回：https://www.baidu.com?a=1&b=2
 * @param {*} url 原链接
 * @param {*} params 拼接的参数 { b: 2 }
 * @returns 一个添加好拼接参数的新链接 https://www.baidu.com?a=1&b=2
 */
export function concatUrlParam(url: string, params: { [K: string]: string | number }) {
  // 如果拼接参数链接里本来就有，就先删掉原本的参数
  const newKeys = Object.keys(params)
  url = newKeys.reduce(deleteUrlParam, url)

  const paramsStr = query2String(params)
  const hasHash = url.includes('#/')
  const hash = url.split('#/')[1]
  // 如果有hash就检查hash部分的有没有问号，如果没有hash就检查整个链接有没有问号
  const checkQuesPart = hasHash ? hash : url
  return `${url}${checkQuesPart.includes('?') ? '&' : '?'}${paramsStr}`
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export function excuteOnce(cb) {
  let count = 0
  return () => {
    if (count === 0) {
      count += 1
      cb()
    }
  }
}

// 移除链接上不需要的参数
export function deleteUrlParam(url, key) {
  // 如果不包括此参数
  if (!url || url.indexOf(key) == -1) return url
  let searchParams: IJSON = {}
  let hashParams: IJSON = {}
  const arr_url = url.split('?')
  const base = arr_url[0]
  const arr_Hash = url.split('/#/')
  const searchStr = arr_Hash[0].split('?')[1]
  const hashStr = arr_Hash[1]


  searchParams = getQueryObject(searchStr || '') // 获取search的参数
  delete searchParams[key]

  let hashPath = ''
  if (hashStr) {
    hashParams = getQueryObject(`#/${hashStr}`) // 获取hash的参数
    delete hashParams[key]
    hashPath = hashStr.split('?')[0]
  }
  const searchQueryStr = query2String(searchParams)

  const hashQueryStr = query2String(hashParams)
  return `${base}${searchQueryStr ? `?${searchQueryStr}` : ''}${hashStr ? `/#/${hashPath}${hashQueryStr ? `?${hashQueryStr}` : ''}` : ''}`
}

export class EventBus {
  events = {}
  on(eventName: string, cb: AnyFn) {
    const eventArr = this.events[eventName] || (this.events[eventName] = [])
    eventArr.push(cb)
  }

  off(eventName: string, cb: AnyFn) {
    if (!eventName) {
      this.events = {}
      return
    }
    const eventArr = this.events[eventName]
    if (Array.isArray(eventArr)) {
      if (cb) {
        eventArr.splice(eventArr.indexOf(cb), 1)
      } else {
        this.events[eventName] = null
      }
    }
  }

  emit(eventName: string, params: unknown, context = this) {
    const eventArr = this.events[eventName] || []
    eventArr.forEach((cb) => cb.call(context, params))
  }
}

export const eventBus = new EventBus()
