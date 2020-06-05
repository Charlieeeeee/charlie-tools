"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var groupArray = exports.groupArray = function groupArray(arr, len) {
    var array = [];
    arr.forEach(function (it, ind) {
        var index = Math.floor(ind / len);
        if (ind % len === 0) {
            array[index] = [];
        }
        array[index].push(it);
    });
    return array;
};