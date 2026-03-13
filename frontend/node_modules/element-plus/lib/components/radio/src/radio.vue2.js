'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var radio = require('./radio.js');
var vue = require('vue');
var useRadio = require('./use-radio.js');
var index = require('../../../hooks/use-namespace/index.js');
var event = require('../../../constants/event.js');

const _hoisted_1 = ["value", "name", "disabled", "checked"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElRadio"
  },
  __name: "radio",
  props: radio.radioProps,
  emits: radio.radioEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = index.useNamespace("radio");
    const { radioRef, radioGroup, focus, size, disabled, modelValue, actualValue } = useRadio.useRadio(props, emit);
    function handleChange() {
      vue.nextTick(() => emit(event.CHANGE_EVENT, modelValue.value));
    }
    return (_ctx, _cache) => {
      var _a;
      return vue.openBlock(), vue.createElementBlock(
        "label",
        {
          class: vue.normalizeClass([
            vue.unref(ns).b(),
            vue.unref(ns).is("disabled", vue.unref(disabled)),
            vue.unref(ns).is("focus", vue.unref(focus)),
            vue.unref(ns).is("bordered", __props.border),
            vue.unref(ns).is("checked", vue.unref(modelValue) === vue.unref(actualValue)),
            vue.unref(ns).m(vue.unref(size))
          ])
        },
        [
          vue.createElementVNode(
            "span",
            {
              class: vue.normalizeClass([
                vue.unref(ns).e("input"),
                vue.unref(ns).is("disabled", vue.unref(disabled)),
                vue.unref(ns).is("checked", vue.unref(modelValue) === vue.unref(actualValue))
              ])
            },
            [
              vue.withDirectives(vue.createElementVNode("input", {
                ref_key: "radioRef",
                ref: radioRef,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(modelValue) ? modelValue.value = $event : null),
                class: vue.normalizeClass(vue.unref(ns).e("original")),
                value: vue.unref(actualValue),
                name: __props.name || ((_a = vue.unref(radioGroup)) == null ? void 0 : _a.name),
                disabled: vue.unref(disabled),
                checked: vue.unref(modelValue) === vue.unref(actualValue),
                type: "radio",
                onFocus: _cache[1] || (_cache[1] = ($event) => focus.value = true),
                onBlur: _cache[2] || (_cache[2] = ($event) => focus.value = false),
                onChange: handleChange,
                onClick: _cache[3] || (_cache[3] = vue.withModifiers(() => {
                }, ["stop"]))
              }, null, 42, _hoisted_1), [
                [vue.vModelRadio, vue.unref(modelValue)]
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
          vue.createElementVNode(
            "span",
            {
              class: vue.normalizeClass(vue.unref(ns).e("label")),
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
            34
            /* CLASS, NEED_HYDRATION */
          )
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=radio.vue2.js.map
