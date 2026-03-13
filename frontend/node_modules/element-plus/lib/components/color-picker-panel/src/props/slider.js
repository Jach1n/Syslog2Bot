'use strict';

var runtime = require('../../../../utils/vue/props/runtime.js');

const alphaSliderProps = runtime.buildProps({
  color: {
    type: runtime.definePropType(Object),
    required: true
  },
  vertical: Boolean,
  disabled: Boolean
});
const hueSliderProps = alphaSliderProps;

exports.alphaSliderProps = alphaSliderProps;
exports.hueSliderProps = hueSliderProps;
//# sourceMappingURL=slider.js.map
