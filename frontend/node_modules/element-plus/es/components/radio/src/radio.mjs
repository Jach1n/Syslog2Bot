import { buildProps } from '../../../utils/vue/props/runtime.mjs';
import { useSizeProp } from '../../../hooks/use-size/index.mjs';
import { isString } from '@vue/shared';
import { isNumber, isBoolean } from '../../../utils/types.mjs';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants/event.mjs';

const radioPropsBase = buildProps({
  /**
   * @description binding value
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: void 0
  },
  /**
   * @description size of the Radio
   */
  size: useSizeProp,
  /**
   * @description whether Radio is disabled
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description the label of Radio
   */
  label: {
    type: [String, Number, Boolean],
    default: void 0
  },
  /**
   * @description the value of Radio
   */
  value: {
    type: [String, Number, Boolean],
    default: void 0
  },
  /**
   * @description native `name` attribute
   */
  name: {
    type: String,
    default: void 0
  }
});
const radioProps = buildProps({
  ...radioPropsBase,
  /**
   * @description whether to add a border around Radio
   */
  border: Boolean
});
const radioEmits = {
  [UPDATE_MODEL_EVENT]: (val) => isString(val) || isNumber(val) || isBoolean(val),
  [CHANGE_EVENT]: (val) => isString(val) || isNumber(val) || isBoolean(val)
};
const radioPropsDefaults = {
  modelValue: void 0,
  disabled: void 0,
  label: void 0,
  value: void 0,
  name: void 0,
  border: false
};

export { radioEmits, radioProps, radioPropsBase, radioPropsDefaults };
//# sourceMappingURL=radio.mjs.map
