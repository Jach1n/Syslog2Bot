import { defineComponent, useAttrs, inject, ref, computed, watch, nextTick, unref, onBeforeUnmount, provide, createBlock, openBlock, mergeProps, withCtx, renderSlot, withModifiers, normalizeStyle, normalizeClass, createCommentVNode, resolveDynamicComponent, createElementVNode, toDisplayString } from 'vue';
import { onClickOutside, unrefElement } from '@vueuse/core';
import { ElInput } from '../../../input/index.mjs';
import { ElIcon } from '../../../icon/index.mjs';
import { ElTooltip } from '../../../tooltip/index.mjs';
import { Clock, Calendar } from '@element-plus/icons-vue';
import { valueEquals, dayOrDaysToDate } from '../utils.mjs';
import { PICKER_POPPER_OPTIONS_INJECTION_KEY, PICKER_BASE_INJECTION_KEY, ROOT_COMMON_PICKER_INJECTION_KEY } from '../constants.mjs';
import { useCommonPicker } from '../composables/use-common-picker.mjs';
import { timePickerDefaultProps } from './props.mjs';
import _sfc_main$1 from './picker-range-trigger.vue2.mjs';
import { useEmptyValues } from '../../../../hooks/use-empty-values/index.mjs';
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../../../../constants/event.mjs';
import { useNamespace } from '../../../../hooks/use-namespace/index.mjs';
import { useFormItem } from '../../../form/src/hooks/use-form-item.mjs';
import { useFormDisabled, useFormSize } from '../../../form/src/hooks/use-form-common-props.mjs';
import { useFocusController } from '../../../../hooks/use-focus-controller/index.mjs';
import { debugWarn } from '../../../../utils/error.mjs';
import { isArray, NOOP } from '@vue/shared';
import { getEventCode } from '../../../../utils/dom/event.mjs';
import { EVENT_CODE } from '../../../../constants/aria.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Picker"
  },
  __name: "picker",
  props: timePickerDefaultProps,
  emits: [
    UPDATE_MODEL_EVENT,
    CHANGE_EVENT,
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
    const attrs = useAttrs();
    const nsDate = useNamespace("date");
    const nsInput = useNamespace("input");
    const nsRange = useNamespace("range");
    const { formItem } = useFormItem();
    const elPopperOptions = inject(
      PICKER_POPPER_OPTIONS_INJECTION_KEY,
      {}
    );
    const emptyValues = useEmptyValues(props, null);
    const refPopper = ref();
    const inputRef = ref();
    const valueOnOpen = ref(null);
    let hasJustTabExitedInput = false;
    const pickerDisabled = useFormDisabled();
    const commonPicker = useCommonPicker(props, emit);
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
    const { isFocused, handleFocus, handleBlur } = useFocusController(inputRef, {
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
        props.validateEvent && (formItem == null ? void 0 : formItem.validate("blur").catch((err) => debugWarn(err)));
      }
    });
    const hovering = ref(false);
    const rangeInputKls = computed(() => [
      nsDate.b("editor"),
      nsDate.bm("editor", props.type),
      nsInput.e("wrapper"),
      nsDate.is("disabled", pickerDisabled.value),
      nsDate.is("active", pickerVisible.value),
      nsRange.b("editor"),
      pickerSize ? nsRange.bm("editor", pickerSize.value) : "",
      attrs.class
    ]);
    const clearIconKls = computed(() => [
      nsInput.e("icon"),
      nsRange.e("close-icon"),
      !showClearBtn.value ? nsRange.em("close-icon", "hidden") : ""
    ]);
    watch(pickerVisible, (val) => {
      if (!val) {
        userInput.value = null;
        nextTick(() => {
          emitChange(props.modelValue);
        });
      } else {
        nextTick(() => {
          if (val) {
            valueOnOpen.value = props.modelValue;
          }
        });
      }
    });
    const emitChange = (val, isClear) => {
      if (isClear || !valueEquals(val, valueOnOpen.value)) {
        emit(CHANGE_EVENT, val);
        isClear && (valueOnOpen.value = val);
        props.validateEvent && (formItem == null ? void 0 : formItem.validate("change").catch((err) => debugWarn(err)));
      }
    };
    const emitKeydown = (e) => {
      emit("keydown", e);
    };
    const refInput = computed(() => {
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
    const displayValue = computed(() => {
      const formattedValue = formatToString(parsedValue.value);
      if (isArray(userInput.value)) {
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
    const isTimeLikePicker = computed(() => props.type.includes("time"));
    const isTimePicker = computed(() => props.type.startsWith("time"));
    const isDatesPicker = computed(() => props.type === "dates");
    const isMonthsPicker = computed(() => props.type === "months");
    const isYearsPicker = computed(() => props.type === "years");
    const triggerIcon = computed(
      () => props.prefixIcon || (isTimeLikePicker.value ? Clock : Calendar)
    );
    const showClearBtn = computed(
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
    const isRangeInput = computed(() => {
      return props.type.includes("range");
    });
    const pickerSize = useFormSize();
    const popperEl = computed(() => {
      var _a, _b;
      return (_b = (_a = unref(refPopper)) == null ? void 0 : _a.popperRef) == null ? void 0 : _b.contentRef;
    });
    const stophandle = onClickOutside(
      inputRef,
      (e) => {
        const unrefedPopperEl = unref(popperEl);
        const inputEl = unrefElement(inputRef);
        if (unrefedPopperEl && (e.target === unrefedPopperEl || e.composedPath().includes(unrefedPopperEl)) || e.target === inputEl || inputEl && e.composedPath().includes(inputEl))
          return;
        pickerVisible.value = false;
      }
    );
    onBeforeUnmount(() => {
      stophandle == null ? void 0 : stophandle();
    });
    const handleChange = () => {
      if (userInput.value) {
        const value = parseUserInputToDayjs(displayValue.value);
        if (value) {
          if (isValidValue(value)) {
            emitInput(dayOrDaysToDate(value));
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
      const res = isArray(value) ? value.map((_) => _.format(props.format)) : value.format(props.format);
      return res;
    };
    const isValidValue = (value) => {
      return pickerOptions.value.isValidValue(value);
    };
    const handleKeydownInput = async (event) => {
      if (props.readonly || pickerDisabled.value) return;
      const code = getEventCode(event);
      emitKeydown(event);
      if (code === EVENT_CODE.esc) {
        if (pickerVisible.value === true) {
          pickerVisible.value = false;
          event.preventDefault();
          event.stopPropagation();
        }
        return;
      }
      if (code === EVENT_CODE.down) {
        if (pickerOptions.value.handleFocusPicker) {
          event.preventDefault();
          event.stopPropagation();
        }
        if (pickerVisible.value === false) {
          pickerVisible.value = true;
          await nextTick();
        }
        if (pickerOptions.value.handleFocusPicker) {
          pickerOptions.value.handleFocusPicker();
          return;
        }
      }
      if (code === EVENT_CODE.tab) {
        hasJustTabExitedInput = true;
        return;
      }
      if (code === EVENT_CODE.enter || code === EVENT_CODE.numpadEnter) {
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
      const parsedVal = unref(parsedValue);
      if (value && value.isValid()) {
        userInput.value = [
          formatToString(value),
          ((_a = displayValue.value) == null ? void 0 : _a[1]) || null
        ];
        const newValue = [value, parsedVal && (parsedVal[1] || null)];
        if (isValidValue(newValue)) {
          emitInput(dayOrDaysToDate(newValue));
          userInput.value = null;
        }
      }
    };
    const handleEndChange = () => {
      var _a;
      const values = unref(userInput);
      const value = parseUserInputToDayjs(values && values[1]);
      const parsedVal = unref(parsedValue);
      if (value && value.isValid()) {
        userInput.value = [
          ((_a = unref(displayValue)) == null ? void 0 : _a[0]) || null,
          formatToString(value)
        ];
        const newValue = [parsedVal && parsedVal[0], value];
        if (isValidValue(newValue)) {
          emitInput(dayOrDaysToDate(newValue));
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
    provide(PICKER_BASE_INJECTION_KEY, {
      props,
      emptyValues
    });
    provide(ROOT_COMMON_PICKER_INJECTION_KEY, commonPicker);
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
      return openBlock(), createBlock(unref(ElTooltip), mergeProps({
        ref_key: "refPopper",
        ref: refPopper,
        visible: unref(pickerVisible),
        effect: "light",
        pure: "",
        trigger: "click"
      }, _ctx.$attrs, {
        role: "dialog",
        teleported: "",
        transition: `${unref(nsDate).namespace.value}-zoom-in-top`,
        "popper-class": [`${unref(nsDate).namespace.value}-picker__popper`, _ctx.popperClass],
        "popper-style": _ctx.popperStyle,
        "popper-options": unref(elPopperOptions),
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
        default: withCtx(() => [
          !isRangeInput.value ? (openBlock(), createBlock(unref(ElInput), {
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
            size: unref(pickerSize),
            disabled: unref(pickerDisabled),
            placeholder: _ctx.placeholder,
            class: normalizeClass([
              unref(nsDate).b("editor"),
              unref(nsDate).bm("editor", _ctx.type),
              unref(nsDate).is("focus", unref(pickerVisible)),
              _ctx.$attrs.class
            ]),
            style: normalizeStyle(_ctx.$attrs.style),
            readonly: !_ctx.editable || _ctx.readonly || isDatesPicker.value || isMonthsPicker.value || isYearsPicker.value || _ctx.type === "week",
            "aria-label": _ctx.ariaLabel,
            tabindex: _ctx.tabindex,
            "validate-event": false,
            onInput: onUserInput,
            onFocus: unref(handleFocus),
            onBlur: unref(handleBlur),
            onKeydown: handleKeydownInput,
            onChange: handleChange,
            onMousedown: onMouseDownInput,
            onMouseenter: onMouseEnter,
            onMouseleave: onMouseLeave,
            onTouchstartPassive: onTouchStartInput,
            onClick: _cache[0] || (_cache[0] = withModifiers(() => {
            }, ["stop"]))
          }, {
            prefix: withCtx(() => [
              triggerIcon.value ? (openBlock(), createBlock(unref(ElIcon), {
                key: 0,
                class: normalizeClass(unref(nsInput).e("icon")),
                onMousedown: withModifiers(onMouseDownInput, ["prevent"]),
                onTouchstartPassive: onTouchStartInput
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(triggerIcon.value)))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class"])) : createCommentVNode("v-if", true)
            ]),
            suffix: withCtx(() => [
              showClearBtn.value && _ctx.clearIcon ? (openBlock(), createBlock(unref(ElIcon), {
                key: 0,
                class: normalizeClass(`${unref(nsInput).e("icon")} clear-icon`),
                onMousedown: withModifiers(unref(NOOP), ["prevent"]),
                onClick: onClear
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(_ctx.clearIcon)))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class", "onMousedown"])) : createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          }, 8, ["id", "model-value", "name", "size", "disabled", "placeholder", "class", "style", "readonly", "aria-label", "tabindex", "onFocus", "onBlur"])) : (openBlock(), createBlock(_sfc_main$1, {
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
            disabled: unref(pickerDisabled),
            readonly: !_ctx.editable || _ctx.readonly,
            "start-placeholder": _ctx.startPlaceholder,
            "end-placeholder": _ctx.endPlaceholder,
            class: normalizeClass(rangeInputKls.value),
            style: normalizeStyle(_ctx.$attrs.style),
            "aria-label": _ctx.ariaLabel,
            tabindex: _ctx.tabindex,
            autocomplete: "off",
            role: "combobox",
            onClick: onMouseDownInput,
            onFocus: unref(handleFocus),
            onBlur: unref(handleBlur),
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
            prefix: withCtx(() => [
              triggerIcon.value ? (openBlock(), createBlock(unref(ElIcon), {
                key: 0,
                class: normalizeClass([unref(nsInput).e("icon"), unref(nsRange).e("icon")])
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(triggerIcon.value)))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class"])) : createCommentVNode("v-if", true)
            ]),
            "range-separator": withCtx(() => [
              renderSlot(_ctx.$slots, "range-separator", {}, () => [
                createElementVNode(
                  "span",
                  {
                    class: normalizeClass(unref(nsRange).b("separator"))
                  },
                  toDisplayString(_ctx.rangeSeparator),
                  3
                  /* TEXT, CLASS */
                )
              ])
            ]),
            suffix: withCtx(() => [
              _ctx.clearIcon ? (openBlock(), createBlock(unref(ElIcon), {
                key: 0,
                class: normalizeClass(clearIconKls.value),
                onMousedown: withModifiers(unref(NOOP), ["prevent"]),
                onClick: onClear
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(_ctx.clearIcon)))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class", "onMousedown"])) : createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["id", "model-value", "name", "disabled", "readonly", "start-placeholder", "end-placeholder", "class", "style", "aria-label", "tabindex", "onFocus", "onBlur"]))
        ]),
        content: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {
            visible: unref(pickerVisible),
            actualVisible: unref(pickerActualVisible),
            parsedValue: unref(parsedValue),
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
            (...args) => unref(onPick) && unref(onPick)(...args)),
            onSelectRange: setSelectionRange,
            onSetPickerOption: _cache[2] || (_cache[2] = //@ts-ignore
            (...args) => unref(onSetPickerOption) && unref(onSetPickerOption)(...args)),
            onCalendarChange: _cache[3] || (_cache[3] = //@ts-ignore
            (...args) => unref(onCalendarChange) && unref(onCalendarChange)(...args)),
            onClear,
            onPanelChange: _cache[4] || (_cache[4] = //@ts-ignore
            (...args) => unref(onPanelChange) && unref(onPanelChange)(...args)),
            onMousedown: _cache[5] || (_cache[5] = withModifiers(() => {
            }, ["stop"]))
          })
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["visible", "transition", "popper-class", "popper-style", "popper-options", "fallback-placements", "placement"]);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=picker.vue2.mjs.map
