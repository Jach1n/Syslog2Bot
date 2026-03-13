'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var props = require('./props.js');
var useFormItem = require('../../../form/src/hooks/use-form-item.js');
var index = require('../../../../hooks/use-attrs/index.js');
var index$1 = require('../../../../hooks/use-namespace/index.js');
var index$2 = require('../../../../hooks/use-focus-controller/index.js');

const _hoisted_1 = ["id", "name", "placeholder", "value", "disabled"];
const _hoisted_2 = ["id", "name", "placeholder", "value", "disabled"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "PickerRangeTrigger",
    inheritAttrs: false
  },
  __name: "picker-range-trigger",
  props: props.timePickerRangeTriggerProps,
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
    const { formItem } = useFormItem.useFormItem();
    const { inputId } = useFormItem.useFormItemInputId(
      vue.reactive({ id: vue.computed(() => {
        var _a;
        return (_a = props.id) == null ? void 0 : _a[0];
      }) }),
      {
        formItemContext: formItem
      }
    );
    const attrs = index.useAttrs();
    const nsDate = index$1.useNamespace("date");
    const nsRange = index$1.useNamespace("range");
    const inputRef = vue.ref();
    const endInputRef = vue.ref();
    const { wrapperRef, isFocused } = index$2.useFocusController(inputRef, {
      disabled: vue.computed(() => props.disabled)
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
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          ref_key: "wrapperRef",
          ref: wrapperRef,
          class: vue.normalizeClass([vue.unref(nsDate).is("active", vue.unref(isFocused)), _ctx.$attrs.class]),
          style: vue.normalizeStyle(
            // https://github.com/vuejs/language-tools/issues/2104#issuecomment-3092541527
            _ctx.$attrs.style
          ),
          onClick: handleClick,
          onMouseenter: handleMouseEnter,
          onMouseleave: handleMouseLeave,
          onTouchstartPassive: handleTouchStart
        },
        [
          vue.renderSlot(_ctx.$slots, "prefix"),
          vue.createElementVNode("input", vue.mergeProps(vue.unref(attrs), {
            id: vue.unref(inputId),
            ref_key: "inputRef",
            ref: inputRef,
            name: _ctx.name && _ctx.name[0],
            placeholder: _ctx.startPlaceholder,
            value: _ctx.modelValue && _ctx.modelValue[0],
            class: vue.unref(nsRange).b("input"),
            disabled: _ctx.disabled,
            onInput: handleStartInput,
            onChange: handleStartChange
          }), null, 16, _hoisted_1),
          vue.renderSlot(_ctx.$slots, "range-separator"),
          vue.createElementVNode("input", vue.mergeProps(vue.unref(attrs), {
            id: _ctx.id && _ctx.id[1],
            ref_key: "endInputRef",
            ref: endInputRef,
            name: _ctx.name && _ctx.name[1],
            placeholder: _ctx.endPlaceholder,
            value: _ctx.modelValue && _ctx.modelValue[1],
            class: vue.unref(nsRange).b("input"),
            disabled: _ctx.disabled,
            onInput: handleEndInput,
            onChange: handleEndChange
          }), null, 16, _hoisted_2),
          vue.renderSlot(_ctx.$slots, "suffix")
        ],
        38
        /* CLASS, STYLE, NEED_HYDRATION */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=picker-range-trigger.vue2.js.map
