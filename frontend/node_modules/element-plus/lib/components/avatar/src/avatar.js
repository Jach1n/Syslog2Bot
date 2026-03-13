'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var icon = require('../../../utils/vue/icon.js');
var types = require('../../../utils/types.js');
var size = require('../../../constants/size.js');

const avatarProps = runtime.buildProps({
  /**
   * @description avatar size.
   */
  size: {
    type: [Number, String],
    values: size.componentSizes,
    validator: (val) => types.isNumber(val)
  },
  /**
   * @description avatar shape.
   */
  shape: {
    type: String,
    values: ["circle", "square"]
  },
  /**
   * @description representation type to icon, more info on icon component.
   */
  icon: {
    type: icon.iconPropType
  },
  /**
   * @description the source of the image for an image avatar.
   */
  src: {
    type: String,
    default: ""
  },
  /**
   * @description native attribute `alt` of image avatar.
   */
  alt: String,
  /**
   * @description native attribute srcset of image avatar.
   */
  srcSet: String,
  /**
   * @description set how the image fit its container for an image avatar.
   */
  fit: {
    type: runtime.definePropType(String),
    default: "cover"
  }
});
const avatarEmits = {
  error: (evt) => evt instanceof Event
};

exports.avatarEmits = avatarEmits;
exports.avatarProps = avatarProps;
//# sourceMappingURL=avatar.js.map
