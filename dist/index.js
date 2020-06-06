'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cookie = require('./cookie');

Object.defineProperty(exports, 'cookie', {
    enumerable: true,
    get: function get() {
        return _cookie.cookie;
    }
});

var _listener = require('./listener');

Object.defineProperty(exports, 'addListener', {
    enumerable: true,
    get: function get() {
        return _listener.addListener;
    }
});
Object.defineProperty(exports, 'removeListener', {
    enumerable: true,
    get: function get() {
        return _listener.removeListener;
    }
});

var _copy = require('./copy');

Object.defineProperty(exports, 'copy', {
    enumerable: true,
    get: function get() {
        return _copy.copy;
    }
});

var _timeFormat = require('./timeFormat');

Object.defineProperty(exports, 'timeFormat', {
    enumerable: true,
    get: function get() {
        return _timeFormat.timeFormat;
    }
});

var _groupArray = require('./groupArray');

Object.defineProperty(exports, 'groupArray', {
    enumerable: true,
    get: function get() {
        return _groupArray.groupArray;
    }
});

var _getHash = require('./getHash');

Object.defineProperty(exports, 'getHash', {
    enumerable: true,
    get: function get() {
        return _getHash.getHash;
    }
});

var _sort = require('./sort');

Object.defineProperty(exports, 'toBigger', {
    enumerable: true,
    get: function get() {
        return _sort.toBigger;
    }
});
Object.defineProperty(exports, 'toSmaller', {
    enumerable: true,
    get: function get() {
        return _sort.toSmaller;
    }
});
var qianfen = exports.qianfen = function qianfen(numStr) {
    return numStr.replace(/(?!^)(?=(\d{3})+$)/g, ',');
};