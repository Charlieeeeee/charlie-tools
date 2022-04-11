/**
 * 获取链接里的query object
 * @param {string} url
 * @returns {object}
 */
var getQueryObject = function (url) {
    url = (url === null || url === undefined) ? window.location.href : url;
    var search = url.substring(url.lastIndexOf('?') + 1);
    var obj = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;
    try {
        search.replace(reg, function (rs, $1, $2) {
            var name = $1;
            var val = $2;
            obj[name] = val;
            return rs;
        });
        return obj;
    }
    catch (e) {
        return obj;
    }
};
/**
 * 复制文案
 * @param {string} texts
 * @returns {Promise}
 */
var copyTexts = function (texts) {
    var textArea = document.createElement('textarea');
    textArea.innerText = texts;
    textArea.setAttribute('style', 'height: 0px;');
    document.body.appendChild(textArea);
    textArea.select();
    return new Promise(function (resolve, reject) {
        if ('execCommand' in document) {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            resolve();
        }
        else {
            reject();
        }
    });
};
/**
 * 格式化时间
 * @param {Date | string | number} date
 * @param {string} fmt
 * @returns
 */
var formatTime = function (date, fmt) {
    if (date && typeof date === 'string') {
        date = date.replace(/-/g, '/'); // 时间格式转换
        date = new Date(date);
    }
    if (date && typeof date === 'number') {
        date = new Date(date);
    }
    else if (!(date instanceof Date)) {
        date = new Date();
    }
    var year = date.getFullYear();
    var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds() // 毫秒
    };
    var tmpFmt = fmt;
    if (/(y+)/.test(tmpFmt)) {
        tmpFmt = tmpFmt.replace(RegExp.$1, "".concat(year).substr(4 - RegExp.$1.length));
    }
    var keys = Object.keys(o);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (new RegExp("(".concat(k, ")")).test(tmpFmt)) {
            var len = "".concat(o[k]).length;
            tmpFmt = tmpFmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : "00".concat(o[k]).substr(len));
        }
    }
    return tmpFmt;
};
/**
 *
 * @param val
 * @returns {string}
 */
var getTypeOf = function (val) {
    return Object.prototype.toString.call(val).match(/\[object (\w+)\]/)[1];
};
/**
 *  防抖
 * @param {function} fn
 * @param {number} timeout
 * @returns {function}
 */
var debounce = function (fn, timeout) {
    if (timeout === void 0) { timeout = 1000; }
    var timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            fn();
            clearTimeout(timer);
            timer = null;
        }, timeout);
    };
};
/**
 * 节流
 * @param {function} fn
 * @param {number} timeout
 * @returns {function}
 */
var throttle = function (fn, timeout) {
    if (timeout === void 0) { timeout = 1000; }
    var timer = null;
    return function () {
        if (!timer) {
            timer = setTimeout(function () {
                fn();
                clearTimeout(timer);
                timer = null;
            }, timeout);
        }
    };
};

export { copyTexts, debounce, formatTime, getQueryObject, getTypeOf, throttle };
