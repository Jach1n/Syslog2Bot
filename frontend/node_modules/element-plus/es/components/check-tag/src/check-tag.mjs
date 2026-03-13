import { buildProps } from '../../../utils/vue/props/runtime.mjs';
import { isBoolean } from '../../../utils/types.mjs';
import { CHANGE_EVENT } from '../../../constants/event.mjs';

const checkTagProps = buildProps({
  /**
   * @description is checked
   */
  checked: Boolean,
  /**
   * @description whether the check-tag is disabled
   */
  disabled: Boolean,
  /**
   * @description type of Tag
   */
  type: {
    type: String,
    values: ["primary", "success", "info", "warning", "danger"],
    default: "primary"
  }
});
const checkTagEmits = {
  "update:checked": (value) => isBoolean(value),
  [CHANGE_EVENT]: (value) => isBoolean(value)
};

export { checkTagEmits, checkTagProps };
//# sourceMappingURL=check-tag.mjs.map
