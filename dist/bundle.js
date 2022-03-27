(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.CharlieTools = factory());
})(this, (function () { 'use strict';

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
    var ct = {
        getQueryObject: getQueryObject
    };

    return ct;

}));
