'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var shared = require('@vue/shared');

const selectControllerProps = runtime.buildProps({
  date: {
    type: runtime.definePropType(Object),
    required: true
  },
  formatter: {
    type: runtime.definePropType(Function)
  }
});
const selectControllerEmits = {
  "date-change": (date) => shared.isObject(date) || shared.isString(date)
};

exports.selectControllerEmits = selectControllerEmits;
exports.selectControllerProps = selectControllerProps;
//# sourceMappingURL=select-controller.js.map
