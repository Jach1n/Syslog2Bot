'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var icon = require('./icon.js');
var vue = require('vue');
var index = require('../../../hooks/use-namespace/index.js');
var style = require('../../../utils/dom/style.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElIcon",
    inheritAttrs: false
  },
  __name: "icon",
  props: icon.iconProps,
  setup(__props) {
    const props = __props;
    const ns = index.useNamespace("icon");
    const style$1 = vue.computed(() => {
      const { size, color } = props;
      const fontSize = style.addUnit(size);
      if (!fontSize && !color) return {};
      return {
        fontSize,
        "--color": color
      };
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "i",
        vue.mergeProps({
          class: vue.unref(ns).b(),
          style: style$1.value
        }, _ctx.$attrs),
        [
          vue.renderSlot(_ctx.$slots, "default")
        ],
        16
        /* FULL_PROPS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=icon.vue2.js.map
