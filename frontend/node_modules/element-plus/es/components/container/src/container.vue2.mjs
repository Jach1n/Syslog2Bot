import { defineComponent, useSlots, computed, createElementBlock, openBlock, normalizeClass, unref, renderSlot } from 'vue';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElContainer"
  },
  __name: "container",
  props: {
    direction: { type: String, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const ns = useNamespace("container");
    const isVertical = computed(() => {
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
      return openBlock(), createElementBlock(
        "section",
        {
          class: normalizeClass([unref(ns).b(), unref(ns).is("vertical", isVertical.value)])
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=container.vue2.mjs.map
