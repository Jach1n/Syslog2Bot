'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var radioButton = require('./radio-button.js');
var vue = require('vue');
var useRadio = require('./use-radio.js');
var index = require('../../../hooks/use-namespace/index.js');

const _hoisted_1 = ["value", "name", "disabled"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElRadioButton"
  },
  __name: "radio-button",
  props: radioButton.radioButtonProps,
  setup(__props) {
    const props = __props;
    const ns = index.useNamespace("radio");
    const { radioRef, focus, size, disabled, modelValue, radioGroup, actualValue } = useRadio.useRadio(props);
    const activeStyle = vue.computed(() => {
      return {
        backgroundColor: (radioGroup == null ? void 0 : radioGroup.fill) || "",
        borderColor: (radioGroup == null ? void 0 : radioGroup.fill) || "",
        boxShadow: (radioGroup == null ? void 0 : radioGroup.fill) ? `-1px 0 0 0 ${radioGroup.fill}` : "",
        color: (radioGroup == null ? void 0 : radioGroup.textColor) || ""
      };
    });
    return (_ctx, _cache) => {
      var _a;
      return vue.openBlock(), vue.createElementBlock(
        "label",
        {
          class: vue.normalizeClass([
            vue.unref(ns).b("button"),
            vue.unref(ns).is("active", vue.unref(modelValue) === vue.unref(actualValue)),
            vue.unref(ns).is("disabled", vue.unref(disabled)),
            vue.unref(ns).is("focus", vue.unref(focus)),
            vue.unref(ns).bm("button", vue.unref(size))
          ])
        },
        [
          vue.withDirectives(vue.createElementVNode("input", {
            ref_key: "radioRef",
            ref: radioRef,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(modelValue) ? modelValue.value = $event : null),
            class: vue.normalizeClass(vue.unref(ns).be("button", "original-radio")),
            value: vue.unref(actualValue),
            type: "radio",
            name: __props.name || ((_a = vue.unref(radioGroup)) == null ? void 0 : _a.name),
            disabled: vue.unref(disabled),
            onFocus: _cache[1] || (_cache[1] = ($event) => focus.value = true),
            onBlur: _cache[2] || (_cache[2] = ($event) => focus.value = false),
            onClick: _cache[3] || (_cache[3] = vue.withModifiers(() => {
            }, ["stop"]))
          }, null, 42, _hoisted_1), [
            [vue.vModelRadio, vue.unref(modelValue)]
          ]),
          vue.createElementVNode(
            "span",
            {
              class: vue.normalizeClass(vue.unref(ns).be("button", "inner")),
              style: vue.normalizeStyle(vue.unref(modelValue) === vue.unref(actualValue) ? activeStyle.value : {}),
              onKeydown: _cache[4] || (_cache[4] = vue.withModifiers(() => {
              }, ["stop"]))
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
            38
            /* CLASS, STYLE, NEED_HYDRATION */
          )
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=radio-button.vue2.js.map
