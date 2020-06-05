'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getHash = exports.getHash = function getHash(len) {
    len = typeof len === 'number' && len <= 40 && len >= 0 ? len : 40;
    var str = 'qwe0r1t2y3u4i5o6p7a8s9dfghjklzxcvbnm';
    var hash = '';
    for (var i = 0; i < len; i++) {
        var randomNum = Math.floor(Math.random() * 36);
        hash = hash + str.charAt(randomNum);
    }
    return hash;
};