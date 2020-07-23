"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeFormat = void 0;

/**
 * @param {string} pattern
 * @param {Date} time
 * @return {string}
 */
var timeFormat = function timeFormat(pattern, time) {
  var opts = {
    "Y+": time.getFullYear(),
    "M+": time.getMonth() + 1,
    "D+": time.getDate(),
    "h+": time.getHours(),
    "m+": time.getMinutes(),
    "s+": time.getSeconds()
  };

  var _loop = function _loop(key) {
    var reg = new RegExp(key, 'g');
    pattern = pattern.replace(reg, function (m) {
      var timeStr = opts[key] < 10 ? "".concat(opts[key]).padStart(2, '0') : "".concat(opts[key]);
      return timeStr.slice(-m.length);
    });
  };

  for (var key in opts) {
    _loop(key);
  }

  return pattern;
};

exports.timeFormat = timeFormat;