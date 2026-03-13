'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var colorPicker = require('./color-picker.js');
var vue = require('vue');
var lodashUnified = require('lodash-unified');
var index$5 = require('../../icon/index.js');
var core = require('@vueuse/core');
var index$4 = require('../../tooltip/index.js');
var index$7 = require('../../button/index.js');
var iconsVue = require('@element-plus/icons-vue');
var index$6 = require('../../color-picker-panel/index.js');
var color = require('../../color-picker-panel/src/utils/color.js');
var useCommonColor = require('../../color-picker-panel/src/composables/use-common-color.js');
var colorPickerPanel = require('../../color-picker-panel/src/color-picker-panel.js');
var index$8 = require('../../../directives/click-outside/index.js');
var index = require('../../../hooks/use-locale/index.js');
var index$1 = require('../../../hooks/use-namespace/index.js');
var useFormItem = require('../../form/src/hooks/use-form-item.js');
var useFormCommonProps = require('../../form/src/hooks/use-form-common-props.js');
var index$2 = require('../../../hooks/use-empty-values/index.js');
var index$3 = require('../../../hooks/use-focus-controller/index.js');
var error = require('../../../utils/error.js');
var event = require('../../../constants/event.js');
var event$1 = require('../../../utils/dom/event.js');
var aria = require('../../../constants/aria.js');

const _hoisted_1 = ["id", "aria-label", "aria-labelledby", "aria-description", "aria-disabled", "tabindex"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElColorPicker"
  },
  __name: "color-picker",
  props: colorPicker.colorPickerProps,
  emits: colorPicker.colorPickerEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = index.useLocale();
    const ns = index$1.useNamespace("color");
    const { formItem } = useFormItem.useFormItem();
    const colorSize = useFormCommonProps.useFormSize();
    const colorDisabled = useFormCommonProps.useFormDisabled();
    const { valueOnClear, isEmptyValue } = index$2.useEmptyValues(props, null);
    const commonColor = useCommonColor.useCommonColor(props, emit);
    const { inputId: buttonId, isLabeledByFormItem } = useFormItem.useFormItemInputId(props, {
      formItemContext: formItem
    });
    const popper = vue.ref();
    const triggerRef = vue.ref();
    const pickerPanelRef = vue.ref();
    const showPicker = vue.ref(false);
    const showPanelColor = vue.ref(false);
    let shouldActiveChange = true;
    const { isFocused, handleFocus, handleBlur } = index$3.useFocusController(triggerRef, {
      disabled: colorDisabled,
      beforeBlur(event) {
        var _a;
        return (_a = popper.value) == null ? void 0 : _a.isFocusInsideContent(event);
      },
      afterBlur() {
        var _a;
        setShowPicker(false);
        resetColor();
        if (props.validateEvent) {
          (_a = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a.call(formItem, "blur").catch((err) => error.debugWarn(err));
        }
      }
    });
    const color$1 = core.reactiveComputed(
      () => {
        var _a, _b;
        return (_b = (_a = pickerPanelRef.value) == null ? void 0 : _a.color) != null ? _b : commonColor.color;
      }
    );
    const panelProps = vue.computed(
      () => lodashUnified.pick(props, Object.keys(colorPickerPanel.colorPickerPanelProps))
    );
    const displayedColor = vue.computed(() => {
      if (!props.modelValue && !showPanelColor.value) {
        return "transparent";
      }
      return displayedRgb(color$1, props.showAlpha);
    });
    const currentColor = vue.computed(() => {
      return !props.modelValue && !showPanelColor.value ? "" : color$1.value;
    });
    const buttonAriaLabel = vue.computed(() => {
      return !isLabeledByFormItem.value ? props.ariaLabel || t("el.colorpicker.defaultLabel") : void 0;
    });
    const buttonAriaLabelledby = vue.computed(() => {
      return isLabeledByFormItem.value ? formItem == null ? void 0 : formItem.labelId : void 0;
    });
    const btnKls = vue.computed(() => {
      return [
        ns.b("picker"),
        ns.is("disabled", colorDisabled.value),
        ns.bm("picker", colorSize.value),
        ns.is("focused", isFocused.value)
      ];
    });
    function displayedRgb(color2, showAlpha) {
      const { r, g, b, a } = color2.toRgb();
      return showAlpha ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
    }
    function setShowPicker(value) {
      showPicker.value = value;
    }
    const debounceSetShowPicker = lodashUnified.debounce(setShowPicker, 100, { leading: true });
    function show() {
      if (colorDisabled.value) return;
      setShowPicker(true);
    }
    function hide() {
      debounceSetShowPicker(false);
      resetColor();
    }
    function resetColor() {
      vue.nextTick(() => {
        if (props.modelValue) {
          color$1.fromString(props.modelValue);
        } else {
          color$1.value = "";
          vue.nextTick(() => {
            showPanelColor.value = false;
          });
        }
      });
    }
    function handleTrigger() {
      if (colorDisabled.value) return;
      if (showPicker.value) {
        resetColor();
      }
      debounceSetShowPicker(!showPicker.value);
    }
    function confirmValue() {
      const value = isEmptyValue(color$1.value) ? valueOnClear.value : color$1.value;
      emit(event.UPDATE_MODEL_EVENT, value);
      emit(event.CHANGE_EVENT, value);
      if (props.validateEvent) {
        formItem == null ? void 0 : formItem.validate("change").catch((err) => error.debugWarn(err));
      }
      debounceSetShowPicker(false);
      vue.nextTick(() => {
        const newColor = new color.default({
          enableAlpha: props.showAlpha,
          format: props.colorFormat || "",
          value: props.modelValue
        });
        if (!color$1.compare(newColor)) {
          resetColor();
        }
      });
    }
    function clear() {
      debounceSetShowPicker(false);
      emit(event.UPDATE_MODEL_EVENT, valueOnClear.value);
      emit(event.CHANGE_EVENT, valueOnClear.value);
      if (props.modelValue !== valueOnClear.value && props.validateEvent) {
        formItem == null ? void 0 : formItem.validate("change").catch((err) => error.debugWarn(err));
      }
      resetColor();
      emit("clear");
    }
    function handleShowTooltip() {
      var _a, _b;
      (_b = (_a = pickerPanelRef == null ? void 0 : pickerPanelRef.value) == null ? void 0 : _a.inputRef) == null ? void 0 : _b.focus();
    }
    function handleClickOutside() {
      if (!showPicker.value) return;
      hide();
      isFocused.value && focus();
    }
    function handleEsc(event) {
      event.preventDefault();
      event.stopPropagation();
      setShowPicker(false);
      resetColor();
    }
    function handleKeyDown(event) {
      const code = event$1.getEventCode(event);
      switch (code) {
        case aria.EVENT_CODE.enter:
        case aria.EVENT_CODE.numpadEnter:
        case aria.EVENT_CODE.space:
          event.preventDefault();
          event.stopPropagation();
          show();
          break;
        case aria.EVENT_CODE.esc:
          handleEsc(event);
          break;
      }
    }
    function focus() {
      triggerRef.value.focus();
    }
    function blur() {
      triggerRef.value.blur();
    }
    vue.watch(
      () => currentColor.value,
      (val) => {
        shouldActiveChange && emit("activeChange", val);
        shouldActiveChange = true;
      }
    );
    vue.watch(
      () => color$1.value,
      () => {
        if (!props.modelValue && !showPanelColor.value) {
          showPanelColor.value = true;
        }
      }
    );
    vue.watch(
      () => props.modelValue,
      (newVal) => {
        if (!newVal) {
          showPanelColor.value = false;
        } else if (newVal && newVal !== color$1.value) {
          shouldActiveChange = false;
          color$1.fromString(newVal);
        }
      }
    );
    vue.watch(
      () => showPicker.value,
      () => {
        pickerPanelRef.value && vue.nextTick(pickerPanelRef.value.update);
      }
    );
    vue.provide(colorPickerPanel.ROOT_COMMON_COLOR_INJECTION_KEY, commonColor);
    __expose({
      /**
       * @description current color object
       */
      color: color$1,
      /**
       * @description manually show ColorPicker
       */
      show,
      /**
       * @description manually hide ColorPicker
       */
      hide,
      /**
       * @description focus the input element
       */
      focus,
      /**
       * @description blur the input element
       */
      blur
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(index$4.ElTooltip), {
        ref_key: "popper",
        ref: popper,
        visible: showPicker.value,
        "show-arrow": false,
        "fallback-placements": ["bottom", "top", "right", "left"],
        offset: 0,
        "gpu-acceleration": false,
        "popper-class": [vue.unref(ns).be("picker", "panel"), __props.popperClass],
        "popper-style": __props.popperStyle,
        "stop-popper-mouse-event": false,
        pure: "",
        loop: "",
        role: "dialog",
        effect: "light",
        trigger: "click",
        teleported: __props.teleported,
        transition: `${vue.unref(ns).namespace.value}-zoom-in-top`,
        persistent: __props.persistent,
        "append-to": __props.appendTo,
        onShow: handleShowTooltip,
        onHide: _cache[2] || (_cache[2] = ($event) => setShowPicker(false))
      }, {
        content: vue.withCtx(() => [
          vue.withDirectives((vue.openBlock(), vue.createBlock(
            vue.unref(index$6.ElColorPickerPanel),
            vue.mergeProps({
              ref_key: "pickerPanelRef",
              ref: pickerPanelRef
            }, panelProps.value, {
              border: false,
              "validate-event": false,
              onKeydown: vue.withKeys(handleEsc, ["esc"])
            }),
            {
              footer: vue.withCtx(() => [
                vue.createElementVNode("div", null, [
                  __props.clearable ? (vue.openBlock(), vue.createBlock(vue.unref(index$7.ElButton), {
                    key: 0,
                    class: vue.normalizeClass(vue.unref(ns).be("footer", "link-btn")),
                    text: "",
                    size: "small",
                    onClick: clear
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(
                        vue.toDisplayString(vue.unref(t)("el.colorpicker.clear")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
                  vue.createVNode(vue.unref(index$7.ElButton), {
                    plain: "",
                    size: "small",
                    class: vue.normalizeClass(vue.unref(ns).be("footer", "btn")),
                    onClick: confirmValue
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(
                        vue.toDisplayString(vue.unref(t)("el.colorpicker.confirm")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["class"])
                ])
              ]),
              _: 1
              /* STABLE */
            },
            16
            /* FULL_PROPS */
          )), [
            [vue.unref(index$8.default), handleClickOutside, triggerRef.value]
          ])
        ]),
        default: vue.withCtx(() => [
          vue.createElementVNode("div", vue.mergeProps({
            id: vue.unref(buttonId),
            ref_key: "triggerRef",
            ref: triggerRef
          }, _ctx.$attrs, {
            class: btnKls.value,
            role: "button",
            "aria-label": buttonAriaLabel.value,
            "aria-labelledby": buttonAriaLabelledby.value,
            "aria-description": vue.unref(t)("el.colorpicker.description", { color: __props.modelValue || "" }),
            "aria-disabled": vue.unref(colorDisabled),
            tabindex: vue.unref(colorDisabled) ? void 0 : __props.tabindex,
            onKeydown: handleKeyDown,
            onFocus: _cache[0] || (_cache[0] = //@ts-ignore
            (...args) => vue.unref(handleFocus) && vue.unref(handleFocus)(...args)),
            onBlur: _cache[1] || (_cache[1] = //@ts-ignore
            (...args) => vue.unref(handleBlur) && vue.unref(handleBlur)(...args))
          }), [
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(vue.unref(ns).be("picker", "trigger")),
                onClick: handleTrigger
              },
              [
                vue.createElementVNode(
                  "span",
                  {
                    class: vue.normalizeClass([vue.unref(ns).be("picker", "color"), vue.unref(ns).is("alpha", __props.showAlpha)])
                  },
                  [
                    vue.createElementVNode(
                      "span",
                      {
                        class: vue.normalizeClass(vue.unref(ns).be("picker", "color-inner")),
                        style: vue.normalizeStyle({
                          backgroundColor: displayedColor.value
                        })
                      },
                      [
                        vue.withDirectives(vue.createVNode(vue.unref(index$5.ElIcon), {
                          class: vue.normalizeClass([vue.unref(ns).be("picker", "icon"), vue.unref(ns).is("icon-arrow-down")])
                        }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(iconsVue.ArrowDown))
                          ]),
                          _: 1
                          /* STABLE */
                        }, 8, ["class"]), [
                          [vue.vShow, __props.modelValue || showPanelColor.value]
                        ]),
                        vue.withDirectives(vue.createVNode(vue.unref(index$5.ElIcon), {
                          class: vue.normalizeClass([vue.unref(ns).be("picker", "empty"), vue.unref(ns).is("icon-close")])
                        }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(iconsVue.Close))
                          ]),
                          _: 1
                          /* STABLE */
                        }, 8, ["class"]), [
                          [vue.vShow, !__props.modelValue && !showPanelColor.value]
                        ])
                      ],
                      6
                      /* CLASS, STYLE */
                    )
                  ],
                  2
                  /* CLASS */
                )
              ],
              2
              /* CLASS */
            )
          ], 16, _hoisted_1)
        ]),
        _: 1
        /* STABLE */
      }, 8, ["visible", "popper-class", "popper-style", "teleported", "transition", "persistent", "append-to"]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=color-picker.vue2.js.map
