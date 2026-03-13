'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElContainer"
  },
  __name: "container",
  props: {
    direction: { type: String, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = vue.useSlots();
    const ns = index.useNamespace("container");
    const isVertical = vue.computed(() => {
      if (props.direction === "vertical") {
        return true;
      } else if (props.direction === "horizontal") {
        return false;
      }
      if (slots && slots.default) {
        const vNodes = slots.default();
        return vNodes.some((vNode) => {
          const tag = vNode.type.name;
          return tag === "ElHeader" || tag === "ElFooter";
        });
      } else {
        return false;
      }
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "section",
        {
          class: vue.normalizeClass([vue.unref(ns).b(), vue.unref(ns).is("vertical", isVertical.value)])
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
//# sourceMappingURL=container.vue2.js.map
