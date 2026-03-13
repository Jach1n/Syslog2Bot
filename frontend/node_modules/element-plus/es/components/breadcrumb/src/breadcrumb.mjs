import { buildProps } from '../../../utils/vue/props/runtime.mjs';
import { iconPropType } from '../../../utils/vue/icon.mjs';

const breadcrumbProps = buildProps({
  /**
   * @description separator character
   */
  separator: {
    type: String,
    default: "/"
  },
  /**
   * @description icon component of icon separator
   */
  separatorIcon: {
    type: iconPropType
  }
});

export { breadcrumbProps };
//# sourceMappingURL=breadcrumb.mjs.map
