'use strict';

var vue = require('vue');
var dayjs = require('dayjs');
var lodashUnified = require('lodash-unified');
var utils = require('../utils.js');
var constants = require('../constants.js');
var useShortcut = require('./use-shortcut.js');
var index = require('../../../../hooks/use-namespace/index.js');
var index$1 = require('../../../../hooks/use-locale/index.js');
var shared = require('@vue/shared');

const useRangePicker = (props, {
  defaultValue,
  defaultTime,
  leftDate,
  rightDate,
  step,
  unit,
  sortDates
}) => {
  const { emit } = vue.getCurrentInstance();
  const { pickerNs } = vue.inject(constants.ROOT_PICKER_INJECTION_KEY);
  const drpNs = index.useNamespace("date-range-picker");
  const { t, lang } = index$1.useLocale();
  const handleShortcutClick = useShortcut.useShortcut(lang);
  const minDate = vue.ref();
  const maxDate = vue.ref();
  const rangeState = vue.ref({
    endDate: null,
    selecting: false
  });
  const handleChangeRange = (val) => {
    rangeState.value = val;
  };
  const handleRangeConfirm = (visible = false) => {
    const _minDate = vue.unref(minDate);
    const _maxDate = vue.unref(maxDate);
    if (utils.isValidRange([_minDate, _maxDate])) {
      emit("pick", [_minDate, _maxDate], visible);
    }
  };
  const onSelect = (selecting) => {
    rangeState.value.selecting = selecting;
    if (!selecting) {
      rangeState.value.endDate = null;
    }
  };
  const parseValue = (parsedValue) => {
    if (shared.isArray(parsedValue) && parsedValue.length === 2) {
      const [start, end] = parsedValue;
      minDate.value = start;
      leftDate.value = start;
      maxDate.value = end;
      sortDates(vue.unref(minDate), vue.unref(maxDate));
    } else {
      restoreDefault();
    }
  };
  const restoreDefault = () => {
    let [start, end] = utils.getDefaultValue(vue.unref(defaultValue), {
      lang: vue.unref(lang),
      step,
      unit,
      unlinkPanels: props.unlinkPanels
    });
    const getShift = (day) => {
      return day.diff(day.startOf("d"), "ms");
    };
    const maybeTimes = vue.unref(defaultTime);
    if (maybeTimes) {
      let leftShift = 0;
      let rightShift = 0;
      if (shared.isArray(maybeTimes)) {
        const [timeStart, timeEnd] = maybeTimes.map(dayjs);
        leftShift = getShift(timeStart);
        rightShift = getShift(timeEnd);
      } else {
        const shift = getShift(dayjs(maybeTimes));
        leftShift = shift;
        rightShift = shift;
      }
      start = start.startOf("d").add(leftShift, "ms");
      end = end.startOf("d").add(rightShift, "ms");
    }
    minDate.value = void 0;
    maxDate.value = void 0;
    leftDate.value = start;
    rightDate.value = end;
  };
  vue.watch(
    defaultValue,
    (val) => {
      if (val) {
        restoreDefault();
      }
    },
    { immediate: true }
  );
  vue.watch(
    () => props.parsedValue,
    (parsedValue) => {
      if (!(parsedValue == null ? void 0 : parsedValue.length) || !lodashUnified.isEqual(parsedValue, [minDate.value, maxDate.value])) {
        parseValue(parsedValue);
      }
    },
    {
      immediate: true
    }
  );
  vue.watch(
    () => props.visible,
    () => {
      if (props.visible) {
        parseValue(props.parsedValue);
      }
    },
    { immediate: true }
  );
  return {
    minDate,
    maxDate,
    rangeState,
    lang,
    ppNs: pickerNs,
    drpNs,
    handleChangeRange,
    handleRangeConfirm,
    handleShortcutClick,
    onSelect,
    parseValue,
    t
  };
};

exports.useRangePicker = useRangePicker;
//# sourceMappingURL=use-range-picker.js.map
