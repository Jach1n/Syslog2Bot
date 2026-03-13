'use strict';

var vue = require('vue');
var core = require('@vueuse/core');
var index = require('../../../../hooks/use-namespace/index.js');
var form = require('../../../../constants/form.js');

function useInputTagDom({
  props,
  isFocused,
  hovering,
  disabled,
  inputValue,
  size,
  validateState,
  validateIcon,
  needStatusIcon
}) {
  const attrs = vue.useAttrs();
  const slots = vue.useSlots();
  const ns = index.useNamespace("input-tag");
  const nsInput = index.useNamespace("input");
  const collapseItemRef = vue.ref();
  const innerRef = vue.ref();
  const containerKls = vue.computed(() => [
    ns.b(),
    ns.is("focused", isFocused.value),
    ns.is("hovering", hovering.value),
    ns.is("disabled", disabled.value),
    ns.m(size.value),
    ns.e("wrapper"),
    attrs.class
  ]);
  const containerStyle = vue.computed(() => [attrs.style]);
  const innerKls = vue.computed(() => {
    var _a, _b;
    return [
      ns.e("inner"),
      ns.is("draggable", props.draggable),
      ns.is("left-space", !((_a = props.modelValue) == null ? void 0 : _a.length) && !slots.prefix),
      ns.is("right-space", !((_b = props.modelValue) == null ? void 0 : _b.length) && !showSuffix.value)
    ];
  });
  const showClear = vue.computed(() => {
    var _a;
    return props.clearable && !disabled.value && !props.readonly && (((_a = props.modelValue) == null ? void 0 : _a.length) || inputValue.value) && (isFocused.value || hovering.value);
  });
  const showSuffix = vue.computed(() => {
    return slots.suffix || showClear.value || validateState.value && validateIcon.value && needStatusIcon.value;
  });
  const states = vue.reactive({
    innerWidth: 0,
    collapseItemWidth: 0
  });
  const getGapWidth = () => {
    if (!innerRef.value) return 0;
    const style = window.getComputedStyle(innerRef.value);
    return Number.parseFloat(style.gap || "6px");
  };
  const resetInnerWidth = () => {
    states.innerWidth = Number.parseFloat(
      window.getComputedStyle(innerRef.value).width
    );
  };
  const resetCollapseItemWidth = () => {
    states.collapseItemWidth = collapseItemRef.value.getBoundingClientRect().width;
  };
  const tagStyle = vue.computed(() => {
    if (!props.collapseTags) return {};
    const gapWidth = getGapWidth();
    const inputSlotWidth = gapWidth + form.MINIMUM_INPUT_WIDTH;
    const maxWidth = collapseItemRef.value && props.maxCollapseTags === 1 ? states.innerWidth - states.collapseItemWidth - gapWidth - inputSlotWidth : states.innerWidth - inputSlotWidth;
    return { maxWidth: `${Math.max(maxWidth, 0)}px` };
  });
  core.useResizeObserver(innerRef, resetInnerWidth);
  core.useResizeObserver(collapseItemRef, resetCollapseItemWidth);
  return {
    ns,
    nsInput,
    containerKls,
    containerStyle,
    innerKls,
    showClear,
    showSuffix,
    tagStyle,
    collapseItemRef,
    innerRef
  };
}

exports.useInputTagDom = useInputTagDom;
//# sourceMappingURL=use-input-tag-dom.js.map
