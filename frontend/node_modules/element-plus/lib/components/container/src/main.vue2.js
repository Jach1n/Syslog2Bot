'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElMain"
  },
  __name: "main",
  setup(__props) {
    const ns = index.useNamespace("main");
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "main",
        {
          class: vue.normalizeClass(vue.unref(ns).b())
        },
        [
          vue.renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=main.vue2.js.map
