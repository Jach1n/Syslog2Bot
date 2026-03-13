import { checkboxEmits, checkboxProps } from './checkbox.mjs';
import { defineComponent, useSlots, computed, createBlock, openBlock, resolveDynamicComponent, unref, normalizeClass, withCtx, createElementVNode, createElementBlock, createCommentVNode, withDirectives, mergeProps, isRef, withModifiers, vModelCheckbox, renderSlot, Fragment, createTextVNode, toDisplayString } from 'vue';
import { useCheckbox } from './composables/use-checkbox.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _hoisted_1 = ["id", "indeterminate", "name", "tabindex", "disabled"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElCheckbox"
  },
  __name: "checkbox",
  props: checkboxProps,
  emits: checkboxEmits,
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const {
      inputId,
      isLabeledByFormItem,
      isChecked,
      isDisabled,
      isFocused,
      checkboxSize,
      hasOwnLabel,
      model,
      actualValue,
      handleChange,
      onClickRoot
    } = useCheckbox(props, slots);
    const inputBindings = computed(() => {
      var _a, _b, _c, _d;
      if (props.trueValue || props.falseValue || props.trueLabel || props.falseLabel) {
        return {
          "true-value": (_b = (_a = props.trueValue) != null ? _a : props.trueLabel) != null ? _b : true,
          "false-value": (_d = (_c = props.falseValue) != null ? _c : props.falseLabel) != null ? _d : false
        };
      }
      return {
        value: actualValue.value
      };
    });
    const ns = useNamespace("checkbox");
    const compKls = computed(() => {
      return [
        ns.b(),
        ns.m(checkboxSize.value),
        ns.is("disabled", isDisabled.value),
        ns.is("bordered", props.border),
        ns.is("checked", isChecked.value)
      ];
    });
    const spanKls = computed(() => {
      return [
        ns.e("input"),
        ns.is("disabled", isDisabled.value),
        ns.is("checked", isChecked.value),
        ns.is("indeterminate", props.indeterminate),
        ns.is("focus", isFocused.value)
      ];
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(!unref(hasOwnLabel) && unref(isLabeledByFormItem) ? "span" : "label"), {
        for: !unref(hasOwnLabel) && unref(isLabeledByFormItem) ? null : unref(inputId),
        class: normalizeClass(compKls.value),
        "aria-controls": __props.indeterminate ? __props.ariaControls : null,
        "aria-checked": __props.indeterminate ? "mixed" : void 0,
        "aria-label": __props.ariaLabel,
        onClick: unref(onClickRoot)
      }, {
        default: withCtx(() => [
          createElementVNode(
            "span",
            {
              class: normalizeClass(spanKls.value)
            },
            [
              withDirectives(createElementVNode("input", mergeProps({
                id: unref(inputId),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(model) ? model.value = $event : null),
                class: unref(ns).e("original"),
                type: "checkbox",
                indeterminate: __props.indeterminate,
                name: __props.name,
                tabindex: __props.tabindex,
                disabled: unref(isDisabled)
              }, inputBindings.value, {
                onChange: _cache[1] || (_cache[1] = //@ts-ignore
                (...args) => unref(handleChange) && unref(handleChange)(...args)),
                onFocus: _cache[2] || (_cache[2] = ($event) => isFocused.value = true),
                onBlur: _cache[3] || (_cache[3] = ($event) => isFocused.value = false),
                onClick: _cache[4] || (_cache[4] = withModifiers(() => {
                }, ["stop"]))
              }), null, 16, _hoisted_1), [
                [vModelCheckbox, unref(model)]
              ]),
              createElementVNode(
                "span",
                {
                  class: normalizeClass(unref(ns).e("inner"))
                },
                null,
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ),
          unref(hasOwnLabel) ? (openBlock(), createElementBlock(
            "span",
            {
              key: 0,
              class: normalizeClass(unref(ns).e("label"))
            },
            [
              renderSlot(_ctx.$slots, "default"),
              !_ctx.$slots.default ? (openBlock(), createElementBlock(
                Fragment,
                { key: 0 },
                [
                  createTextVNode(
                    toDisplayString(__props.label),
                    1
                    /* TEXT */
                  )
                ],
                64
                /* STABLE_FRAGMENT */
              )) : createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["for", "class", "aria-controls", "aria-checked", "aria-label", "onClick"]);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=checkbox.vue2.mjs.map
