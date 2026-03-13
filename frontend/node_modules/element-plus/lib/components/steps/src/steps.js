'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var event = require('../../../constants/event.js');
var types = require('../../../utils/types.js');

const stepsProps = runtime.buildProps({
  /**
   * @description the spacing of each step, will be responsive if omitted. Supports percentage.
   */
  space: {
    type: [Number, String],
    default: ""
  },
  /**
   * @description current activation step
   */
  active: {
    type: Number,
    default: 0
  },
  /**
   * @description display direction
   */
  direction: {
    type: String,
    default: "horizontal",
    values: ["horizontal", "vertical"]
  },
  /**
   * @description center title and description
   */
  alignCenter: {
    type: Boolean
  },
  /**
   * @description whether to apply simple theme
   */
  simple: {
    type: Boolean
  },
  /**
   * @description status of end step
   */
  finishStatus: {
    type: String,
    values: ["wait", "process", "finish", "error", "success"],
    default: "finish"
  },
  /**
   * @description status of current step
   */
  processStatus: {
    type: String,
    values: ["wait", "process", "finish", "error", "success"],
    default: "process"
  }
});
const stepsEmits = {
  [event.CHANGE_EVENT]: (newVal, oldVal) => [newVal, oldVal].every(types.isNumber)
};

exports.stepsEmits = stepsEmits;
exports.stepsProps = stepsProps;
//# sourceMappingURL=steps.js.map
