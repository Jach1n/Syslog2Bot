import { defineComponent, computed, createElementBlock, openBlock, normalizeStyle, normalizeClass, unref, renderSlot } from 'vue';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElAside"
  },
  __name: "aside",
  props: {
    width: { type: [String, null], required: false, default: null }
  },
  setup(__props) {
    const props = __props;
    const ns = useNamespace("aside");
    const style = computed(
      () => props.width ? ns.cssVarBlock({ width: props.width }) : {}
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "aside",
        {
          class: normalizeClass(unref(ns).b()),
          style: normalizeStyle(style.value)
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=aside.vue2.mjs.map
