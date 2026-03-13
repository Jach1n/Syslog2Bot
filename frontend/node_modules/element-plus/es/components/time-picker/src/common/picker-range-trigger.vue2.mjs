import { defineComponent, reactive, computed, ref, createElementBlock, openBlock, normalizeStyle, normalizeClass, unref, renderSlot, createElementVNode, mergeProps } from 'vue';
import { timePickerRangeTriggerProps } from './props.mjs';
import { useFormItem, useFormItemInputId } from '../../../form/src/hooks/use-form-item.mjs';
import { useAttrs } from '../../../../hooks/use-attrs/index.mjs';
import { useNamespace } from '../../../../hooks/use-namespace/index.mjs';
import { useFocusController } from '../../../../hooks/use-focus-controller/index.mjs';

const _hoisted_1 = ["id", "name", "placeholder", "value", "disabled"];
const _hoisted_2 = ["id", "name", "placeholder", "value", "disabled"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "PickerRangeTrigger",
    inheritAttrs: false
  },
  __name: "picker-range-trigger",
  props: timePickerRangeTriggerProps,
  emits: [
    "mouseenter",
    "mouseleave",
    "click",
    "touchstart",
    "focus",
    "blur",
    "startInput",
    "endInput",
    "startChange",
    "endChange"
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { formItem } = useFormItem();
    const { inputId } = useFormItemInputId(
      reactive({ id: computed(() => {
        var _a;
        return (_a = props.id) == null ? void 0 : _a[0];
      }) }),
      {
        formItemContext: formItem
      }
    );
    const attrs = useAttrs();
    const nsDate = useNamespace("date");
    const nsRange = useNamespace("range");
    const inputRef = ref();
    const endInputRef = ref();
    const { wrapperRef, isFocused } = useFocusController(inputRef, {
      disabled: computed(() => props.disabled)
    });
    const handleClick = (evt) => {
      emit("click", evt);
    };
    const handleMouseEnter = (evt) => {
      emit("mouseenter", evt);
    };
    const handleMouseLeave = (evt) => {
      emit("mouseleave", evt);
    };
    const handleTouchStart = (evt) => {
      emit("touchstart", evt);
    };
    const handleStartInput = (evt) => {
      emit("startInput", evt);
    };
    const handleEndInput = (evt) => {
      emit("endInput", evt);
    };
    const handleStartChange = (evt) => {
      emit("startChange", evt);
    };
    const handleEndChange = (evt) => {
      emit("endChange", evt);
    };
    const focus = () => {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.focus();
    };
    const blur = () => {
      var _a, _b;
      (_a = inputRef.value) == null ? void 0 : _a.blur();
      (_b = endInputRef.value) == null ? void 0 : _b.blur();
    };
    __expose({
      focus,
      blur
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          ref_key: "wrapperRef",
          ref: wrapperRef,
          class: normalizeClass([unref(nsDate).is("active", unref(isFocused)), _ctx.$attrs.class]),
          style: normalizeStyle(
            // https://github.com/vuejs/language-tools/issues/2104#issuecomment-3092541527
            _ctx.$attrs.style
          ),
          onClick: handleClick,
          onMouseenter: handleMouseEnter,
          onMouseleave: handleMouseLeave,
          onTouchstartPassive: handleTouchStart
        },
        [
          renderSlot(_ctx.$slots, "prefix"),
          createElementVNode("input", mergeProps(unref(attrs), {
            id: unref(inputId),
            ref_key: "inputRef",
            ref: inputRef,
            name: _ctx.name && _ctx.name[0],
            placeholder: _ctx.startPlaceholder,
            value: _ctx.modelValue && _ctx.modelValue[0],
            class: unref(nsRange).b("input"),
            disabled: _ctx.disabled,
            onInput: handleStartInput,
            onChange: handleStartChange
          }), null, 16, _hoisted_1),
          renderSlot(_ctx.$slots, "range-separator"),
          createElementVNode("input", mergeProps(unref(attrs), {
            id: _ctx.id && _ctx.id[1],
            ref_key: "endInputRef",
            ref: endInputRef,
            name: _ctx.name && _ctx.name[1],
            placeholder: _ctx.endPlaceholder,
            value: _ctx.modelValue && _ctx.modelValue[1],
            class: unref(nsRange).b("input"),
            disabled: _ctx.disabled,
            onInput: handleEndInput,
            onChange: handleEndChange
          }), null, 16, _hoisted_2),
          renderSlot(_ctx.$slots, "suffix")
        ],
        38
        /* CLASS, STYLE, NEED_HYDRATION */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=picker-range-trigger.vue2.mjs.map
