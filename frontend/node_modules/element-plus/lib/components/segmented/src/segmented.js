'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var index = require('../../../hooks/use-aria/index.js');
var index$1 = require('../../../hooks/use-size/index.js');
var shared = require('@vue/shared');
var types = require('../../../utils/types.js');
var event = require('../../../constants/event.js');

const defaultProps = {
  label: "label",
  value: "value",
  disabled: "disabled"
};
const segmentedProps = runtime.buildProps({
  direction: {
    type: runtime.definePropType(String),
    default: "horizontal"
  },
  /**
   * @description options of segmented
   */
  options: {
    type: runtime.definePropType(Array),
    default: () => []
  },
  /**
   * @description binding value
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: void 0
  },
  /**
   * @description configuration options, see the following table
   */
  props: {
    type: runtime.definePropType(Object),
    default: () => defaultProps
  },
  /**
   * @description fit width of parent content
   */
  block: Boolean,
  /**
   * @description size of component
   */
  size: index$1.useSizeProp,
  /**
   * @description whether segmented is disabled
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /**
   * @description native input id
   */
  id: String,
  /**
   * @description native `name` attribute
   */
  name: String,
  ...index.useAriaProps(["ariaLabel"])
});
const segmentedEmits = {
  [event.UPDATE_MODEL_EVENT]: (val) => shared.isString(val) || types.isNumber(val) || types.isBoolean(val),
  [event.CHANGE_EVENT]: (val) => shared.isString(val) || types.isNumber(val) || types.isBoolean(val)
};

exports.defaultProps = defaultProps;
exports.segmentedEmits = segmentedEmits;
exports.segmentedProps = segmentedProps;
//# sourceMappingURL=segmented.js.map
