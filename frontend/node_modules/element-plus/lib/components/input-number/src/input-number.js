'use strict';

var lodashUnified = require('lodash-unified');
var runtime = require('../../../utils/vue/props/runtime.js');
var index = require('../../../hooks/use-aria/index.js');
var types = require('../../../utils/types.js');
var index$1 = require('../../../hooks/use-size/index.js');
var event = require('../../../constants/event.js');

const inputNumberProps = runtime.buildProps({
  /**
   * @description same as `id` in native input
   */
  id: {
    type: String,
    default: void 0
  },
  /**
   * @description incremental step
   */
  step: {
    type: Number,
    default: 1
  },
  /**
   * @description whether input value can only be multiple of step
   */
  stepStrictly: Boolean,
  /**
   * @description the maximum allowed value
   */
  max: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER
  },
  /**
   * @description the minimum allowed value
   */
  min: {
    type: Number,
    default: Number.MIN_SAFE_INTEGER
  },
  /**
   * @description binding value
   */
  modelValue: {
    type: [Number, null]
  },
  /**
   * @description same as `readonly` in native input
   */
  readonly: Boolean,
  /**
   * @description whether the component is disabled
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description size of the component
   */
  size: index$1.useSizeProp,
  /**
   * @description whether to enable the control buttons
   */
  controls: {
    type: Boolean,
    default: true
  },
  /**
   * @description position of the control buttons
   */
  controlsPosition: {
    type: String,
    default: "",
    values: ["", "right"]
  },
  /**
   * @description value should be set when input box is cleared
   */
  valueOnClear: {
    type: runtime.definePropType([String, Number, null]),
    validator: (val) => val === null || types.isNumber(val) || ["min", "max"].includes(val),
    default: null
  },
  /**
   * @description same as `name` in native input
   */
  name: String,
  /**
   * @description same as `placeholder` in native input
   */
  placeholder: String,
  /**
   * @description precision of input value
   */
  precision: {
    type: Number,
    validator: (val) => val >= 0 && val === Number.parseInt(`${val}`, 10)
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true
  },
  ...index.useAriaProps(["ariaLabel"]),
  /**
   * @description native input mode for virtual keyboards
   */
  inputmode: {
    type: runtime.definePropType(String),
    default: void 0
  },
  /**
   * @description alignment for the inner input text
   */
  align: {
    type: runtime.definePropType(String),
    default: "center"
  },
  /**
   * @description whether to disable scientific notation input (e.g. 'e', 'E')
   */
  disabledScientific: Boolean
});
const inputNumberEmits = {
  [event.CHANGE_EVENT]: (cur, prev) => prev !== cur,
  blur: (e) => e instanceof FocusEvent,
  focus: (e) => e instanceof FocusEvent,
  [event.INPUT_EVENT]: (val) => types.isNumber(val) || lodashUnified.isNil(val),
  [event.UPDATE_MODEL_EVENT]: (val) => types.isNumber(val) || lodashUnified.isNil(val)
};

exports.inputNumberEmits = inputNumberEmits;
exports.inputNumberProps = inputNumberProps;
//# sourceMappingURL=input-number.js.map
