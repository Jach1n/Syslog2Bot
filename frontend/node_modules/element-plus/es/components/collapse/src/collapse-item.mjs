import { ArrowRight } from '@element-plus/icons-vue';
import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';
import { iconPropType } from '../../../utils/vue/icon.mjs';

const collapseItemProps = buildProps({
  /**
   * @description title of the panel
   */
  title: {
    type: String,
    default: ""
  },
  /**
   * @description unique identification of the panel
   */
  name: {
    type: definePropType([String, Number]),
    default: void 0
  },
  /**
   * @description icon of the collapse item
   */
  icon: {
    type: iconPropType,
    default: ArrowRight
  },
  /**
   * @description disable the collapse item
   */
  disabled: Boolean
});

export { collapseItemProps };
//# sourceMappingURL=collapse-item.mjs.map
