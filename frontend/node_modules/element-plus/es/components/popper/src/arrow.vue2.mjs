import { defineComponent, inject, onBeforeUnmount, createElementBlock, openBlock, normalizeStyle, normalizeClass, unref } from 'vue';
import { POPPER_CONTENT_INJECTION_KEY } from './constants.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElPopperArrow",
    inheritAttrs: false
  },
  __name: "arrow",
  setup(__props, { expose: __expose }) {
    const ns = useNamespace("popper");
    const { arrowRef, arrowStyle } = inject(
      POPPER_CONTENT_INJECTION_KEY,
      void 0
    );
    onBeforeUnmount(() => {
      arrowRef.value = void 0;
    });
    __expose({
      /**
       * @description Arrow element
       */
      arrowRef
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "span",
        {
          ref_key: "arrowRef",
          ref: arrowRef,
          class: normalizeClass(unref(ns).e("arrow")),
          style: normalizeStyle(unref(arrowStyle)),
          "data-popper-arrow": ""
        },
        null,
        6
        /* CLASS, STYLE */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=arrow.vue2.mjs.map
