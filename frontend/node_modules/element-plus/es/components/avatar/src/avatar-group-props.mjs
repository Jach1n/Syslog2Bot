import { placements } from '@popperjs/core';
import { useTooltipContentProps } from '../../tooltip/src/content.mjs';
import { definePropType } from '../../../utils/vue/props/runtime.mjs';
import { isNumber } from '../../../utils/types.mjs';
import { componentSizes } from '../../../constants/size.mjs';

const avatarGroupProps = {
  /**
   * @description control the size of avatars in this avatar-group
   */
  size: {
    type: definePropType([Number, String]),
    values: componentSizes,
    validator: (val) => isNumber(val)
  },
  /**
   * @description control the shape of avatars in this avatar-group
   */
  shape: {
    type: definePropType(String),
    values: ["circle", "square"]
  },
  /**
   * @description whether to collapse avatars
   */
  collapseAvatars: Boolean,
  /**
   * @description whether show all collapsed avatars when mouse hover text of the collapse-avatar. To use this, `collapse-avatars` must be true
   */
  collapseAvatarsTooltip: Boolean,
  /**
   * @description the max avatars number to be shown. To use this, `collapse-avatars` must be true
   */
  maxCollapseAvatars: {
    type: Number,
    default: 1
  },
  /**
   * @description tooltip theme, built-in theme: `dark` / `light`
   */
  effect: {
    type: definePropType(String),
    default: "light"
  },
  /**
   * @description placement of tooltip
   */
  placement: {
    type: definePropType(String),
    values: placements,
    default: "top"
  },
  /**
   * @description custom class name for tooltip
   */
  popperClass: useTooltipContentProps.popperClass,
  /**
   * @description custom style for tooltip
   */
  popperStyle: useTooltipContentProps.popperStyle,
  /**
   * @description custom class name for the collapse-avatar
   */
  collapseClass: String,
  /**
   * @description custom style for the collapse-avatar
   */
  collapseStyle: {
    type: definePropType([String, Array, Object])
  }
};

export { avatarGroupProps };
//# sourceMappingURL=avatar-group-props.mjs.map
