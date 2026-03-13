import { checkboxEmits, checkboxProps } from './checkbox.mjs';
import { defineComponent, useSlots, computed, inject, createElementBlock, openBlock, normalizeClass, withDirectives, createCommentVNode, createElementVNode, mergeProps, unref, isRef, withModifiers, vModelCheckbox, normalizeStyle, renderSlot, createTextVNode, toDisplayString } from 'vue';
import { checkboxGroupContextKey } from './constants.mjs';
import { useCheckbox } from './composables/use-checkbox.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _hoisted_1 = ["name", "tabindex", "disabled"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElCheckboxButton"
  },
  __name: "checkbox-button",
  props: checkboxProps,
  emits: checkboxEmits,
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const {
      isFocused,
      isChecked,
      isDisabled,
      checkboxButtonSize,
      model,
      actualValue,
      handleChange
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
    const checkboxGroup = inject(checkboxGroupContextKey, void 0);
    const ns = useNamespace("checkbox");
    const activeStyle = computed(() => {
      var _a, _b, _c, _d;
      const fillValue = (_b = (_a = checkboxGroup == null ? void 0 : checkboxGroup.fill) == null ? void 0 : _a.value) != null ? _b : "";
      return {
        backgroundColor: fillValue,
        borderColor: fillValue,
        color: (_d = (_c = checkboxGroup == null ? void 0 : checkboxGroup.textColor) == null ? void 0 : _c.value) != null ? _d : "",
        boxShadow: fillValue ? `-1px 0 0 0 ${fillValue}` : void 0
      };
    });
    const labelKls = computed(() => {
      return [
        ns.b("button"),
        ns.bm("button", checkboxButtonSize.value),
        ns.is("disabled", isDisabled.value),
        ns.is("checked", isChecked.value),
        ns.is("focus", isFocused.value)
      ];
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "label",
        {
          class: normalizeClass(labelKls.value)
        },
        [
          withDirectives(createElementVNode("input", mergeProps({
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(model) ? model.value = $event : null),
            class: unref(ns).be("button", "original"),
            type: "checkbox",
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
          _ctx.$slots.default || __props.label ? (openBlock(), createElementBlock(
            "span",
            {
              key: 0,
              class: normalizeClass(unref(ns).be("button", "inner")),
              style: normalizeStyle(unref(isChecked) ? activeStyle.value : void 0)
            },
            [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(
                  toDisplayString(__props.label),
                  1
                  /* TEXT */
                )
              ])
            ],
            6
            /* CLASS, STYLE */
          )) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=checkbox-button.vue2.mjs.map
