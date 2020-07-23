"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeListener = exports.addListener = void 0;

/**
 * @param {AnyEventName} event event name
 * @param {function} fn event callback
 * @param {object} dom event dom
 * @param {ListenerOption} option option contain captrue, passive, once
 */
var addListener = function () {
  if (typeof window === 'undefined') return function () {};

  if (!window.addEventListener) {
    return function (event, fn, dom) {
      var eventDOM = dom || window;
      eventDOM.attachEvent("on" + event, fn);
    };
  }

  return function (event, fn, dom, _ref) {
    var _ref$capture = _ref.capture,
        capture = _ref$capture === void 0 ? false : _ref$capture,
        _ref$passive = _ref.passive,
        passive = _ref$passive === void 0 ? false : _ref$passive,
        _ref$once = _ref.once,
        once = _ref$once === void 0 ? false : _ref$once;
    var eventDOM = dom || window;
    eventDOM.addEventListener(event, fn, {
      capture: capture,
      passive: passive,
      once: once
    });
  };
}();
/**
 * @param {string} event event name
 * @param {function} fn event callback
 * @param {object} dom event dom
 * @param {boolean} useCapture bubble or capture
 */


exports.addListener = addListener;

var removeListener = function () {
  if (typeof window === 'undefined') return function () {};

  if (!window.removeEventListener) {
    return function (event, fn, dom) {
      var eventDOM = dom || window;
      eventDOM.detachEvent("on" + event, fn);
    };
  }

  return function (event, fn, dom) {
    var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var eventDOM = dom || window;
    eventDOM.removeEventListener(event, fn, useCapture);
  };
}();

exports.removeListener = removeListener;