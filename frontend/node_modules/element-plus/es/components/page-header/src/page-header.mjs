import { Back } from '@element-plus/icons-vue';
import { buildProps } from '../../../utils/vue/props/runtime.mjs';
import { iconPropType } from '../../../utils/vue/icon.mjs';

const pageHeaderProps = buildProps({
  /**
   * @description icon component of page header
   */
  icon: {
    type: iconPropType,
    default: () => Back
  },
  /**
   * @description main title of page header
   */
  title: String,
  /**
   * @description content of page header
   */
  content: {
    type: String,
    default: ""
  }
});
const pageHeaderEmits = {
  back: () => true
};

export { pageHeaderEmits, pageHeaderProps };
//# sourceMappingURL=page-header.mjs.map
