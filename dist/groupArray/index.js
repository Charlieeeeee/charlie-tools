"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupArray = void 0;

var groupArray = function groupArray(arr, len) {
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

exports.groupArray = groupArray;