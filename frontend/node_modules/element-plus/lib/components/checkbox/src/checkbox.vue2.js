'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var checkbox = require('./checkbox.js');
var vue = require('vue');
var useCheckbox = require('./composables/use-checkbox.js');
var index = require('../../../hooks/use-namespace/index.js');

const _hoisted_1 = ["id", "indeterminate", "name", "tabindex", "disabled"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElCheckbox"
  },
  __name: "checkbox",
  props: checkbox.checkboxProps,
  emits: checkbox.checkboxEmits,
  setup(__props) {
    const props = __props;
    const slots = vue.useSlots();
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
    } = useCheckbox.useCheckbox(props, slots);
    const inputBindings = vue.computed(() => {
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
    const ns = index.useNamespace("checkbox");
    const compKls = vue.computed(() => {
      return [
        ns.b(),
        ns.m(checkboxSize.value),
        ns.is("disabled", isDisabled.value),
        ns.is("bordered", props.border),
        ns.is("checked", isChecked.value)
      ];
    });
    const spanKls = vue.computed(() => {
      return [
        ns.e("input"),
        ns.is("disabled", isDisabled.value),
        ns.is("checked", isChecked.value),
        ns.is("indeterminate", props.indeterminate),
        ns.is("focus", isFocused.value)
      ];
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(!vue.unref(hasOwnLabel) && vue.unref(isLabeledByFormItem) ? "span" : "label"), {
        for: !vue.unref(hasOwnLabel) && vue.unref(isLabeledByFormItem) ? null : vue.unref(inputId),
        class: vue.normalizeClass(compKls.value),
        "aria-controls": __props.indeterminate ? __props.ariaControls : null,
        "aria-checked": __props.indeterminate ? "mixed" : void 0,
        "aria-label": __props.ariaLabel,
        onClick: vue.unref(onClickRoot)
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode(
            "span",
            {
              class: vue.normalizeClass(spanKls.value)
            },
            [
              vue.withDirectives(vue.createElementVNode("input", vue.mergeProps({
                id: vue.unref(inputId),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(model) ? model.value = $event : null),
                class: vue.unref(ns).e("original"),
                type: "checkbox",
                indeterminate: __props.indeterminate,
                name: __props.name,
                tabindex: __props.tabindex,
                disabled: vue.unref(isDisabled)
              }, inputBindings.value, {
                onChange: _cache[1] || (_cache[1] = //@ts-ignore
                (...args) => vue.unref(handleChange) && vue.unref(handleChange)(...args)),
                onFocus: _cache[2] || (_cache[2] = ($event) => isFocused.value = true),
                onBlur: _cache[3] || (_cache[3] = ($event) => isFocused.value = false),
                onClick: _cache[4] || (_cache[4] = vue.withModifiers(() => {
                }, ["stop"]))
              }), null, 16, _hoisted_1), [
                [vue.vModelCheckbox, vue.unref(model)]
              ]),
              vue.createElementVNode(
                "span",
                {
                  class: vue.normalizeClass(vue.unref(ns).e("inner"))
                },
                null,
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ),
          vue.unref(hasOwnLabel) ? (vue.openBlock(), vue.createElementBlock(
            "span",
            {
              key: 0,
              class: vue.normalizeClass(vue.unref(ns).e("label"))
            },
            [
              vue.renderSlot(_ctx.$slots, "default"),
              !_ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                [
                  vue.createTextVNode(
                    vue.toDisplayString(__props.label),
                    1
                    /* TEXT */
                  )
                ],
                64
                /* STABLE_FRAGMENT */
              )) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["for", "class", "aria-controls", "aria-checked", "aria-label", "onClick"]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=checkbox.vue2.js.map
