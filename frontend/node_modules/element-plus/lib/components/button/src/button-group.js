'use strict';

var button = require('./button.js');
var runtime = require('../../../utils/vue/props/runtime.js');

const buttonGroupProps = {
  /**
   * @description control the size of buttons in this button-group
   */
  size: button.buttonProps.size,
  /**
   * @description control the type of buttons in this button-group
   */
  type: button.buttonProps.type,
  /**
   * @description display direction
   */
  direction: {
    type: runtime.definePropType(String),
    values: ["horizontal", "vertical"],
    default: "horizontal"
  }
};

exports.buttonGroupProps = buttonGroupProps;
//# sourceMappingURL=button-group.js.map
