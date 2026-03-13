'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var shared = require('@vue/shared');
var event = require('../../../constants/event.js');

const isValidRange = (range) => shared.isArray(range) && range.length === 2 && range.every((item) => shared.isDate(item));
const calendarProps = runtime.buildProps({
  /**
   * @description binding value
   */
  modelValue: {
    type: Date
  },
  /**
   * @description time range, including start time and end time.
   *   Start time must be start day of week, end time must be end day of week, the time span cannot exceed two months.
   */
  range: {
    type: runtime.definePropType(Array),
    validator: isValidRange
  },
  /**
   * @description type of the controller for the Calendar header
   */
  controllerType: {
    type: String,
    values: ["button", "select"],
    default: "button"
  },
  /**
   * @description format label when `controller-type` is 'select'
   */
  formatter: {
    type: runtime.definePropType(Function)
  }
});
const calendarEmits = {
  [event.UPDATE_MODEL_EVENT]: (value) => shared.isDate(value),
  [event.INPUT_EVENT]: (value) => shared.isDate(value)
};

exports.calendarEmits = calendarEmits;
exports.calendarProps = calendarProps;
//# sourceMappingURL=calendar.js.map
