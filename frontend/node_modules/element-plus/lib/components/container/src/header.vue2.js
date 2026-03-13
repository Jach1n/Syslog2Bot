'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElHeader"
  },
  __name: "header",
  props: {
    height: { type: [String, null], required: false, default: null }
  },
  setup(__props) {
    const props = __props;
    const ns = index.useNamespace("header");
    const style = vue.computed(() => {
      return props.height ? ns.cssVarBlock({
        height: props.height
      }) : {};
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "header",
        {
          class: vue.normalizeClass(vue.unref(ns).b()),
          style: vue.normalizeStyle(style.value)
        },
        [
          vue.renderSlot(_ctx.$slots, "default")
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=header.vue2.js.map
