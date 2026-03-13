import { iconProps } from './icon.mjs';
import { defineComponent, computed, createElementBlock, openBlock, mergeProps, unref, renderSlot } from 'vue';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { addUnit } from '../../../utils/dom/style.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElIcon",
    inheritAttrs: false
  },
  __name: "icon",
  props: iconProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("icon");
    const style = computed(() => {
      const { size, color } = props;
      const fontSize = addUnit(size);
      if (!fontSize && !color) return {};
      return {
        fontSize,
        "--color": color
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "i",
        mergeProps({
          class: unref(ns).b(),
          style: style.value
        }, _ctx.$attrs),
        [
          renderSlot(_ctx.$slots, "default")
        ],
        16
        /* FULL_PROPS */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=icon.vue2.mjs.map
