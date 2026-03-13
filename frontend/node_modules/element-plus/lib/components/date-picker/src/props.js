'use strict';

var props = require('../../time-picker/src/common/props.js');
var runtime = require('../../../utils/vue/props/runtime.js');

const datePickerProps = runtime.buildProps({
  ...props.timePickerDefaultProps,
  /**
   * @description type of the picker
   */
  type: {
    type: runtime.definePropType(String),
    default: "date"
  }
});

exports.datePickerProps = datePickerProps;
//# sourceMappingURL=props.js.map
