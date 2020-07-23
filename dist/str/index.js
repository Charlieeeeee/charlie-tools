"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Str = void 0;
var Str = {
  qianfen: function qianfen(numStr) {
    return numStr.replace(/(?!^)(?=(\d{3})+$)/g, ',');
  },
  pascal: function pascal(str) {
    return str.replace(/[A-Z]/g, function (m) {
      return '_' + m.toLowerCase();
    }).replace('-', '_');
  },
  camel: function camel(str) {
    return str.replace(/_([a-z])/g, function (m, $1) {
      return $1.toUpperCase();
    }).replace(/-([a-z])/g, function (m, $1) {
      return $1.toUpperCase();
    });
  },
  keBab: function keBab(str) {
    return str.replace(/[A-Z]/g, function (m) {
      return '-' + m.toLowerCase();
    }).replace('_', '-');
  }
};
exports.Str = Str;