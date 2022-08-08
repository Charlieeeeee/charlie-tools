interface IAnyStringValObj { // 任意值为字符串的对象
  [propName: string]: string
}
type Timer = null | NodeJS.Timeout
type AnyFn = (...params: unknown[]) => unknown

/**
 * 获取链接里的query object
 * @param {string} url
 * @returns {object}
 */
export const getQueryObject = (url: string):IAnyStringValObj => {
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
      clearTimeout(timer)
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
        clearTimeout(timer)
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
  const extendHex = shortHex =>
    '#' + shortHex.slice(shortHex.startsWith('#') ? 1 : 0).split('').map(x => x + x).join('')
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
    return num1 / num2
  } else {
    num1 = num1 * Math.pow(10, mi2 - mi1)
    return num1 / num2
  }
}

export const cMath = {
  add, subtract, multiply, divide
}

export const linkMath = {
  res: 0,
  input (num) {
    this.res = num
    return this
  },
  add (num) {
    this.res = add(this.res, num)
    return this
  },
  subtract (num) {
    this.res = subtract(this.res, num)
    return this
  },
  multiply (num) {
    this.res = multiply(this.res, num)
    return this
  },
  divide (num) {
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
