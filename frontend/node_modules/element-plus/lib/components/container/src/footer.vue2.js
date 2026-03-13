'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElFooter"
  },
  __name: "footer",
  props: {
    height: { type: [String, null], required: false, default: null }
  },
  setup(__props) {
    const props = __props;
    const ns = index.useNamespace("footer");
    const style = vue.computed(
      () => props.height ? ns.cssVarBlock({ height: props.height }) : {}
    );
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "footer",
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
//# sourceMappingURL=footer.vue2.js.map
