'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var inputNumber = require('./input-number.js');
var vue = require('vue');
var lodashUnified = require('lodash-unified');
var index$4 = require('../../input/index.js');
var index$2 = require('../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var index$3 = require('../../../directives/repeat-click/index.js');
var event$1 = require('../../../utils/dom/event.js');
var index = require('../../../hooks/use-locale/index.js');
var index$1 = require('../../../hooks/use-namespace/index.js');
var useFormItem = require('../../form/src/hooks/use-form-item.js');
var types = require('../../../utils/types.js');
var error = require('../../../utils/error.js');
var useFormCommonProps = require('../../form/src/hooks/use-form-common-props.js');
var event = require('../../../constants/event.js');
var aria = require('../../../constants/aria.js');
var shared = require('@vue/shared');

const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["aria-label"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElInputNumber"
  },
  __name: "input-number",
  props: inputNumber.inputNumberProps,
  emits: inputNumber.inputNumberEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = index.useLocale();
    const ns = index$1.useNamespace("input-number");
    const input = vue.ref();
    const data = vue.reactive({
      currentValue: props.modelValue,
      userInput: null
    });
    const { formItem } = useFormItem.useFormItem();
    const minDisabled = vue.computed(
      () => types.isNumber(props.modelValue) && props.modelValue <= props.min
    );
    const maxDisabled = vue.computed(
      () => types.isNumber(props.modelValue) && props.modelValue >= props.max
    );
    const numPrecision = vue.computed(() => {
      const stepPrecision = getPrecision(props.step);
      if (!types.isUndefined(props.precision)) {
        if (stepPrecision > props.precision) {
          error.debugWarn(
            "InputNumber",
            "precision should not be less than the decimal places of step"
          );
        }
        return props.precision;
      } else {
        return Math.max(getPrecision(props.modelValue), stepPrecision);
      }
    });
    const controlsAtRight = vue.computed(() => {
      return props.controls && props.controlsPosition === "right";
    });
    const inputNumberSize = useFormCommonProps.useFormSize();
    const inputNumberDisabled = useFormCommonProps.useFormDisabled();
    const displayValue = vue.computed(() => {
      if (data.userInput !== null) {
        return data.userInput;
      }
      let currentValue = data.currentValue;
      if (lodashUnified.isNil(currentValue)) return "";
      if (types.isNumber(currentValue)) {
        if (Number.isNaN(currentValue)) return "";
        if (!types.isUndefined(props.precision)) {
          currentValue = currentValue.toFixed(props.precision);
        }
      }
      return currentValue;
    });
    const toPrecision = (num, pre) => {
      if (types.isUndefined(pre)) pre = numPrecision.value;
      if (pre === 0) return Math.round(num);
      let snum = String(num);
      const pointPos = snum.indexOf(".");
      if (pointPos === -1) return num;
      const nums = snum.replace(".", "").split("");
      const datum = nums[pointPos + pre];
      if (!datum) return num;
      const length = snum.length;
      if (snum.charAt(length - 1) === "5") {
        snum = `${snum.slice(0, Math.max(0, length - 1))}6`;
      }
      return Number.parseFloat(Number(snum).toFixed(pre));
    };
    const getPrecision = (value) => {
      if (lodashUnified.isNil(value)) return 0;
      const valueString = value.toString();
      const dotPosition = valueString.indexOf(".");
      let precision = 0;
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1;
      }
      return precision;
    };
    const ensurePrecision = (val, coefficient = 1) => {
      if (!types.isNumber(val)) return data.currentValue;
      if (val >= Number.MAX_SAFE_INTEGER && coefficient === 1) {
        error.debugWarn(
          "InputNumber",
          "The value has reached the maximum safe integer limit."
        );
        return val;
      } else if (val <= Number.MIN_SAFE_INTEGER && coefficient === -1) {
        error.debugWarn(
          "InputNumber",
          "The value has reached the minimum safe integer limit."
        );
        return val;
      }
      return toPrecision(val + props.step * coefficient);
    };
    const handleKeydown = (event) => {
      const code = event$1.getEventCode(event);
      const key = event$1.getEventKey(event);
      if (props.disabledScientific && ["e", "E"].includes(key)) {
        event.preventDefault();
        return;
      }
      switch (code) {
        case aria.EVENT_CODE.up: {
          event.preventDefault();
          increase();
          break;
        }
        case aria.EVENT_CODE.down: {
          event.preventDefault();
          decrease();
          break;
        }
      }
    };
    const increase = () => {
      if (props.readonly || inputNumberDisabled.value || maxDisabled.value) return;
      const value = Number(displayValue.value) || 0;
      const newVal = ensurePrecision(value);
      setCurrentValue(newVal);
      emit(event.INPUT_EVENT, data.currentValue);
      setCurrentValueToModelValue();
    };
    const decrease = () => {
      if (props.readonly || inputNumberDisabled.value || minDisabled.value) return;
      const value = Number(displayValue.value) || 0;
      const newVal = ensurePrecision(value, -1);
      setCurrentValue(newVal);
      emit(event.INPUT_EVENT, data.currentValue);
      setCurrentValueToModelValue();
    };
    const verifyValue = (value, update) => {
      const { max, min, step, precision, stepStrictly, valueOnClear } = props;
      if (max < min) {
        error.throwError("InputNumber", "min should not be greater than max.");
      }
      let newVal = Number(value);
      if (lodashUnified.isNil(value) || Number.isNaN(newVal)) {
        return null;
      }
      if (value === "") {
        if (valueOnClear === null) {
          return null;
        }
        newVal = shared.isString(valueOnClear) ? { min, max }[valueOnClear] : valueOnClear;
      }
      if (stepStrictly) {
        newVal = toPrecision(
          Math.round(toPrecision(newVal / step)) * step,
          precision
        );
        if (newVal !== value) {
          update && emit(event.UPDATE_MODEL_EVENT, newVal);
        }
      }
      if (!types.isUndefined(precision)) {
        newVal = toPrecision(newVal, precision);
      }
      if (newVal > max || newVal < min) {
        newVal = newVal > max ? max : min;
        update && emit(event.UPDATE_MODEL_EVENT, newVal);
      }
      return newVal;
    };
    const setCurrentValue = (value, emitChange = true) => {
      var _a;
      const oldVal = data.currentValue;
      const newVal = verifyValue(value);
      if (!emitChange) {
        emit(event.UPDATE_MODEL_EVENT, newVal);
        return;
      }
      data.userInput = null;
      if (oldVal === newVal && value) return;
      emit(event.UPDATE_MODEL_EVENT, newVal);
      if (oldVal !== newVal) {
        emit(event.CHANGE_EVENT, newVal, oldVal);
      }
      if (props.validateEvent) {
        (_a = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a.call(formItem, "change").catch((err) => error.debugWarn(err));
      }
      data.currentValue = newVal;
    };
    const handleInput = (value) => {
      data.userInput = value;
      const newVal = value === "" ? null : Number(value);
      emit(event.INPUT_EVENT, newVal);
      setCurrentValue(newVal, false);
    };
    const handleInputChange = (value) => {
      const newVal = value !== "" ? Number(value) : "";
      if (types.isNumber(newVal) && !Number.isNaN(newVal) || value === "") {
        setCurrentValue(newVal);
      }
      setCurrentValueToModelValue();
      data.userInput = null;
    };
    const focus = () => {
      var _a, _b;
      (_b = (_a = input.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    };
    const blur = () => {
      var _a, _b;
      (_b = (_a = input.value) == null ? void 0 : _a.blur) == null ? void 0 : _b.call(_a);
    };
    const handleFocus = (event) => {
      emit("focus", event);
    };
    const handleBlur = (event) => {
      var _a, _b;
      data.userInput = null;
      if (data.currentValue === null && ((_a = input.value) == null ? void 0 : _a.input)) {
        input.value.input.value = "";
      }
      emit("blur", event);
      if (props.validateEvent) {
        (_b = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _b.call(formItem, "blur").catch((err) => error.debugWarn(err));
      }
    };
    const setCurrentValueToModelValue = () => {
      if (data.currentValue !== props.modelValue) {
        data.currentValue = props.modelValue;
      }
    };
    const handleWheel = (e) => {
      if (document.activeElement === e.target) e.preventDefault();
    };
    vue.watch(
      () => props.modelValue,
      (value, oldValue) => {
        const newValue = verifyValue(value, true);
        if (data.userInput === null && newValue !== oldValue) {
          data.currentValue = newValue;
        }
      },
      { immediate: true }
    );
    vue.watch(
      () => props.precision,
      () => {
        data.currentValue = verifyValue(props.modelValue);
      }
    );
    vue.onMounted(() => {
      var _a;
      const { min, max, modelValue } = props;
      const innerInput = (_a = input.value) == null ? void 0 : _a.input;
      innerInput.setAttribute("role", "spinbutton");
      if (Number.isFinite(max)) {
        innerInput.setAttribute("aria-valuemax", String(max));
      } else {
        innerInput.removeAttribute("aria-valuemax");
      }
      if (Number.isFinite(min)) {
        innerInput.setAttribute("aria-valuemin", String(min));
      } else {
        innerInput.removeAttribute("aria-valuemin");
      }
      innerInput.setAttribute(
        "aria-valuenow",
        data.currentValue || data.currentValue === 0 ? String(data.currentValue) : ""
      );
      innerInput.setAttribute("aria-disabled", String(inputNumberDisabled.value));
      if (!types.isNumber(modelValue) && modelValue != null) {
        let val = Number(modelValue);
        if (Number.isNaN(val)) {
          val = null;
        }
        emit(event.UPDATE_MODEL_EVENT, val);
      }
      innerInput.addEventListener("wheel", handleWheel, { passive: false });
    });
    vue.onUpdated(() => {
      var _a, _b;
      const innerInput = (_a = input.value) == null ? void 0 : _a.input;
      innerInput == null ? void 0 : innerInput.setAttribute("aria-valuenow", `${(_b = data.currentValue) != null ? _b : ""}`);
    });
    __expose({
      /** @description get focus the input component */
      focus,
      /** @description remove focus the input component */
      blur
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass([
            vue.unref(ns).b(),
            vue.unref(ns).m(vue.unref(inputNumberSize)),
            vue.unref(ns).is("disabled", vue.unref(inputNumberDisabled)),
            vue.unref(ns).is("without-controls", !__props.controls),
            vue.unref(ns).is("controls-right", controlsAtRight.value),
            vue.unref(ns).is(__props.align, !!__props.align)
          ]),
          onDragstart: _cache[0] || (_cache[0] = vue.withModifiers(() => {
          }, ["prevent"]))
        },
        [
          __props.controls ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("span", {
            key: 0,
            role: "button",
            "aria-label": vue.unref(t)("el.inputNumber.decrease"),
            class: vue.normalizeClass([vue.unref(ns).e("decrease"), vue.unref(ns).is("disabled", minDisabled.value)]),
            onKeydown: vue.withKeys(decrease, ["enter"])
          }, [
            vue.renderSlot(_ctx.$slots, "decrease-icon", {}, () => [
              vue.createVNode(vue.unref(index$2.ElIcon), null, {
                default: vue.withCtx(() => [
                  controlsAtRight.value ? (vue.openBlock(), vue.createBlock(vue.unref(iconsVue.ArrowDown), { key: 0 })) : (vue.openBlock(), vue.createBlock(vue.unref(iconsVue.Minus), { key: 1 }))
                ]),
                _: 1
                /* STABLE */
              })
            ])
          ], 42, _hoisted_1)), [
            [vue.unref(index$3.vRepeatClick), decrease]
          ]) : vue.createCommentVNode("v-if", true),
          __props.controls ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("span", {
            key: 1,
            role: "button",
            "aria-label": vue.unref(t)("el.inputNumber.increase"),
            class: vue.normalizeClass([vue.unref(ns).e("increase"), vue.unref(ns).is("disabled", maxDisabled.value)]),
            onKeydown: vue.withKeys(increase, ["enter"])
          }, [
            vue.renderSlot(_ctx.$slots, "increase-icon", {}, () => [
              vue.createVNode(vue.unref(index$2.ElIcon), null, {
                default: vue.withCtx(() => [
                  controlsAtRight.value ? (vue.openBlock(), vue.createBlock(vue.unref(iconsVue.ArrowUp), { key: 0 })) : (vue.openBlock(), vue.createBlock(vue.unref(iconsVue.Plus), { key: 1 }))
                ]),
                _: 1
                /* STABLE */
              })
            ])
          ], 42, _hoisted_2)), [
            [vue.unref(index$3.vRepeatClick), increase]
          ]) : vue.createCommentVNode("v-if", true),
          vue.createVNode(vue.unref(index$4.ElInput), {
            id: __props.id,
            ref_key: "input",
            ref: input,
            type: "number",
            step: __props.step,
            "model-value": displayValue.value,
            placeholder: __props.placeholder,
            readonly: __props.readonly,
            disabled: vue.unref(inputNumberDisabled),
            size: vue.unref(inputNumberSize),
            max: __props.max,
            min: __props.min,
            name: __props.name,
            "aria-label": __props.ariaLabel,
            "validate-event": false,
            inputmode: __props.inputmode,
            onKeydown: handleKeydown,
            onBlur: handleBlur,
            onFocus: handleFocus,
            onInput: handleInput,
            onChange: handleInputChange
          }, vue.createSlots({
            _: 2
            /* DYNAMIC */
          }, [
            _ctx.$slots.prefix ? {
              name: "prefix",
              fn: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "prefix")
              ]),
              key: "0"
            } : void 0,
            _ctx.$slots.suffix ? {
              name: "suffix",
              fn: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "suffix")
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["id", "step", "model-value", "placeholder", "readonly", "disabled", "size", "max", "min", "name", "aria-label", "inputmode"])
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=input-number.vue2.js.map
