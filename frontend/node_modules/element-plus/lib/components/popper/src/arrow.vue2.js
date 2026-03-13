'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var constants = require('./constants.js');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElPopperArrow",
    inheritAttrs: false
  },
  __name: "arrow",
  setup(__props, { expose: __expose }) {
    const ns = index.useNamespace("popper");
    const { arrowRef, arrowStyle } = vue.inject(
      constants.POPPER_CONTENT_INJECTION_KEY,
      void 0
    );
    vue.onBeforeUnmount(() => {
      arrowRef.value = void 0;
    });
    __expose({
      /**
       * @description Arrow element
       */
      arrowRef
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "span",
        {
          ref_key: "arrowRef",
          ref: arrowRef,
          class: vue.normalizeClass(vue.unref(ns).e("arrow")),
          style: vue.normalizeStyle(vue.unref(arrowStyle)),
          "data-popper-arrow": ""
        },
        null,
        6
        /* CLASS, STYLE */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=arrow.vue2.js.map
