'use strict';

var vue = require('vue');
var lodashUnified = require('lodash-unified');
var memoOne = require('memoize-one');

const useCache = () => {
  const vm = vue.getCurrentInstance();
  const props = vm.proxy.$props;
  return vue.computed(() => {
    const _getItemStyleCache = (_, __, ___) => ({});
    return props.perfMode ? lodashUnified.memoize(_getItemStyleCache) : memoOne(_getItemStyleCache);
  });
};

exports.useCache = useCache;
//# sourceMappingURL=use-cache.js.map
