import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';
import { isString, isArray } from '@vue/shared';

const menuItemProps = buildProps({
  /**
   * @description unique identification
   */
  index: {
    type: definePropType([String, null]),
    // will be required in the next major version
    // required: true,
    default: null
  },
  /**
   * @description Vue Router object
   */
  route: {
    type: definePropType([String, Object])
  },
  /**
   * @description whether disabled
   */
  disabled: Boolean
});
const menuItemEmits = {
  click: (item) => isString(item.index) && isArray(item.indexPath)
};

export { menuItemEmits, menuItemProps };
//# sourceMappingURL=menu-item.mjs.map
