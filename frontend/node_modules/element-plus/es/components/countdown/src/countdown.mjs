import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';
import { isNumber } from '../../../utils/types.mjs';
import { CHANGE_EVENT } from '../../../constants/event.mjs';

const countdownProps = buildProps({
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
    type: definePropType([Number, Object]),
    default: 0
  },
  /**
   * @description Styles countdown values
   */
  valueStyle: {
    type: definePropType([String, Object, Array])
  }
});
const countdownEmits = {
  finish: () => true,
  [CHANGE_EVENT]: (value) => isNumber(value)
};

export { countdownEmits, countdownProps };
//# sourceMappingURL=countdown.mjs.map
