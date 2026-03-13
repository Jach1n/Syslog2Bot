import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';
import { useAriaProps } from '../../../hooks/use-aria/index.mjs';
import { useSizeProp } from '../../../hooks/use-size/index.mjs';
import { isString } from '@vue/shared';
import { isNumber, isBoolean } from '../../../utils/types.mjs';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants/event.mjs';

const defaultProps = {
  label: "label",
  value: "value",
  disabled: "disabled"
};
const segmentedProps = buildProps({
  direction: {
    type: definePropType(String),
    default: "horizontal"
  },
  /**
   * @description options of segmented
   */
  options: {
    type: definePropType(Array),
    default: () => []
  },
  /**
   * @description binding value
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: void 0
  },
  /**
   * @description configuration options, see the following table
   */
  props: {
    type: definePropType(Object),
    default: () => defaultProps
  },
  /**
   * @description fit width of parent content
   */
  block: Boolean,
  /**
   * @description size of component
   */
  size: useSizeProp,
  /**
   * @description whether segmented is disabled
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /**
   * @description native input id
   */
  id: String,
  /**
   * @description native `name` attribute
   */
  name: String,
  ...useAriaProps(["ariaLabel"])
});
const segmentedEmits = {
  [UPDATE_MODEL_EVENT]: (val) => isString(val) || isNumber(val) || isBoolean(val),
  [CHANGE_EVENT]: (val) => isString(val) || isNumber(val) || isBoolean(val)
};

export { defaultProps, segmentedEmits, segmentedProps };
//# sourceMappingURL=segmented.mjs.map
