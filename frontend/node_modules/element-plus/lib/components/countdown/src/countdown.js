'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var types = require('../../../utils/types.js');
var event = require('../../../constants/event.js');

const countdownProps = runtime.buildProps({
  /**
   * @description Formatting the countdown display
   */
  format: {
    type: String,
    default: "HH:mm:ss"
  },
  /**
   * @description Sets the prefix of a countdown
   */
  prefix: String,
  /**
   * @description Sets the suffix of a countdown
   */
  suffix: String,
  /**
   * @description countdown titles
   */
  title: String,
  /**
   * @description target time
   */
  value: {
    type: runtime.definePropType([Number, Object]),
    default: 0
  },
  /**
   * @description Styles countdown values
   */
  valueStyle: {
    type: runtime.definePropType([String, Object, Array])
  }
});
const countdownEmits = {
  finish: () => true,
  [event.CHANGE_EVENT]: (value) => types.isNumber(value)
};

exports.countdownEmits = countdownEmits;
exports.countdownProps = countdownProps;
//# sourceMappingURL=countdown.js.map
