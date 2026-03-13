'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var checkbox = require('./checkbox.js');
var vue = require('vue');
var constants = require('./constants.js');
var useCheckbox = require('./composables/use-checkbox.js');
var index = require('../../../hooks/use-namespace/index.js');

const _hoisted_1 = ["name", "tabindex", "disabled"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElCheckboxButton"
  },
  __name: "checkbox-button",
  props: checkbox.checkboxProps,
  emits: checkbox.checkboxEmits,
  setup(__props) {
    const props = __props;
    const slots = vue.useSlots();
    const {
      isFocused,
      isChecked,
      isDisabled,
      checkboxButtonSize,
      model,
      actualValue,
      handleChange
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
    const checkboxGroup = vue.inject(constants.checkboxGroupContextKey, void 0);
    const ns = index.useNamespace("checkbox");
    const activeStyle = vue.computed(() => {
      var _a, _b, _c, _d;
      const fillValue = (_b = (_a = checkboxGroup == null ? void 0 : checkboxGroup.fill) == null ? void 0 : _a.value) != null ? _b : "";
      return {
        backgroundColor: fillValue,
        borderColor: fillValue,
        color: (_d = (_c = checkboxGroup == null ? void 0 : checkboxGroup.textColor) == null ? void 0 : _c.value) != null ? _d : "",
        boxShadow: fillValue ? `-1px 0 0 0 ${fillValue}` : void 0
      };
    });
    const labelKls = vue.computed(() => {
      return [
        ns.b("button"),
        ns.bm("button", checkboxButtonSize.value),
        ns.is("disabled", isDisabled.value),
        ns.is("checked", isChecked.value),
        ns.is("focus", isFocused.value)
      ];
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "label",
        {
          class: vue.normalizeClass(labelKls.value)
        },
        [
          vue.withDirectives(vue.createElementVNode("input", vue.mergeProps({
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(model) ? model.value = $event : null),
            class: vue.unref(ns).be("button", "original"),
            type: "checkbox",
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
          _ctx.$slots.default || __props.label ? (vue.openBlock(), vue.createElementBlock(
            "span",
            {
              key: 0,
              class: vue.normalizeClass(vue.unref(ns).be("button", "inner")),
              style: vue.normalizeStyle(vue.unref(isChecked) ? activeStyle.value : void 0)
            },
            [
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                vue.createTextVNode(
                  vue.toDisplayString(__props.label),
                  1
                  /* TEXT */
                )
              ])
            ],
            6
            /* CLASS, STYLE */
          )) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=checkbox-button.vue2.js.map
