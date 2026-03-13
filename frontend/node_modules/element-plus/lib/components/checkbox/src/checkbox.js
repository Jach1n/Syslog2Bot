'use strict';

var index = require('../../../hooks/use-aria/index.js');
var shared = require('@vue/shared');
var types = require('../../../utils/types.js');
var index$1 = require('../../../hooks/use-size/index.js');
var event = require('../../../constants/event.js');

const checkboxProps = {
  /**
   * @description binding value
   */
  modelValue: {
    type: [Number, String, Boolean],
    default: void 0
  },
  /**
   * @description label of the Checkbox when used inside a `checkbox-group`
   */
  label: {
    type: [String, Boolean, Number, Object],
    default: void 0
  },
  /**
   * @description value of the Checkbox when used inside a `checkbox-group`
   */
  value: {
    type: [String, Boolean, Number, Object],
    default: void 0
  },
  /**
   * @description Set indeterminate state, only responsible for style control
   */
  indeterminate: Boolean,
  /**
   * @description whether the Checkbox is disabled
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description if the Checkbox is checked
   */
  checked: Boolean,
  /**
   * @description native 'name' attribute
   */
  name: {
    type: String,
    default: void 0
  },
  /**
   * @description value of the Checkbox if it's checked
   */
  trueValue: {
    type: [String, Number],
    default: void 0
  },
  /**
   * @description value of the Checkbox if it's not checked
   */
  falseValue: {
    type: [String, Number],
    default: void 0
  },
  /**
   * @deprecated use `trueValue` instead
   * @description value of the Checkbox if it's checked
   */
  trueLabel: {
    type: [String, Number],
    default: void 0
  },
  /**
   * @deprecated use `falseValue` instead
   * @description value of the Checkbox if it's not checked
   */
  falseLabel: {
    type: [String, Number],
    default: void 0
  },
  /**
   * @description input id
   */
  id: {
    type: String,
    default: void 0
  },
  /**
   * @description whether to add a border around Checkbox
   */
  border: Boolean,
  /**
   * @description size of the Checkbox
   */
  size: index$1.useSizeProp,
  /**
   * @description input tabindex
   */
  tabindex: [String, Number],
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true
  },
  ariaLabel: String,
  ...index.useAriaProps(["ariaControls"])
};
const checkboxEmits = {
  [event.UPDATE_MODEL_EVENT]: (val) => shared.isString(val) || types.isNumber(val) || types.isBoolean(val),
  change: (val) => shared.isString(val) || types.isNumber(val) || types.isBoolean(val)
};
const checkboxPropsDefaults = {
  modelValue: void 0,
  label: void 0,
  value: void 0,
  disabled: void 0,
  name: void 0,
  trueValue: void 0,
  falseValue: void 0,
  trueLabel: void 0,
  falseLabel: void 0,
  id: void 0,
  validateEvent: true
};

exports.checkboxEmits = checkboxEmits;
exports.checkboxProps = checkboxProps;
exports.checkboxPropsDefaults = checkboxPropsDefaults;
//# sourceMappingURL=checkbox.js.map
