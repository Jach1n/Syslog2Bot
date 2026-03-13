'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = vue.defineComponent({
  props: {
    item: {
      type: Object,
      required: true
    },
    style: {
      type: Object
    },
    height: Number
  },
  setup() {
    const ns = index.useNamespace("select");
    return {
      ns
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=group-item.vue2.js.map
