'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var divider = require('./divider.js');
var vue = require('vue');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElDivider"
  },
  __name: "divider",
  props: divider.dividerProps,
  setup(__props) {
    const props = __props;
    const ns = index.useNamespace("divider");
    const dividerStyle = vue.computed(() => {
      return ns.cssVar({
        "border-style": props.borderStyle
      });
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass([vue.unref(ns).b(), vue.unref(ns).m(__props.direction)]),
          style: vue.normalizeStyle(dividerStyle.value),
          role: "separator"
        },
        [
          _ctx.$slots.default && __props.direction !== "vertical" ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass([vue.unref(ns).e("text"), vue.unref(ns).is(__props.contentPosition)])
            },
            [
              vue.renderSlot(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=divider.vue2.js.map
