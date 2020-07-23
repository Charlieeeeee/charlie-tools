"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toSmaller = exports.toBigger = void 0;

//排序
//确保每个位置都是从它开始往后的里面是最小的(或最大的)，则完成排序
//从开头开始，把每个位置的数字和后面的每一项进行比较，比它小则换个位置。
//从开头开始，把每个位置的数字和后面的每一项进行比较，比它大则换个位置。

/**
 *
 * @param {Array<number>} arr
 * @param {'toBigger' | 'toSmaller'} type
 */
var sort = function sort(type) {
  return function (arr) {
    var len = arr.length;

    for (var i = 0; i < len; i++) {
      for (var j = i + 1; j < len; j++) {
        var canSwitch = type === 'toBigger' && arr[i] > arr[j] || type === 'toSmaller' && arr[i] < arr[j];

        if (canSwitch) {
          var temp = void 0;
          temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    }

    return arr;
  };
};

var toBigger = sort('toBigger');
exports.toBigger = toBigger;
var toSmaller = sort('toSmaller');
exports.toSmaller = toSmaller;