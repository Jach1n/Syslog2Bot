'use strict';

var helper = require('./helper.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var content = require('../../tooltip/src/content.js');
var input = require('../../input/src/input.js');
var shared = require('@vue/shared');
var event = require('../../../constants/event.js');

const mentionProps = runtime.buildProps({
  ...input.inputProps,
  /**
   * @description mention options list
   */
  options: {
    type: runtime.definePropType(Array),
    default: () => []
  },
  /**
   * @description prefix character to trigger mentions. The string length must be exactly 1.
   */
  prefix: {
    type: runtime.definePropType([String, Array]),
    default: "@",
    validator: (val) => {
      if (shared.isString(val)) return val.length === 1;
      return val.every((v) => shared.isString(v) && v.length === 1);
    }
  },
  /**
   * @description character to split mentions. The string length must be exactly 1.
   */
  split: {
    type: String,
    default: " ",
    validator: (val) => val.length === 1
  },
  /**
   * @description customize filter option logic.
   */
  filterOption: {
    type: runtime.definePropType([Boolean, Function]),
    default: () => helper.filterOption,
    validator: (val) => {
      if (val === false) return true;
      return shared.isFunction(val);
    }
  },
  /**
   * @description set popup placement
   */
  placement: {
    type: runtime.definePropType(String),
    default: "bottom"
  },
  /**
   * @description whether the dropdown panel has an arrow
   */
  showArrow: Boolean,
  /**
   * @description offset of the dropdown panel
   */
  offset: {
    type: Number,
    default: 0
  },
  /**
   * @description when backspace is pressed to delete, whether the mention content is deleted as a whole
   */
  whole: Boolean,
  /**
   * @description when backspace is pressed to delete, check if the mention is a whole
   */
  checkIsWhole: {
    type: runtime.definePropType(
      Function
    )
  },
  /**
   * @description input value
   */
  modelValue: String,
  /**
   * @description whether the dropdown panel of mentions is in a loading state.
   */
  loading: Boolean,
  /**
   * @description custom class name for dropdown panel
   */
  popperClass: content.useTooltipContentProps.popperClass,
  /**
   * @description custom style for dropdown panel
   */
  popperStyle: content.useTooltipContentProps.popperStyle,
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) parameters
   */
  popperOptions: {
    type: runtime.definePropType(Object),
    default: () => ({})
  },
  /**
   * @description configuration options
   */
  props: {
    type: runtime.definePropType(Object),
    default: () => mentionDefaultProps
  }
});
const mentionEmits = {
  [event.UPDATE_MODEL_EVENT]: (value) => shared.isString(value),
  "whole-remove": (pattern, prefix) => shared.isString(pattern) && shared.isString(prefix),
  input: (value) => shared.isString(value),
  search: (pattern, prefix) => shared.isString(pattern) && shared.isString(prefix),
  select: (option, prefix) => shared.isObject(option) && shared.isString(prefix),
  focus: (evt) => evt instanceof FocusEvent,
  blur: (evt) => evt instanceof FocusEvent
};
const mentionDefaultProps = {
  value: "value",
  label: "label",
  disabled: "disabled"
};

exports.mentionDefaultProps = mentionDefaultProps;
exports.mentionEmits = mentionEmits;
exports.mentionProps = mentionProps;
//# sourceMappingURL=mention.js.map
