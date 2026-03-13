'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var size = require('../../../constants/size.js');

const textProps = runtime.buildProps({
  /**
   * @description text type
   */
  type: {
    type: String,
    values: ["primary", "success", "info", "warning", "danger", ""],
    default: ""
  },
  /**
   * @description text size
   */
  size: {
    type: String,
    values: size.componentSizes,
    default: ""
  },
  /**
   * @description render ellipsis
   */
  truncated: Boolean,
  /**
   * @description maximum lines
   */
  lineClamp: {
    type: [String, Number]
  },
  /**
   * @description custom element tag
   */
  tag: {
    type: String,
    default: "span"
  }
});

exports.textProps = textProps;
//# sourceMappingURL=text.js.map
