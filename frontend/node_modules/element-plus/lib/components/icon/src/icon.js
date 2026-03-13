'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');

const iconProps = runtime.buildProps({
  /**
   * @description SVG icon size, size x size
   */
  size: {
    type: runtime.definePropType([Number, String])
  },
  /**
   * @description SVG tag's fill attribute
   */
  color: {
    type: String
  }
});

exports.iconProps = iconProps;
//# sourceMappingURL=icon.js.map
