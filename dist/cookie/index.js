'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var cookie = exports.cookie = {
  set: function set(key, val, _ref) {
    var _ref$domain = _ref.domain,
        domain = _ref$domain === undefined ? '' : _ref$domain,
        _ref$path = _ref.path,
        path = _ref$path === undefined ? '/' : _ref$path,
        _ref$expires = _ref.expires,
        expires = _ref$expires === undefined ? 0 : _ref$expires,
        _ref$secure = _ref.secure,
        secure = _ref$secure === undefined ? false : _ref$secure;

    var res = void 0;
    try {
      var ts = void 0;
      if (expires >= 0) {
        ts = new Date();
        ts.setTime(ts.getTime() + expires * 1000);
      }
      document.cookie = key + '=' + val + ';' + (domain ? 'domain=' + domain + ';' : '') + (path ? 'path=' + path + ';' : '') + (expires ? 'expires=' + (ts ? ts.toUTCString() : '') + ';' : '') + (secure ? 'secure' : '');
      res = true;
    } catch (err) {
      res = false;
    }

    return res;
  },
  get: function get(key) {
    var reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
    var cookArr = document.cookie.match(reg);
    if (cookArr && cookArr[2]) {
      return decodeURI(cookArr[2]);
    }

    return null;
  },
  delete: function _delete(key) {
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
    var res = this.get(key);
    return !res;
  },
  clear: function clear() {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--;) {
        document.cookie = keys[i] + "=0; expire=" + date.toGMTString() + "; path=/";
      }
    }
  }
};