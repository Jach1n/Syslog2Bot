import { buildProps } from '../../../utils/vue/props/runtime.mjs';
import { iconPropType } from '../../../utils/vue/icon.mjs';

const stepProps = buildProps({
  /**
   * @description step title
   */
  title: {
    type: String,
    default: ""
  },
  /**
   * @description step custom icon. Icons can be passed via named slot as well
   */
  icon: {
    type: iconPropType
  },
  /**
   * @description step description
   */
  description: {
    type: String,
    default: ""
  },
  /**
   * @description current status. It will be automatically set by Steps if not configured.
   */
  status: {
    type: String,
    values: ["", "wait", "process", "finish", "error", "success"],
    default: ""
  }
});

export { stepProps };
//# sourceMappingURL=item.mjs.map
