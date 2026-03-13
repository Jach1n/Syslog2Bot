import { timePickerDefaultProps } from '../../time-picker/src/common/props.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';

const datePickerProps = buildProps({
  ...timePickerDefaultProps,
  /**
   * @description type of the picker
   */
  type: {
    type: definePropType(String),
    default: "date"
  }
});

export { datePickerProps };
//# sourceMappingURL=props.mjs.map
