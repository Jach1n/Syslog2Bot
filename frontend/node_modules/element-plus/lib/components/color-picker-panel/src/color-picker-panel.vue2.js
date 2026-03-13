'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var colorPickerPanel = require('./color-picker-panel.js');
var vue = require('vue');
var index$1 = require('../../input/index.js');
var alphaSlider_vue_vue_type_script_setup_true_lang = require('./components/alpha-slider.vue2.js');
var hueSlider_vue_vue_type_script_setup_true_lang = require('./components/hue-slider.vue2.js');
var predefine_vue_vue_type_script_setup_true_lang = require('./components/predefine.vue2.js');
var svPanel_vue_vue_type_script_setup_true_lang = require('./components/sv-panel.vue2.js');
var useCommonColor = require('./composables/use-common-color.js');
var index = require('../../../hooks/use-namespace/index.js');
var useFormItem = require('../../form/src/hooks/use-form-item.js');
var useFormCommonProps = require('../../form/src/hooks/use-form-common-props.js');
var event = require('../../../constants/event.js');
var error = require('../../../utils/error.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElColorPickerPanel"
  },
  __name: "color-picker-panel",
  props: colorPickerPanel.colorPickerPanelProps,
  emits: colorPickerPanel.colorPickerPanelEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = index.useNamespace("color-picker-panel");
    const { formItem } = useFormItem.useFormItem();
    const disabled = useFormCommonProps.useFormDisabled();
    const hueRef = vue.ref();
    const svRef = vue.ref();
    const alphaRef = vue.ref();
    const inputRef = vue.ref();
    const customInput = vue.ref("");
    const { color } = vue.inject(
      colorPickerPanel.ROOT_COMMON_COLOR_INJECTION_KEY,
      () => useCommonColor.useCommonColor(props, emit),
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
        (_a = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a.call(formItem, "blur").catch((err) => error.debugWarn(err));
      }
    }
    function update() {
      var _a, _b, _c;
      (_a = hueRef.value) == null ? void 0 : _a.update();
      (_b = svRef.value) == null ? void 0 : _b.update();
      (_c = alphaRef.value) == null ? void 0 : _c.update();
    }
    vue.onMounted(() => {
      if (props.modelValue) {
        customInput.value = color.value;
      }
      vue.nextTick(update);
    });
    vue.watch(
      () => props.modelValue,
      (newVal) => {
        if (newVal !== color.value) {
          newVal ? color.fromString(newVal) : color.clear();
        }
      }
    );
    vue.watch(
      () => color.value,
      (val) => {
        emit(event.UPDATE_MODEL_EVENT, val);
        customInput.value = val;
        if (props.validateEvent) {
          formItem == null ? void 0 : formItem.validate("change").catch((err) => error.debugWarn(err));
        }
      }
    );
    vue.provide(colorPickerPanel.colorPickerPanelContextKey, {
      currentColor: vue.computed(() => color.value)
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
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass([vue.unref(ns).b(), vue.unref(ns).is("disabled", vue.unref(disabled)), vue.unref(ns).is("border", __props.border)]),
          onFocusout: handleFocusout
        },
        [
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(vue.unref(ns).e("wrapper"))
            },
            [
              vue.createVNode(hueSlider_vue_vue_type_script_setup_true_lang.default, {
                ref_key: "hueRef",
                ref: hueRef,
                class: "hue-slider",
                color: vue.unref(color),
                vertical: "",
                disabled: vue.unref(disabled)
              }, null, 8, ["color", "disabled"]),
              vue.createVNode(svPanel_vue_vue_type_script_setup_true_lang.default, {
                ref_key: "svRef",
                ref: svRef,
                color: vue.unref(color),
                disabled: vue.unref(disabled)
              }, null, 8, ["color", "disabled"])
            ],
            2
            /* CLASS */
          ),
          __props.showAlpha ? (vue.openBlock(), vue.createBlock(alphaSlider_vue_vue_type_script_setup_true_lang.default, {
            key: 0,
            ref_key: "alphaRef",
            ref: alphaRef,
            color: vue.unref(color),
            disabled: vue.unref(disabled)
          }, null, 8, ["color", "disabled"])) : vue.createCommentVNode("v-if", true),
          __props.predefine ? (vue.openBlock(), vue.createBlock(predefine_vue_vue_type_script_setup_true_lang.default, {
            key: 1,
            ref: "predefine",
            "enable-alpha": __props.showAlpha,
            color: vue.unref(color),
            colors: __props.predefine,
            disabled: vue.unref(disabled)
          }, null, 8, ["enable-alpha", "color", "colors", "disabled"])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(vue.unref(ns).e("footer"))
            },
            [
              vue.createVNode(vue.unref(index$1.ElInput), {
                ref_key: "inputRef",
                ref: inputRef,
                modelValue: customInput.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => customInput.value = $event),
                "validate-event": false,
                size: "small",
                disabled: vue.unref(disabled),
                onChange: handleConfirm
              }, null, 8, ["modelValue", "disabled"]),
              vue.renderSlot(_ctx.$slots, "footer")
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

exports.default = _sfc_main;
//# sourceMappingURL=color-picker-panel.vue2.js.map
