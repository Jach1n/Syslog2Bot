'use strict';

var core = require('@popperjs/core');
var iconsVue = require('@element-plus/icons-vue');
var shared = require('../props/shared.js');
var runtime = require('../../../../utils/vue/props/runtime.js');
var index = require('../../../../hooks/use-aria/index.js');
var index$1 = require('../../../../hooks/use-empty-values/index.js');
var index$2 = require('../../../../hooks/use-size/index.js');
var content = require('../../../tooltip/src/content.js');

const timePickerDefaultProps = runtime.buildProps({
  /**
   * @description this prop decides if the date picker panel pops up when the input is focused
   */
  automaticDropdown: {
    type: Boolean,
    default: true
  },
  /**
   * @description same as `id` in native input
   */
  id: {
    type: runtime.definePropType([Array, String])
  },
  /**
   * @description same as `name` in native input
   */
  name: {
    type: runtime.definePropType([Array, String])
  },
  /**
   * @description custom class name for TimePicker's dropdown
   */
  popperClass: content.useTooltipContentProps.popperClass,
  /**
   * @description custom style for TimePicker's dropdown
   */
  popperStyle: content.useTooltipContentProps.popperStyle,
  /**
   * @description format of the displayed value in the input box
   */
  format: String,
  /**
   * @description optional, format of binding value. If not specified, the binding value will be a Date object
   */
  valueFormat: String,
  /**
   * @description optional, format of the date displayed in input's inner panel
   */
  dateFormat: String,
  /**
   * @description optional, format of the time displayed in input's inner panel
   */
  timeFormat: String,
  /**
   * @description type of the picker
   */
  type: {
    type: String,
    default: ""
  },
  /**
   * @description whether to show clear button
   */
  clearable: {
    type: Boolean,
    default: true
  },
  /**
   * @description Custom clear icon component
   */
  clearIcon: {
    type: runtime.definePropType([String, Object]),
    default: iconsVue.CircleClose
  },
  /**
   * @description whether the input is editable
   */
  editable: {
    type: Boolean,
    default: true
  },
  /**
   * @description Custom prefix icon component
   */
  prefixIcon: {
    type: runtime.definePropType([String, Object]),
    default: ""
  },
  /**
   * @description size of Input
   */
  size: index$2.useSizeProp,
  /**
   * @description whether TimePicker is read only
   */
  readonly: Boolean,
  /**
   * @description whether TimePicker is disabled
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description placeholder in non-range mode
   */
  placeholder: {
    type: String,
    default: ""
  },
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) parameters
   */
  popperOptions: {
    type: runtime.definePropType(Object),
    default: () => ({})
  },
  /**
   * @description binding value, if it is an array, the length should be 2
   */
  modelValue: {
    type: runtime.definePropType([Date, Array, String, Number]),
    default: ""
  },
  /**
   * @description range separator
   */
  rangeSeparator: {
    type: String,
    default: "-"
  },
  /**
   * @description placeholder for the start date in range mode
   */
  startPlaceholder: String,
  /**
   * @description placeholder for the end date in range mode
   */
  endPlaceholder: String,
  /**
   * @description optional, default date of the calendar
   */
  defaultValue: {
    type: runtime.definePropType([Date, Array])
  },
  /**
   * @description optional, the time value to use when selecting date range
   */
  defaultTime: {
    type: runtime.definePropType([Date, Array])
  },
  /**
   * @description whether to pick a time range
   */
  isRange: Boolean,
  ...shared.disabledTimeListsProps,
  /**
   * @description a function determining if a date is disabled with that date as its parameter. Should return a Boolean
   */
  disabledDate: {
    type: Function
  },
  /**
   * @description set custom className
   */
  cellClassName: {
    type: Function
  },
  /**
   * @description an object array to set shortcut options
   */
  shortcuts: {
    type: Array,
    default: () => []
  },
  /**
   * @description whether to pick time using arrow buttons
   */
  arrowControl: Boolean,
  /**
   * @description input tabindex
   */
  tabindex: {
    type: runtime.definePropType([String, Number]),
    default: 0
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /**
   * @description unlink two date-panels in range-picker
   */
  unlinkPanels: Boolean,
  /**
   * @description position of dropdown
   */
  placement: {
    type: runtime.definePropType(String),
    values: core.placements,
    default: "bottom"
  },
  /**
   * @description list of possible positions for dropdown
   */
  fallbackPlacements: {
    type: runtime.definePropType(Array),
    default: ["bottom", "top", "right", "left"]
  },
  ...index$1.useEmptyValuesProps,
  ...index.useAriaProps(["ariaLabel"]),
  /**
   * @description whether to show the now button
   */
  showNow: {
    type: Boolean,
    default: true
  },
  /**
   * @description whether to show footer
   */
  showConfirm: {
    type: Boolean,
    default: true
  },
  /**
   * @description whether to show footer
   */
  showFooter: {
    type: Boolean,
    default: true
  },
  /**
   * @description whether to show the number of the calendar week
   */
  showWeekNumber: Boolean
});
const timePickerRangeTriggerProps = runtime.buildProps({
  id: {
    type: runtime.definePropType(Array)
  },
  name: {
    type: runtime.definePropType(Array)
  },
  modelValue: {
    type: runtime.definePropType([Array, String])
  },
  startPlaceholder: String,
  endPlaceholder: String,
  disabled: Boolean
});
const timePickerRngeTriggerProps = timePickerRangeTriggerProps;

exports.timePickerDefaultProps = timePickerDefaultProps;
exports.timePickerRangeTriggerProps = timePickerRangeTriggerProps;
exports.timePickerRngeTriggerProps = timePickerRngeTriggerProps;
//# sourceMappingURL=props.js.map
