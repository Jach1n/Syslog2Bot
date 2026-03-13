import { checkTagEmits, checkTagProps } from './check-tag.mjs';
import { defineComponent, computed, createElementBlock, openBlock, normalizeClass, renderSlot } from 'vue';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { CHANGE_EVENT } from '../../../constants/event.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElCheckTag"
  },
  __name: "check-tag",
  props: checkTagProps,
  emits: checkTagEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("check-tag");
    const containerKls = computed(() => [
      ns.b(),
      ns.is("checked", props.checked),
      ns.is("disabled", props.disabled),
      ns.m(props.type || "primary")
    ]);
    const handleChange = () => {
      if (props.disabled) return;
      const checked = !props.checked;
      emit(CHANGE_EVENT, checked);
      emit("update:checked", checked);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "span",
        {
          class: normalizeClass(containerKls.value),
          onClick: handleChange
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
//# sourceMappingURL=check-tag.vue2.mjs.map
