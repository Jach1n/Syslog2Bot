'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var core = require('@vueuse/core');
var index$4 = require('../../../input/index.js');
var index$5 = require('../../../icon/index.js');
var index$3 = require('../../../tooltip/index.js');
var iconsVue = require('@element-plus/icons-vue');
var utils = require('../utils.js');
var constants = require('../constants.js');
var useCommonPicker = require('../composables/use-common-picker.js');
var props = require('./props.js');
var pickerRangeTrigger_vue_vue_type_script_setup_true_lang = require('./picker-range-trigger.vue2.js');
var index$1 = require('../../../../hooks/use-empty-values/index.js');
var event = require('../../../../constants/event.js');
var index = require('../../../../hooks/use-namespace/index.js');
var useFormItem = require('../../../form/src/hooks/use-form-item.js');
var useFormCommonProps = require('../../../form/src/hooks/use-form-common-props.js');
var index$2 = require('../../../../hooks/use-focus-controller/index.js');
var error = require('../../../../utils/error.js');
var shared = require('@vue/shared');
var event$1 = require('../../../../utils/dom/event.js');
var aria = require('../../../../constants/aria.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "Picker"
  },
  __name: "picker",
  props: props.timePickerDefaultProps,
  emits: [
    event.UPDATE_MODEL_EVENT,
    event.CHANGE_EVENT,
    "focus",
    "blur",
    "clear",
    "calendar-change",
    "panel-change",
    "visible-change",
    "keydown"
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const attrs = vue.useAttrs();
    const nsDate = index.useNamespace("date");
    const nsInput = index.useNamespace("input");
    const nsRange = index.useNamespace("range");
    const { formItem } = useFormItem.useFormItem();
    const elPopperOptions = vue.inject(
      constants.PICKER_POPPER_OPTIONS_INJECTION_KEY,
      {}
    );
    const emptyValues = index$1.useEmptyValues(props, null);
    const refPopper = vue.ref();
    const inputRef = vue.ref();
    const valueOnOpen = vue.ref(null);
    let hasJustTabExitedInput = false;
    const pickerDisabled = useFormCommonProps.useFormDisabled();
    const commonPicker = useCommonPicker.useCommonPicker(props, emit);
    const {
      parsedValue,
      pickerActualVisible,
      userInput,
      pickerVisible,
      pickerOptions,
      valueIsEmpty,
      emitInput,
      onPick,
      onSetPickerOption,
      onCalendarChange,
      onPanelChange
    } = commonPicker;
    const { isFocused, handleFocus, handleBlur } = index$2.useFocusController(inputRef, {
      disabled: pickerDisabled,
      beforeFocus() {
        return props.readonly;
      },
      afterFocus() {
        if (!props.automaticDropdown) return;
        pickerVisible.value = true;
      },
      beforeBlur(event) {
        var _a;
        return !hasJustTabExitedInput && ((_a = refPopper.value) == null ? void 0 : _a.isFocusInsideContent(event));
      },
      afterBlur() {
        handleChange();
        pickerVisible.value = false;
        hasJustTabExitedInput = false;
        props.validateEvent && (formItem == null ? void 0 : formItem.validate("blur").catch((err) => error.debugWarn(err)));
      }
    });
    const hovering = vue.ref(false);
    const rangeInputKls = vue.computed(() => [
      nsDate.b("editor"),
      nsDate.bm("editor", props.type),
      nsInput.e("wrapper"),
      nsDate.is("disabled", pickerDisabled.value),
      nsDate.is("active", pickerVisible.value),
      nsRange.b("editor"),
      pickerSize ? nsRange.bm("editor", pickerSize.value) : "",
      attrs.class
    ]);
    const clearIconKls = vue.computed(() => [
      nsInput.e("icon"),
      nsRange.e("close-icon"),
      !showClearBtn.value ? nsRange.em("close-icon", "hidden") : ""
    ]);
    vue.watch(pickerVisible, (val) => {
      if (!val) {
        userInput.value = null;
        vue.nextTick(() => {
          emitChange(props.modelValue);
        });
      } else {
        vue.nextTick(() => {
          if (val) {
            valueOnOpen.value = props.modelValue;
          }
        });
      }
    });
    const emitChange = (val, isClear) => {
      if (isClear || !utils.valueEquals(val, valueOnOpen.value)) {
        emit(event.CHANGE_EVENT, val);
        isClear && (valueOnOpen.value = val);
        props.validateEvent && (formItem == null ? void 0 : formItem.validate("change").catch((err) => error.debugWarn(err)));
      }
    };
    const emitKeydown = (e) => {
      emit("keydown", e);
    };
    const refInput = vue.computed(() => {
      if (inputRef.value) {
        return Array.from(
          inputRef.value.$el.querySelectorAll("input")
        );
      }
      return [];
    });
    const setSelectionRange = (start, end, pos) => {
      const _inputs = refInput.value;
      if (!_inputs.length) return;
      if (!pos || pos === "min") {
        _inputs[0].setSelectionRange(start, end);
        _inputs[0].focus();
      } else if (pos === "max") {
        _inputs[1].setSelectionRange(start, end);
        _inputs[1].focus();
      }
    };
    const onBeforeShow = () => {
      pickerActualVisible.value = true;
    };
    const onShow = () => {
      emit("visible-change", true);
    };
    const onHide = () => {
      pickerActualVisible.value = false;
      pickerVisible.value = false;
      emit("visible-change", false);
    };
    const handleOpen = () => {
      pickerVisible.value = true;
    };
    const handleClose = () => {
      pickerVisible.value = false;
    };
    const displayValue = vue.computed(() => {
      const formattedValue = formatToString(parsedValue.value);
      if (shared.isArray(userInput.value)) {
        return [
          userInput.value[0] || formattedValue && formattedValue[0] || "",
          userInput.value[1] || formattedValue && formattedValue[1] || ""
        ];
      } else if (userInput.value !== null) {
        return userInput.value;
      }
      if (!isTimePicker.value && valueIsEmpty.value) return "";
      if (!pickerVisible.value && valueIsEmpty.value) return "";
      if (formattedValue) {
        return isDatesPicker.value || isMonthsPicker.value || isYearsPicker.value ? formattedValue.join(", ") : formattedValue;
      }
      return "";
    });
    const isTimeLikePicker = vue.computed(() => props.type.includes("time"));
    const isTimePicker = vue.computed(() => props.type.startsWith("time"));
    const isDatesPicker = vue.computed(() => props.type === "dates");
    const isMonthsPicker = vue.computed(() => props.type === "months");
    const isYearsPicker = vue.computed(() => props.type === "years");
    const triggerIcon = vue.computed(
      () => props.prefixIcon || (isTimeLikePicker.value ? iconsVue.Clock : iconsVue.Calendar)
    );
    const showClearBtn = vue.computed(
      () => props.clearable && !pickerDisabled.value && !props.readonly && !valueIsEmpty.value && (hovering.value || isFocused.value)
    );
    const onClear = (event) => {
      if (props.readonly || pickerDisabled.value) return;
      if (showClearBtn.value) {
        event == null ? void 0 : event.stopPropagation();
        if (pickerOptions.value.handleClear) {
          pickerOptions.value.handleClear();
        } else {
          emitInput(emptyValues.valueOnClear.value);
        }
        emitChange(emptyValues.valueOnClear.value, true);
        onHide();
      }
      emit("clear");
    };
    const onMouseDownInput = async (event) => {
      var _a;
      if (props.readonly || pickerDisabled.value) return;
      if (((_a = event.target) == null ? void 0 : _a.tagName) !== "INPUT" || isFocused.value || !props.automaticDropdown) {
        pickerVisible.value = true;
      }
    };
    const onMouseEnter = () => {
      if (props.readonly || pickerDisabled.value) return;
      if (!valueIsEmpty.value && props.clearable) {
        hovering.value = true;
      }
    };
    const onMouseLeave = () => {
      hovering.value = false;
    };
    const onTouchStartInput = (event) => {
      var _a;
      if (props.readonly || pickerDisabled.value) return;
      if (((_a = event.touches[0].target) == null ? void 0 : _a.tagName) !== "INPUT" || isFocused.value || !props.automaticDropdown) {
        pickerVisible.value = true;
      }
    };
    const isRangeInput = vue.computed(() => {
      return props.type.includes("range");
    });
    const pickerSize = useFormCommonProps.useFormSize();
    const popperEl = vue.computed(() => {
      var _a, _b;
      return (_b = (_a = vue.unref(refPopper)) == null ? void 0 : _a.popperRef) == null ? void 0 : _b.contentRef;
    });
    const stophandle = core.onClickOutside(
      inputRef,
      (e) => {
        const unrefedPopperEl = vue.unref(popperEl);
        const inputEl = core.unrefElement(inputRef);
        if (unrefedPopperEl && (e.target === unrefedPopperEl || e.composedPath().includes(unrefedPopperEl)) || e.target === inputEl || inputEl && e.composedPath().includes(inputEl))
          return;
        pickerVisible.value = false;
      }
    );
    vue.onBeforeUnmount(() => {
      stophandle == null ? void 0 : stophandle();
    });
    const handleChange = () => {
      if (userInput.value) {
        const value = parseUserInputToDayjs(displayValue.value);
        if (value) {
          if (isValidValue(value)) {
            emitInput(utils.dayOrDaysToDate(value));
          }
          userInput.value = null;
        }
      }
      if (userInput.value === "") {
        emitInput(emptyValues.valueOnClear.value);
        emitChange(emptyValues.valueOnClear.value, true);
        userInput.value = null;
      }
    };
    const parseUserInputToDayjs = (value) => {
      if (!value) return null;
      return pickerOptions.value.parseUserInput(value);
    };
    const formatToString = (value) => {
      if (!value) return null;
      const res = shared.isArray(value) ? value.map((_) => _.format(props.format)) : value.format(props.format);
      return res;
    };
    const isValidValue = (value) => {
      return pickerOptions.value.isValidValue(value);
    };
    const handleKeydownInput = async (event) => {
      if (props.readonly || pickerDisabled.value) return;
      const code = event$1.getEventCode(event);
      emitKeydown(event);
      if (code === aria.EVENT_CODE.esc) {
        if (pickerVisible.value === true) {
          pickerVisible.value = false;
          event.preventDefault();
          event.stopPropagation();
        }
        return;
      }
      if (code === aria.EVENT_CODE.down) {
        if (pickerOptions.value.handleFocusPicker) {
          event.preventDefault();
          event.stopPropagation();
        }
        if (pickerVisible.value === false) {
          pickerVisible.value = true;
          await vue.nextTick();
        }
        if (pickerOptions.value.handleFocusPicker) {
          pickerOptions.value.handleFocusPicker();
          return;
        }
      }
      if (code === aria.EVENT_CODE.tab) {
        hasJustTabExitedInput = true;
        return;
      }
      if (code === aria.EVENT_CODE.enter || code === aria.EVENT_CODE.numpadEnter) {
        if (!pickerVisible.value) {
          pickerVisible.value = true;
        } else if (userInput.value === null || userInput.value === "" || isValidValue(parseUserInputToDayjs(displayValue.value))) {
          handleChange();
          pickerVisible.value = false;
        }
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (userInput.value) {
        event.stopPropagation();
        return;
      }
      if (pickerOptions.value.handleKeydownInput) {
        pickerOptions.value.handleKeydownInput(event);
      }
    };
    const onUserInput = (e) => {
      userInput.value = e;
      if (!pickerVisible.value) {
        pickerVisible.value = true;
      }
    };
    const handleStartInput = (event) => {
      const target = event.target;
      if (userInput.value) {
        userInput.value = [target.value, userInput.value[1]];
      } else {
        userInput.value = [target.value, null];
      }
    };
    const handleEndInput = (event) => {
      const target = event.target;
      if (userInput.value) {
        userInput.value = [userInput.value[0], target.value];
      } else {
        userInput.value = [null, target.value];
      }
    };
    const handleStartChange = () => {
      var _a;
      const values = userInput.value;
      const value = parseUserInputToDayjs(values && values[0]);
      const parsedVal = vue.unref(parsedValue);
      if (value && value.isValid()) {
        userInput.value = [
          formatToString(value),
          ((_a = displayValue.value) == null ? void 0 : _a[1]) || null
        ];
        const newValue = [value, parsedVal && (parsedVal[1] || null)];
        if (isValidValue(newValue)) {
          emitInput(utils.dayOrDaysToDate(newValue));
          userInput.value = null;
        }
      }
    };
    const handleEndChange = () => {
      var _a;
      const values = vue.unref(userInput);
      const value = parseUserInputToDayjs(values && values[1]);
      const parsedVal = vue.unref(parsedValue);
      if (value && value.isValid()) {
        userInput.value = [
          ((_a = vue.unref(displayValue)) == null ? void 0 : _a[0]) || null,
          formatToString(value)
        ];
        const newValue = [parsedVal && parsedVal[0], value];
        if (isValidValue(newValue)) {
          emitInput(utils.dayOrDaysToDate(newValue));
          userInput.value = null;
        }
      }
    };
    const focus = () => {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.focus();
    };
    const blur = () => {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.blur();
    };
    vue.provide(constants.PICKER_BASE_INJECTION_KEY, {
      props,
      emptyValues
    });
    vue.provide(constants.ROOT_COMMON_PICKER_INJECTION_KEY, commonPicker);
    __expose({
      /**
       * @description focus input box.
       */
      focus,
      /**
       * @description blur input box.
       */
      blur,
      /**
       * @description opens picker
       */
      handleOpen,
      /**
       * @description closes picker
       */
      handleClose,
      /**
       * @description pick item manually
       */
      onPick
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(index$3.ElTooltip), vue.mergeProps({
        ref_key: "refPopper",
        ref: refPopper,
        visible: vue.unref(pickerVisible),
        effect: "light",
        pure: "",
        trigger: "click"
      }, _ctx.$attrs, {
        role: "dialog",
        teleported: "",
        transition: `${vue.unref(nsDate).namespace.value}-zoom-in-top`,
        "popper-class": [`${vue.unref(nsDate).namespace.value}-picker__popper`, _ctx.popperClass],
        "popper-style": _ctx.popperStyle,
        "popper-options": vue.unref(elPopperOptions),
        "fallback-placements": _ctx.fallbackPlacements,
        "gpu-acceleration": false,
        placement: _ctx.placement,
        "stop-popper-mouse-event": false,
        "hide-after": 0,
        persistent: "",
        onBeforeShow,
        onShow,
        onHide
      }), {
        default: vue.withCtx(() => [
          !isRangeInput.value ? (vue.openBlock(), vue.createBlock(vue.unref(index$4.ElInput), {
            key: 0,
            id: (
              // https://github.com/vuejs/language-tools/issues/2104#issuecomment-3092541527
              _ctx.id
            ),
            ref_key: "inputRef",
            ref: inputRef,
            "container-role": "combobox",
            "model-value": (
              // https://github.com/vuejs/language-tools/issues/2104#issuecomment-3092541527
              displayValue.value
            ),
            name: (
              // https://github.com/vuejs/language-tools/issues/2104#issuecomment-3092541527
              _ctx.name
            ),
            size: vue.unref(pickerSize),
            disabled: vue.unref(pickerDisabled),
            placeholder: _ctx.placeholder,
            class: vue.normalizeClass([
              vue.unref(nsDate).b("editor"),
              vue.unref(nsDate).bm("editor", _ctx.type),
              vue.unref(nsDate).is("focus", vue.unref(pickerVisible)),
              _ctx.$attrs.class
            ]),
            style: vue.normalizeStyle(_ctx.$attrs.style),
            readonly: !_ctx.editable || _ctx.readonly || isDatesPicker.value || isMonthsPicker.value || isYearsPicker.value || _ctx.type === "week",
            "aria-label": _ctx.ariaLabel,
            tabindex: _ctx.tabindex,
            "validate-event": false,
            onInput: onUserInput,
            onFocus: vue.unref(handleFocus),
            onBlur: vue.unref(handleBlur),
            onKeydown: handleKeydownInput,
            onChange: handleChange,
            onMousedown: onMouseDownInput,
            onMouseenter: onMouseEnter,
            onMouseleave: onMouseLeave,
            onTouchstartPassive: onTouchStartInput,
            onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
            }, ["stop"]))
          }, {
            prefix: vue.withCtx(() => [
              triggerIcon.value ? (vue.openBlock(), vue.createBlock(vue.unref(index$5.ElIcon), {
                key: 0,
                class: vue.normalizeClass(vue.unref(nsInput).e("icon")),
                onMousedown: vue.withModifiers(onMouseDownInput, ["prevent"]),
                onTouchstartPassive: onTouchStartInput
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(triggerIcon.value)))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
            ]),
            suffix: vue.withCtx(() => [
              showClearBtn.value && _ctx.clearIcon ? (vue.openBlock(), vue.createBlock(vue.unref(index$5.ElIcon), {
                key: 0,
                class: vue.normalizeClass(`${vue.unref(nsInput).e("icon")} clear-icon`),
                onMousedown: vue.withModifiers(vue.unref(shared.NOOP), ["prevent"]),
                onClick: onClear
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.clearIcon)))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class", "onMousedown"])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          }, 8, ["id", "model-value", "name", "size", "disabled", "placeholder", "class", "style", "readonly", "aria-label", "tabindex", "onFocus", "onBlur"])) : (vue.openBlock(), vue.createBlock(pickerRangeTrigger_vue_vue_type_script_setup_true_lang.default, {
            key: 1,
            id: (
              // https://github.com/vuejs/language-tools/issues/2104#issuecomment-3092541527
              _ctx.id
            ),
            ref_key: "inputRef",
            ref: inputRef,
            "model-value": displayValue.value,
            name: (
              // https://github.com/vuejs/language-tools/issues/2104#issuecomment-3092541527
              _ctx.name
            ),
            disabled: vue.unref(pickerDisabled),
            readonly: !_ctx.editable || _ctx.readonly,
            "start-placeholder": _ctx.startPlaceholder,
            "end-placeholder": _ctx.endPlaceholder,
            class: vue.normalizeClass(rangeInputKls.value),
            style: vue.normalizeStyle(_ctx.$attrs.style),
            "aria-label": _ctx.ariaLabel,
            tabindex: _ctx.tabindex,
            autocomplete: "off",
            role: "combobox",
            onClick: onMouseDownInput,
            onFocus: vue.unref(handleFocus),
            onBlur: vue.unref(handleBlur),
            onStartInput: handleStartInput,
            onStartChange: handleStartChange,
            onEndInput: handleEndInput,
            onEndChange: handleEndChange,
            onMousedown: onMouseDownInput,
            onMouseenter: onMouseEnter,
            onMouseleave: onMouseLeave,
            onTouchstartPassive: onTouchStartInput,
            onKeydown: handleKeydownInput
          }, {
            prefix: vue.withCtx(() => [
              triggerIcon.value ? (vue.openBlock(), vue.createBlock(vue.unref(index$5.ElIcon), {
                key: 0,
                class: vue.normalizeClass([vue.unref(nsInput).e("icon"), vue.unref(nsRange).e("icon")])
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(triggerIcon.value)))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
            ]),
            "range-separator": vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "range-separator", {}, () => [
                vue.createElementVNode(
                  "span",
                  {
                    class: vue.normalizeClass(vue.unref(nsRange).b("separator"))
                  },
                  vue.toDisplayString(_ctx.rangeSeparator),
                  3
                  /* TEXT, CLASS */
                )
              ])
            ]),
            suffix: vue.withCtx(() => [
              _ctx.clearIcon ? (vue.openBlock(), vue.createBlock(vue.unref(index$5.ElIcon), {
                key: 0,
                class: vue.normalizeClass(clearIconKls.value),
                onMousedown: vue.withModifiers(vue.unref(shared.NOOP), ["prevent"]),
                onClick: onClear
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.clearIcon)))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class", "onMousedown"])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["id", "model-value", "name", "disabled", "readonly", "start-placeholder", "end-placeholder", "class", "style", "aria-label", "tabindex", "onFocus", "onBlur"]))
        ]),
        content: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {
            visible: vue.unref(pickerVisible),
            actualVisible: vue.unref(pickerActualVisible),
            parsedValue: vue.unref(parsedValue),
            format: _ctx.format,
            dateFormat: _ctx.dateFormat,
            timeFormat: _ctx.timeFormat,
            unlinkPanels: _ctx.unlinkPanels,
            type: _ctx.type,
            defaultValue: _ctx.defaultValue,
            showNow: _ctx.showNow,
            showConfirm: _ctx.showConfirm,
            showFooter: _ctx.showFooter,
            showWeekNumber: _ctx.showWeekNumber,
            onPick: _cache[1] || (_cache[1] = //@ts-ignore
            (...args) => vue.unref(onPick) && vue.unref(onPick)(...args)),
            onSelectRange: setSelectionRange,
            onSetPickerOption: _cache[2] || (_cache[2] = //@ts-ignore
            (...args) => vue.unref(onSetPickerOption) && vue.unref(onSetPickerOption)(...args)),
            onCalendarChange: _cache[3] || (_cache[3] = //@ts-ignore
            (...args) => vue.unref(onCalendarChange) && vue.unref(onCalendarChange)(...args)),
            onClear,
            onPanelChange: _cache[4] || (_cache[4] = //@ts-ignore
            (...args) => vue.unref(onPanelChange) && vue.unref(onPanelChange)(...args)),
            onMousedown: _cache[5] || (_cache[5] = vue.withModifiers(() => {
            }, ["stop"]))
          })
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["visible", "transition", "popper-class", "popper-style", "popper-options", "fallback-placements", "placement"]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=picker.vue2.js.map
