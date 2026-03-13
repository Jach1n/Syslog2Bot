import { dividerProps } from './divider.mjs';
import { defineComponent, computed, createElementBlock, openBlock, normalizeStyle, normalizeClass, unref, createCommentVNode, renderSlot } from 'vue';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElDivider"
  },
  __name: "divider",
  props: dividerProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("divider");
    const dividerStyle = computed(() => {
      return ns.cssVar({
        "border-style": props.borderStyle
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([unref(ns).b(), unref(ns).m(__props.direction)]),
          style: normalizeStyle(dividerStyle.value),
          role: "separator"
        },
        [
          _ctx.$slots.default && __props.direction !== "vertical" ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass([unref(ns).e("text"), unref(ns).is(__props.contentPosition)])
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=divider.vue2.mjs.map
