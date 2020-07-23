"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cookie = void 0;
var cookie = {
  set: function set(key, val, _ref) {
    var _ref$domain = _ref.domain,
        domain = _ref$domain === void 0 ? '' : _ref$domain,
        _ref$path = _ref.path,
        path = _ref$path === void 0 ? '/' : _ref$path,
        _ref$expires = _ref.expires,
        expires = _ref$expires === void 0 ? 0 : _ref$expires,
        _ref$secure = _ref.secure,
        secure = _ref$secure === void 0 ? false : _ref$secure;
    var res;

    try {
      var ts;

      if (expires >= 0) {
        ts = new Date();
        ts.setTime(ts.getTime() + expires * 1000);
      }

      document.cookie = "".concat(key, "=").concat(val, ";").concat(domain ? "domain=".concat(domain, ";") : '').concat(path ? "path=".concat(path, ";") : '').concat(expires ? "expires=".concat(ts ? ts.toUTCString() : '', ";") : '').concat(secure ? 'secure' : '');
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
  "delete": function _delete(key) {
    document.cookie = "".concat(key, "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;");
    document.cookie = "".concat(key, "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/");
    var res = this.get(key);
    return !res;
  },
  clear: function clear() {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);

    if (keys) {
      for (var i = keys.length; i--;) {
        document.cookie = "".concat(keys[i], "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;");
      }

      document.cookie = "".concat(keys[i], "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/");
    }
  }
};
exports.cookie = cookie;