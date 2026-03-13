import { buildProps } from '../../../utils/vue/props/runtime.mjs';
import { iconPropType } from '../../../utils/vue/icon.mjs';

const linkProps = buildProps({
  /**
   * @description type
   */
  type: {
    type: String,
    values: ["primary", "success", "warning", "info", "danger", "default"],
    default: void 0
  },
  /**
   * @description when underlines should appear
   */
  underline: {
    type: [Boolean, String],
    values: [true, false, "always", "never", "hover"],
    default: void 0
  },
  /**
   * @description whether the component is disabled
   */
  disabled: Boolean,
  /**
   * @description same as native hyperlink's `href`
   */
  href: { type: String, default: "" },
  /**
   * @description same as native hyperlink's `target`
   */
  target: {
    type: String,
    default: "_self"
  },
  /**
   * @description icon component
   */
  icon: {
    type: iconPropType
  }
});
const linkEmits = {
  click: (evt) => evt instanceof MouseEvent
};

export { linkEmits, linkProps };
//# sourceMappingURL=link.mjs.map
