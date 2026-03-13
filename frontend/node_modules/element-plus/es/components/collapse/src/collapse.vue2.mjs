import { collapseEmits, collapseProps } from './collapse.mjs';
import { defineComponent, createElementBlock, openBlock, normalizeClass, unref, renderSlot } from 'vue';
import { useCollapse, useCollapseDOM } from './use-collapse.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElCollapse"
  },
  __name: "collapse",
  props: collapseProps,
  emits: collapseEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { activeNames, setActiveNames } = useCollapse(props, emit);
    const { rootKls } = useCollapseDOM(props);
    __expose({
      /** @description active names */
      activeNames,
      /** @description set active names */
      setActiveNames
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(rootKls))
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
//# sourceMappingURL=collapse.vue2.mjs.map
