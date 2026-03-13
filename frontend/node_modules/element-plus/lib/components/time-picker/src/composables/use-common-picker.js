'use strict';

var vue = require('vue');
var lodashUnified = require('lodash-unified');
var index = require('../../../../hooks/use-locale/index.js');
var utils = require('../utils.js');
var shared = require('@vue/shared');
var event = require('../../../../constants/event.js');

const useCommonPicker = (props, emit) => {
  const { lang } = index.useLocale();
  const pickerVisible = vue.ref(false);
  const pickerActualVisible = vue.ref(false);
  const userInput = vue.ref(null);
  const valueIsEmpty = vue.computed(() => {
    const { modelValue } = props;
    return !modelValue || shared.isArray(modelValue) && !modelValue.filter(Boolean).length;
  });
  const emitInput = (input) => {
    if (!utils.valueEquals(props.modelValue, input)) {
      let formatted;
      if (shared.isArray(input)) {
        formatted = input.map(
          (item) => utils.formatter(item, props.valueFormat, lang.value)
        );
      } else if (input) {
        formatted = utils.formatter(input, props.valueFormat, lang.value);
      }
      const emitVal = input ? formatted : input;
      emit(event.UPDATE_MODEL_EVENT, emitVal, lang.value);
    }
  };
  const parsedValue = vue.computed(() => {
    var _a;
    let dayOrDays;
    if (valueIsEmpty.value) {
      if (pickerOptions.value.getDefaultValue) {
        dayOrDays = pickerOptions.value.getDefaultValue();
      }
    } else {
      if (shared.isArray(props.modelValue)) {
        dayOrDays = props.modelValue.map(
          (d) => utils.parseDate(d, props.valueFormat, lang.value)
        );
      } else {
        dayOrDays = utils.parseDate(
          (_a = props.modelValue) != null ? _a : "",
          props.valueFormat,
          lang.value
        );
      }
    }
    if (pickerOptions.value.getRangeAvailableTime) {
      const availableResult = pickerOptions.value.getRangeAvailableTime(
        dayOrDays
      );
      if (!lodashUnified.isEqual(availableResult, dayOrDays)) {
        dayOrDays = availableResult;
        if (!valueIsEmpty.value) {
          emitInput(utils.dayOrDaysToDate(dayOrDays));
        }
      }
    }
    if (shared.isArray(dayOrDays) && dayOrDays.some((day) => !day)) {
      dayOrDays = [];
    }
    return dayOrDays;
  });
  const pickerOptions = vue.ref({});
  const onSetPickerOption = (e) => {
    pickerOptions.value[e[0]] = e[1];
    pickerOptions.value.panelReady = true;
  };
  const onCalendarChange = (e) => {
    emit("calendar-change", e);
  };
  const onPanelChange = (value, mode, view) => {
    emit("panel-change", value, mode, view);
  };
  const onPick = (date = "", visible = false) => {
    pickerVisible.value = visible;
    let result;
    if (shared.isArray(date)) {
      result = date.map((_) => _.toDate());
    } else {
      result = date ? date.toDate() : date;
    }
    userInput.value = null;
    emitInput(result);
  };
  return {
    parsedValue,
    pickerActualVisible,
    pickerOptions,
    pickerVisible,
    userInput,
    valueIsEmpty,
    emitInput,
    onCalendarChange,
    onPanelChange,
    onPick,
    onSetPickerOption
  };
};

exports.useCommonPicker = useCommonPicker;
//# sourceMappingURL=use-common-picker.js.map
