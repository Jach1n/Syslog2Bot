'use strict';

var lodashUnified = require('lodash-unified');
var shared = require('@vue/shared');

const unique = (arr) => [...new Set(arr)];
const extractFirst = (arr) => {
  return shared.isArray(arr) ? arr[0] : arr;
};
const castArray = (arr) => {
  if (!arr && arr !== 0) return [];
  return shared.isArray(arr) ? arr : [arr];
};

Object.defineProperty(exports, "ensureArray", {
  enumerable: true,
  get: function () { return lodashUnified.castArray; }
});
exports.castArray = castArray;
exports.extractFirst = extractFirst;
exports.unique = unique;
//# sourceMappingURL=arrays.js.map
