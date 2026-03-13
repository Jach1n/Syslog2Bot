import { radioEmits, radioProps } from './radio.mjs';
import { defineComponent, createElementBlock, openBlock, normalizeClass, unref, createElementVNode, withDirectives, withModifiers, isRef, vModelRadio, renderSlot, createTextVNode, toDisplayString, nextTick } from 'vue';
import { useRadio } from './use-radio.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { CHANGE_EVENT } from '../../../constants/event.mjs';

const _hoisted_1 = ["value", "name", "disabled", "checked"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElRadio"
  },
  __name: "radio",
  props: radioProps,
  emits: radioEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("radio");
    const { radioRef, radioGroup, focus, size, disabled, modelValue, actualValue } = useRadio(props, emit);
    function handleChange() {
      nextTick(() => emit(CHANGE_EVENT, modelValue.value));
    }
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock(
        "label",
        {
          class: normalizeClass([
            unref(ns).b(),
            unref(ns).is("disabled", unref(disabled)),
            unref(ns).is("focus", unref(focus)),
            unref(ns).is("bordered", __props.border),
            unref(ns).is("checked", unref(modelValue) === unref(actualValue)),
            unref(ns).m(unref(size))
          ])
        },
        [
          createElementVNode(
            "span",
            {
              class: normalizeClass([
                unref(ns).e("input"),
                unref(ns).is("disabled", unref(disabled)),
                unref(ns).is("checked", unref(modelValue) === unref(actualValue))
              ])
            },
            [
              withDirectives(createElementVNode("input", {
                ref_key: "radioRef",
                ref: radioRef,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null),
                class: normalizeClass(unref(ns).e("original")),
                value: unref(actualValue),
                name: __props.name || ((_a = unref(radioGroup)) == null ? void 0 : _a.name),
                disabled: unref(disabled),
                checked: unref(modelValue) === unref(actualValue),
                type: "radio",
                onFocus: _cache[1] || (_cache[1] = ($event) => focus.value = true),
                onBlur: _cache[2] || (_cache[2] = ($event) => focus.value = false),
                onChange: handleChange,
                onClick: _cache[3] || (_cache[3] = withModifiers(() => {
                }, ["stop"]))
              }, null, 42, _hoisted_1), [
                [vModelRadio, unref(modelValue)]
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
          createElementVNode(
            "span",
            {
              class: normalizeClass(unref(ns).e("label")),
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

export { _sfc_main as default };
//# sourceMappingURL=radio.vue2.mjs.map
