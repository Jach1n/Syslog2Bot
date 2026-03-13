'use strict';

var core = require('@popperjs/core');
var runtime = require('../../../utils/vue/props/runtime.js');
var index = require('../../../hooks/use-aria/index.js');
var index$1 = require('../../../hooks/use-size/index.js');
var types = require('../../../utils/types.js');
var shared = require('@vue/shared');
var event = require('../../../constants/event.js');

const sliderProps = runtime.buildProps({
  /**
   * @description binding value
   */
  modelValue: {
    type: runtime.definePropType([Number, Array]),
    default: 0
  },
  id: {
    type: String,
    default: void 0
  },
  /**
   * @description minimum value
   */
  min: {
    type: Number,
    default: 0
  },
  /**
   * @description maximum value
   */
  max: {
    type: Number,
    default: 100
  },
  /**
   * @description step size
   */
  step: {
    type: Number,
    default: 1
  },
  /**
   * @description whether to display an input box, works when `range` is false
   */
  showInput: Boolean,
  /**
   * @description whether to display control buttons when `show-input` is true
   */
  showInputControls: {
    type: Boolean,
    default: true
  },
  /**
   * @description size of the slider wrapper, will not work in vertical mode
   */
  size: index$1.useSizeProp,
  /**
   * @description size of the input box, when set `size`, the default is the value of `size`
   */
  inputSize: index$1.useSizeProp,
  /**
   * @description whether to display breakpoints
   */
  showStops: Boolean,
  /**
   * @description whether to display tooltip value
   */
  showTooltip: {
    type: Boolean,
    default: true
  },
  /**
   * @description format to display tooltip value
   */
  formatTooltip: {
    type: runtime.definePropType(Function),
    default: void 0
  },
  /**
   * @description whether Slider is disabled
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description whether to select a range
   */
  range: Boolean,
  /**
   * @description vertical mode
   */
  vertical: Boolean,
  /**
   * @description slider height, required in vertical mode
   */
  height: String,
  /**
   * @description when `range` is true, screen reader label for the start of the range
   */
  rangeStartLabel: {
    type: String,
    default: void 0
  },
  /**
   * @description when `range` is true, screen reader label for the end of the range
   */
  rangeEndLabel: {
    type: String,
    default: void 0
  },
  /**
   * @description format to display the `aria-valuenow` attribute for screen readers
   */
  formatValueText: {
    type: runtime.definePropType(Function),
    default: void 0
  },
  /**
   * @description custom class name for the tooltip
   */
  tooltipClass: {
    type: String,
    default: void 0
  },
  /**
   * @description position of Tooltip
   */
  placement: {
    type: String,
    values: core.placements,
    default: "top"
  },
  /**
   * @description marks, type of key must be `number` and must in closed interval `[min, max]`, each mark can custom style
   */
  marks: {
    type: runtime.definePropType(Object)
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /**
   * @description when slider tooltip inactive and `persistent` is `false` , popconfirm will be destroyed. `persistent` always be `false` when `show-tooltip ` is `false`
   */
  persistent: {
    type: Boolean,
    default: true
  },
  ...index.useAriaProps(["ariaLabel"])
});
const isValidValue = (value) => types.isNumber(value) || shared.isArray(value) && value.every(types.isNumber);
const sliderEmits = {
  [event.UPDATE_MODEL_EVENT]: isValidValue,
  [event.INPUT_EVENT]: isValidValue,
  [event.CHANGE_EVENT]: isValidValue
};

exports.sliderEmits = sliderEmits;
exports.sliderProps = sliderProps;
//# sourceMappingURL=slider.js.map
