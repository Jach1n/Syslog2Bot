import { buildProps } from '../../../utils/vue/props/runtime.mjs';
import { componentSizes } from '../../../constants/size.mjs';

const textProps = buildProps({
  /**
   * @description text type
   */
  type: {
    type: String,
    values: ["primary", "success", "info", "warning", "danger", ""],
    default: ""
  },
  /**
   * @description text size
   */
  size: {
    type: String,
    values: componentSizes,
    default: ""
  },
  /**
   * @description render ellipsis
   */
  truncated: Boolean,
  /**
   * @description maximum lines
   */
  lineClamp: {
    type: [String, Number]
  },
  /**
   * @description custom element tag
   */
  tag: {
    type: String,
    default: "span"
  }
});

export { textProps };
//# sourceMappingURL=text.mjs.map
