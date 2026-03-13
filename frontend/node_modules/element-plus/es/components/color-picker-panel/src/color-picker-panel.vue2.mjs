import { colorPickerPanelEmits, colorPickerPanelProps, ROOT_COMMON_COLOR_INJECTION_KEY, colorPickerPanelContextKey } from './color-picker-panel.mjs';
import { defineComponent, ref, inject, onMounted, nextTick, watch, provide, computed, createElementBlock, openBlock, normalizeClass, unref, createElementVNode, createBlock, createCommentVNode, createVNode, renderSlot } from 'vue';
import { ElInput } from '../../input/index.mjs';
import _sfc_main$3 from './components/alpha-slider.vue2.mjs';
import _sfc_main$1 from './components/hue-slider.vue2.mjs';
import _sfc_main$4 from './components/predefine.vue2.mjs';
import _sfc_main$2 from './components/sv-panel.vue2.mjs';
import { useCommonColor } from './composables/use-common-color.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useFormItem } from '../../form/src/hooks/use-form-item.mjs';
import { useFormDisabled } from '../../form/src/hooks/use-form-common-props.mjs';
import { UPDATE_MODEL_EVENT } from '../../../constants/event.mjs';
import { debugWarn } from '../../../utils/error.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElColorPickerPanel"
  },
  __name: "color-picker-panel",
  props: colorPickerPanelProps,
  emits: colorPickerPanelEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("color-picker-panel");
    const { formItem } = useFormItem();
    const disabled = useFormDisabled();
    const hueRef = ref();
    const svRef = ref();
    const alphaRef = ref();
    const inputRef = ref();
    const customInput = ref("");
    const { color } = inject(
      ROOT_COMMON_COLOR_INJECTION_KEY,
      () => useCommonColor(props, emit),
      true
    );
    function handleConfirm() {
      color.fromString(customInput.value);
      if (color.value !== customInput.value) {
        customInput.value = color.value;
      }
    }
    function handleFocusout() {
      var _a;
      if (props.validateEvent) {
        (_a = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a.call(formItem, "blur").catch((err) => debugWarn(err));
      }
    }
    function update() {
      var _a, _b, _c;
      (_a = hueRef.value) == null ? void 0 : _a.update();
      (_b = svRef.value) == null ? void 0 : _b.update();
      (_c = alphaRef.value) == null ? void 0 : _c.update();
    }
    onMounted(() => {
      if (props.modelValue) {
        customInput.value = color.value;
      }
      nextTick(update);
    });
    watch(
      () => props.modelValue,
      (newVal) => {
        if (newVal !== color.value) {
          newVal ? color.fromString(newVal) : color.clear();
        }
      }
    );
    watch(
      () => color.value,
      (val) => {
        emit(UPDATE_MODEL_EVENT, val);
        customInput.value = val;
        if (props.validateEvent) {
          formItem == null ? void 0 : formItem.validate("change").catch((err) => debugWarn(err));
        }
      }
    );
    provide(colorPickerPanelContextKey, {
      currentColor: computed(() => color.value)
    });
    __expose({
      /**
       * @description current color object
       */
      color,
      /**
       * @description custom input ref
       */
      inputRef,
      /**
       * @description update sub components
       */
      update
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([unref(ns).b(), unref(ns).is("disabled", unref(disabled)), unref(ns).is("border", __props.border)]),
          onFocusout: handleFocusout
        },
        [
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("wrapper"))
            },
            [
              createVNode(_sfc_main$1, {
                ref_key: "hueRef",
                ref: hueRef,
                class: "hue-slider",
                color: unref(color),
                vertical: "",
                disabled: unref(disabled)
              }, null, 8, ["color", "disabled"]),
              createVNode(_sfc_main$2, {
                ref_key: "svRef",
                ref: svRef,
                color: unref(color),
                disabled: unref(disabled)
              }, null, 8, ["color", "disabled"])
            ],
            2
            /* CLASS */
          ),
          __props.showAlpha ? (openBlock(), createBlock(_sfc_main$3, {
            key: 0,
            ref_key: "alphaRef",
            ref: alphaRef,
            color: unref(color),
            disabled: unref(disabled)
          }, null, 8, ["color", "disabled"])) : createCommentVNode("v-if", true),
          __props.predefine ? (openBlock(), createBlock(_sfc_main$4, {
            key: 1,
            ref: "predefine",
            "enable-alpha": __props.showAlpha,
            color: unref(color),
            colors: __props.predefine,
            disabled: unref(disabled)
          }, null, 8, ["enable-alpha", "color", "colors", "disabled"])) : createCommentVNode("v-if", true),
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("footer"))
            },
            [
              createVNode(unref(ElInput), {
                ref_key: "inputRef",
                ref: inputRef,
                modelValue: customInput.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => customInput.value = $event),
                "validate-event": false,
                size: "small",
                disabled: unref(disabled),
                onChange: handleConfirm
              }, null, 8, ["modelValue", "disabled"]),
              renderSlot(_ctx.$slots, "footer")
            ],
            2
            /* CLASS */
          )
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=color-picker-panel.vue2.mjs.map
