'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var index = require('../../../hooks/use-aria/index.js');
var index$1 = require('../../../hooks/use-size/index.js');
var shared = require('@vue/shared');
var event = require('../../../constants/event.js');

const checkboxGroupProps = runtime.buildProps({
  /**
   * @description binding value
   */
  modelValue: {
    type: runtime.definePropType(Array),
    default: () => []
  },
  /**
   * @description whether the nesting checkboxes are disabled
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description minimum number of checkbox checked
   */
  min: Number,
  /**
   * @description maximum number of checkbox checked
   */
  max: Number,
  /**
   * @description size of checkbox
   */
  size: index$1.useSizeProp,
  /**
   * @description border and background color when button is active
   */
  fill: String,
  /**
   * @description font color when button is active
   */
  textColor: String,
  /**
   * @description element tag of the checkbox group
   */
  tag: {
    type: String,
    default: "div"
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true
  },
  options: {
    type: runtime.definePropType(Array)
  },
  props: {
    type: runtime.definePropType(Object),
    default: () => checkboxDefaultProps
  },
  type: {
    type: String,
    values: ["checkbox", "button"],
    default: "checkbox"
  },
  ...index.useAriaProps(["ariaLabel"])
});
const checkboxGroupEmits = {
  [event.UPDATE_MODEL_EVENT]: (val) => shared.isArray(val),
  change: (val) => shared.isArray(val)
};
const checkboxDefaultProps = {
  label: "label",
  value: "value",
  disabled: "disabled"
};

exports.checkboxDefaultProps = checkboxDefaultProps;
exports.checkboxGroupEmits = checkboxGroupEmits;
exports.checkboxGroupProps = checkboxGroupProps;
//# sourceMappingURL=checkbox-group.js.map
