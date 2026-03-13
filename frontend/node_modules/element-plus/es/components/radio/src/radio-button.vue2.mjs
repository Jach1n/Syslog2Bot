import { radioButtonProps } from './radio-button.mjs';
import { defineComponent, computed, createElementBlock, openBlock, normalizeClass, unref, withDirectives, createElementVNode, withModifiers, isRef, vModelRadio, normalizeStyle, renderSlot, createTextVNode, toDisplayString } from 'vue';
import { useRadio } from './use-radio.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _hoisted_1 = ["value", "name", "disabled"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElRadioButton"
  },
  __name: "radio-button",
  props: radioButtonProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("radio");
    const { radioRef, focus, size, disabled, modelValue, radioGroup, actualValue } = useRadio(props);
    const activeStyle = computed(() => {
      return {
        backgroundColor: (radioGroup == null ? void 0 : radioGroup.fill) || "",
        borderColor: (radioGroup == null ? void 0 : radioGroup.fill) || "",
        boxShadow: (radioGroup == null ? void 0 : radioGroup.fill) ? `-1px 0 0 0 ${radioGroup.fill}` : "",
        color: (radioGroup == null ? void 0 : radioGroup.textColor) || ""
      };
    });
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock(
        "label",
        {
          class: normalizeClass([
            unref(ns).b("button"),
            unref(ns).is("active", unref(modelValue) === unref(actualValue)),
            unref(ns).is("disabled", unref(disabled)),
            unref(ns).is("focus", unref(focus)),
            unref(ns).bm("button", unref(size))
          ])
        },
        [
          withDirectives(createElementVNode("input", {
            ref_key: "radioRef",
            ref: radioRef,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null),
            class: normalizeClass(unref(ns).be("button", "original-radio")),
            value: unref(actualValue),
            type: "radio",
            name: __props.name || ((_a = unref(radioGroup)) == null ? void 0 : _a.name),
            disabled: unref(disabled),
            onFocus: _cache[1] || (_cache[1] = ($event) => focus.value = true),
            onBlur: _cache[2] || (_cache[2] = ($event) => focus.value = false),
            onClick: _cache[3] || (_cache[3] = withModifiers(() => {
            }, ["stop"]))
          }, null, 42, _hoisted_1), [
            [vModelRadio, unref(modelValue)]
          ]),
          createElementVNode(
            "span",
            {
              class: normalizeClass(unref(ns).be("button", "inner")),
              style: normalizeStyle(unref(modelValue) === unref(actualValue) ? activeStyle.value : {}),
              onKeydown: _cache[4] || (_cache[4] = withModifiers(() => {
              }, ["stop"]))
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

export { _sfc_main as default };
//# sourceMappingURL=radio-button.vue2.mjs.map
