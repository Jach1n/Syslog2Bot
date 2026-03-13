'use strict';

var core = require('@popperjs/core');
var content = require('../../tooltip/src/content.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var types = require('../../../utils/types.js');
var size = require('../../../constants/size.js');

const avatarGroupProps = {
  /**
   * @description control the size of avatars in this avatar-group
   */
  size: {
    type: runtime.definePropType([Number, String]),
    values: size.componentSizes,
    validator: (val) => types.isNumber(val)
  },
  /**
   * @description control the shape of avatars in this avatar-group
   */
  shape: {
    type: runtime.definePropType(String),
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
    type: runtime.definePropType(String),
    default: "light"
  },
  /**
   * @description placement of tooltip
   */
  placement: {
    type: runtime.definePropType(String),
    values: core.placements,
    default: "top"
  },
  /**
   * @description custom class name for tooltip
   */
  popperClass: content.useTooltipContentProps.popperClass,
  /**
   * @description custom style for tooltip
   */
  popperStyle: content.useTooltipContentProps.popperStyle,
  /**
   * @description custom class name for the collapse-avatar
   */
  collapseClass: String,
  /**
   * @description custom style for the collapse-avatar
   */
  collapseStyle: {
    type: runtime.definePropType([String, Array, Object])
  }
};

exports.avatarGroupProps = avatarGroupProps;
//# sourceMappingURL=avatar-group-props.js.map
