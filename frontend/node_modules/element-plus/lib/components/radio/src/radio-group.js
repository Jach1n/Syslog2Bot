'use strict';

var radio = require('./radio.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var index = require('../../../hooks/use-aria/index.js');
var index$1 = require('../../../hooks/use-size/index.js');

const radioDefaultProps = {
  label: "label",
  value: "value",
  disabled: "disabled"
};
const radioGroupProps = runtime.buildProps({
  /**
   * @description native `id` attribute
   */
  id: {
    type: String,
    default: void 0
  },
  /**
   * @description the size of radio buttons or bordered radios
   */
  size: index$1.useSizeProp,
  /**
   * @description whether the nesting radios are disabled
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description binding value
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: void 0
  },
  /**
   * @description border and background color when button is active
   */
  fill: {
    type: String,
    default: ""
  },
  /**
   * @description font color when button is active
   */
  textColor: {
    type: String,
    default: ""
  },
  /**
   * @description native `name` attribute
   */
  name: {
    type: String,
    default: void 0
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
    default: () => radioDefaultProps
  },
  type: {
    type: String,
    values: ["radio", "button"],
    default: "radio"
  },
  ...index.useAriaProps(["ariaLabel"])
});
const radioGroupEmits = radio.radioEmits;
const radioGroupPropsDefaults = {
  id: void 0,
  disabled: void 0,
  modelValue: void 0,
  fill: "",
  textColor: "",
  name: void 0,
  validateEvent: true,
  props: () => radioDefaultProps,
  type: "radio"
};

exports.radioDefaultProps = radioDefaultProps;
exports.radioGroupEmits = radioGroupEmits;
exports.radioGroupProps = radioGroupProps;
exports.radioGroupPropsDefaults = radioGroupPropsDefaults;
//# sourceMappingURL=radio-group.js.map
