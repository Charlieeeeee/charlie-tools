/**
 * @param {AnyEventName} event event name
 * @param {function} fn event callback
 * @param {object} dom event dom
 * @param {ListenerOption} option option contain captrue, passive, once
 */
export const addListener = (() => {
    if (typeof window === 'undefined')
        return () => { };
    if (!window.addEventListener) {
        return (event, fn, dom) => {
            var eventDOM = dom || window;
            eventDOM.attachEvent("on" + event, fn);
        };
    }
    return (event, fn, dom, option = { capture: false, passive: false, once:false}) => {
        var eventDOM = dom || window;
        eventDOM.addEventListener(event, fn, {
            capture,
            passive,
            once
        });
    };
})()

/**
 * @param {string} event event name
 * @param {function} fn event callback
 * @param {object} dom event dom
 * @param {boolean} useCapture bubble or capture
 */
export const removeListener = (() => {
    if (typeof window === 'undefined')
        return () => { };
    if (!window.removeEventListener) {
        return (event, fn, dom) => {
            var eventDOM = dom || window;
            eventDOM.detachEvent("on" + event, fn);
        };
    }
    return (event, fn, dom, useCapture) => {
        if (useCapture === void 0) { useCapture = false; }
        var eventDOM = dom || window;
        eventDOM.removeEventListener(event, fn, useCapture);
    };
})();