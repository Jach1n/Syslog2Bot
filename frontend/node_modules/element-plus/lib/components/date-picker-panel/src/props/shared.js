'use strict';

var runtime = require('../../../../utils/vue/props/runtime.js');
var date = require('../../../../constants/date.js');
var shared = require('@vue/shared');

const selectionModes = [
  "date",
  "dates",
  "year",
  "years",
  "month",
  "months",
  "week",
  "range"
];
const datePickerSharedProps = runtime.buildProps({
  cellClassName: {
    type: runtime.definePropType(Function)
  },
  disabledDate: {
    type: runtime.definePropType(Function)
  },
  date: {
    type: runtime.definePropType(Object),
    required: true
  },
  minDate: {
    type: runtime.definePropType(Object)
  },
  maxDate: {
    type: runtime.definePropType(Object)
  },
  parsedValue: {
    type: runtime.definePropType([Object, Array])
  },
  rangeState: {
    type: runtime.definePropType(Object),
    default: () => ({
      endDate: null,
      selecting: false
    })
  },
  disabled: Boolean
});
const panelSharedProps = runtime.buildProps({
  type: {
    type: runtime.definePropType(String),
    required: true,
    values: date.datePickTypes
  },
  dateFormat: String,
  timeFormat: String,
  showNow: {
    type: Boolean,
    default: true
  },
  showConfirm: Boolean,
  showFooter: {
    type: Boolean,
    default: true
  },
  showWeekNumber: Boolean,
  border: Boolean,
  disabled: Boolean,
  editable: {
    type: Boolean,
    default: true
  }
});
const panelRangeSharedProps = runtime.buildProps({
  unlinkPanels: Boolean,
  visible: {
    type: Boolean,
    default: true
  },
  showConfirm: Boolean,
  showFooter: {
    type: Boolean,
    default: true
  },
  border: Boolean,
  disabled: Boolean,
  parsedValue: {
    type: runtime.definePropType(Array)
  }
});
const selectionModeWithDefault = (mode) => {
  return {
    type: String,
    values: selectionModes,
    default: mode
  };
};
const rangePickerSharedEmits = {
  pick: (range) => shared.isArray(range)
};

exports.datePickerSharedProps = datePickerSharedProps;
exports.panelRangeSharedProps = panelRangeSharedProps;
exports.panelSharedProps = panelSharedProps;
exports.rangePickerSharedEmits = rangePickerSharedEmits;
exports.selectionModeWithDefault = selectionModeWithDefault;
//# sourceMappingURL=shared.js.map
