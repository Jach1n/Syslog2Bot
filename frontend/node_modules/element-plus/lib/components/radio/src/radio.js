'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var index = require('../../../hooks/use-size/index.js');
var shared = require('@vue/shared');
var types = require('../../../utils/types.js');
var event = require('../../../constants/event.js');

const radioPropsBase = runtime.buildProps({
  /**
   * @description binding value
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: void 0
  },
  /**
   * @description size of the Radio
   */
  size: index.useSizeProp,
  /**
   * @description whether Radio is disabled
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description the label of Radio
   */
  label: {
    type: [String, Number, Boolean],
    default: void 0
  },
  /**
   * @description the value of Radio
   */
  value: {
    type: [String, Number, Boolean],
    default: void 0
  },
  /**
   * @description native `name` attribute
   */
  name: {
    type: String,
    default: void 0
  }
});
const radioProps = runtime.buildProps({
  ...radioPropsBase,
  /**
   * @description whether to add a border around Radio
   */
  border: Boolean
});
const radioEmits = {
  [event.UPDATE_MODEL_EVENT]: (val) => shared.isString(val) || types.isNumber(val) || types.isBoolean(val),
  [event.CHANGE_EVENT]: (val) => shared.isString(val) || types.isNumber(val) || types.isBoolean(val)
};
const radioPropsDefaults = {
  modelValue: void 0,
  disabled: void 0,
  label: void 0,
  value: void 0,
  name: void 0,
  border: false
};

exports.radioEmits = radioEmits;
exports.radioProps = radioProps;
exports.radioPropsBase = radioPropsBase;
exports.radioPropsDefaults = radioPropsDefaults;
//# sourceMappingURL=radio.js.map
