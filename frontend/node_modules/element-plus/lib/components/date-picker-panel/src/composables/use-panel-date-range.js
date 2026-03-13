'use strict';

var vue = require('vue');
var utils = require('../utils.js');
var constants = require('../../../time-picker/src/constants.js');
var index = require('../../../../hooks/use-locale/index.js');

const usePanelDateRange = (props, emit, leftDate, rightDate) => {
  const leftCurrentView = vue.ref("date");
  const leftCurrentViewRef = vue.ref();
  const rightCurrentView = vue.ref("date");
  const rightCurrentViewRef = vue.ref();
  const pickerBase = vue.inject(constants.PICKER_BASE_INJECTION_KEY);
  const { disabledDate } = pickerBase.props;
  const { t, lang } = index.useLocale();
  const leftYear = vue.computed(() => {
    return leftDate.value.year();
  });
  const leftMonth = vue.computed(() => {
    return leftDate.value.month();
  });
  const rightYear = vue.computed(() => {
    return rightDate.value.year();
  });
  const rightMonth = vue.computed(() => {
    return rightDate.value.month();
  });
  function computedYearLabel(currentView, yearValue) {
    const yearTranslation = t("el.datepicker.year");
    if (currentView.value === "year") {
      const startYear = Math.floor(yearValue.value / 10) * 10;
      return yearTranslation ? `${startYear} ${yearTranslation} - ${startYear + 9} ${yearTranslation}` : `${startYear} - ${startYear + 9}`;
    }
    return `${yearValue.value} ${yearTranslation}`;
  }
  function focusPicker(currentViewRef) {
    currentViewRef == null ? void 0 : currentViewRef.focus();
  }
  async function showPicker(pickerType, view) {
    if (props.disabled) return;
    const currentView = pickerType === "left" ? leftCurrentView : rightCurrentView;
    const currentViewRef = pickerType === "left" ? leftCurrentViewRef : rightCurrentViewRef;
    currentView.value = view;
    await vue.nextTick();
    focusPicker(currentViewRef.value);
  }
  async function handlePick(mode, pickerType, value) {
    if (props.disabled) return;
    const isLeftPicker = pickerType === "left";
    const startDate = isLeftPicker ? leftDate : rightDate;
    const endDate = isLeftPicker ? rightDate : leftDate;
    const currentView = isLeftPicker ? leftCurrentView : rightCurrentView;
    const currentViewRef = isLeftPicker ? leftCurrentViewRef : rightCurrentViewRef;
    if (mode === "year") {
      const data = startDate.value.year(value);
      startDate.value = utils.getValidDateOfYear(data, lang.value, disabledDate);
    }
    if (mode === "month") {
      startDate.value = utils.getValidDateOfMonth(
        startDate.value,
        startDate.value.year(),
        value,
        lang.value,
        disabledDate
      );
    }
    if (!props.unlinkPanels) {
      endDate.value = pickerType === "left" ? startDate.value.add(1, "month") : startDate.value.subtract(1, "month");
    }
    currentView.value = mode === "year" ? "month" : "date";
    await vue.nextTick();
    focusPicker(currentViewRef.value);
    handlePanelChange(mode);
  }
  function handlePanelChange(mode) {
    emit(
      "panel-change",
      [leftDate.value.toDate(), rightDate.value.toDate()],
      mode
    );
  }
  function adjustDateByView(currentView, date, forward) {
    const action = forward ? "add" : "subtract";
    return currentView === "year" ? date[action](10, "year") : date[action](1, "year");
  }
  return {
    leftCurrentView,
    rightCurrentView,
    leftCurrentViewRef,
    rightCurrentViewRef,
    leftYear,
    rightYear,
    leftMonth,
    rightMonth,
    leftYearLabel: vue.computed(() => computedYearLabel(leftCurrentView, leftYear)),
    rightYearLabel: vue.computed(
      () => computedYearLabel(rightCurrentView, rightYear)
    ),
    showLeftPicker: (view) => showPicker("left", view),
    showRightPicker: (view) => showPicker("right", view),
    handleLeftYearPick: (year) => handlePick("year", "left", year),
    handleRightYearPick: (year) => handlePick("year", "right", year),
    handleLeftMonthPick: (month) => handlePick("month", "left", month),
    handleRightMonthPick: (month) => handlePick("month", "right", month),
    handlePanelChange,
    adjustDateByView
  };
};

exports.usePanelDateRange = usePanelDateRange;
//# sourceMappingURL=use-panel-date-range.js.map
