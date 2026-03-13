import { defineComponent, createElementBlock, openBlock, normalizeClass, unref, renderSlot } from 'vue';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElMain"
  },
  __name: "main",
  setup(__props) {
    const ns = useNamespace("main");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "main",
        {
          class: normalizeClass(unref(ns).b())
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
//# sourceMappingURL=main.vue2.mjs.map
