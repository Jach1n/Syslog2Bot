import { defineComponent, computed, createElementBlock, openBlock, normalizeStyle, normalizeClass, unref, renderSlot } from 'vue';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElHeader"
  },
  __name: "header",
  props: {
    height: { type: [String, null], required: false, default: null }
  },
  setup(__props) {
    const props = __props;
    const ns = useNamespace("header");
    const style = computed(() => {
      return props.height ? ns.cssVarBlock({
        height: props.height
      }) : {};
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "header",
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
//# sourceMappingURL=header.vue2.mjs.map
