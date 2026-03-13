'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElAside"
  },
  __name: "aside",
  props: {
    width: { type: [String, null], required: false, default: null }
  },
  setup(__props) {
    const props = __props;
    const ns = index.useNamespace("aside");
    const style = vue.computed(
      () => props.width ? ns.cssVarBlock({ width: props.width }) : {}
    );
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "aside",
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
//# sourceMappingURL=aside.vue2.js.map
