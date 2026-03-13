import { defineComponent, computed, createElementBlock, openBlock, normalizeStyle, normalizeClass, unref, renderSlot } from 'vue';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElFooter"
  },
  __name: "footer",
  props: {
    height: { type: [String, null], required: false, default: null }
  },
  setup(__props) {
    const props = __props;
    const ns = useNamespace("footer");
    const style = computed(
      () => props.height ? ns.cssVarBlock({ height: props.height }) : {}
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "footer",
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
//# sourceMappingURL=footer.vue2.mjs.map
