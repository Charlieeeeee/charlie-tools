'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @param {AnyEventName} event event name
 * @param {function} fn event callback
 * @param {object} dom event dom
 * @param {ListenerOption} option option contain captrue, passive, once
 */
var addListener = exports.addListener = function () {
    if (typeof window === 'undefined') return function () {};
    if (!window.addEventListener) {
        return function (event, fn, dom) {
            var eventDOM = dom || window;
            eventDOM.attachEvent("on" + event, fn);
        };
    }
    return function (event, fn, dom, _ref) {
        var _ref$capture = _ref.capture,
            capture = _ref$capture === undefined ? false : _ref$capture,
            _ref$passive = _ref.passive,
            passive = _ref$passive === undefined ? false : _ref$passive,
            _ref$once = _ref.once,
            once = _ref$once === undefined ? false : _ref$once;

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
var removeListener = exports.removeListener = function () {
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