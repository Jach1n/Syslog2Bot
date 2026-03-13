'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');

const dividerProps = runtime.buildProps({
  /**
   * @description Set divider's direction
   */
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  /**
   * @description Set the style of divider
   */
  contentPosition: {
    type: String,
    values: ["left", "center", "right"],
    default: "center"
  },
  /**
   * @description the position of the customized content on the divider line
   */
  borderStyle: {
    type: runtime.definePropType(String),
    default: "solid"
  }
});

exports.dividerProps = dividerProps;
//# sourceMappingURL=divider.js.map
