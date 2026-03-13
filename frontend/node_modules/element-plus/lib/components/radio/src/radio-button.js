'use strict';

var radio = require('./radio.js');
var runtime = require('../../../utils/vue/props/runtime.js');

const radioButtonProps = runtime.buildProps({
  ...radio.radioPropsBase
});
const radioButtonPropsDefaults = {
  modelValue: void 0,
  disabled: void 0,
  label: void 0,
  value: void 0,
  name: void 0
};

exports.radioButtonProps = radioButtonProps;
exports.radioButtonPropsDefaults = radioButtonPropsDefaults;
//# sourceMappingURL=radio-button.js.map
