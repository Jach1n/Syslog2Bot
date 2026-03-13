import { buttonGroupProps } from './button-group.mjs';
import { defineComponent, provide, reactive, toRef, createElementBlock, openBlock, normalizeClass, unref, renderSlot } from 'vue';
import { buttonGroupContextKey } from './constants.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElButtonGroup"
  },
  __name: "button-group",
  props: buttonGroupProps,
  setup(__props) {
    const props = __props;
    provide(
      buttonGroupContextKey,
      reactive({
        size: toRef(props, "size"),
        type: toRef(props, "type")
      })
    );
    const ns = useNamespace("button");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([unref(ns).b("group"), unref(ns).bm("group", props.direction)])
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
//# sourceMappingURL=button-group.vue2.mjs.map
