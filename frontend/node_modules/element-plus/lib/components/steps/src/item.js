'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var icon = require('../../../utils/vue/icon.js');

const stepProps = runtime.buildProps({
  /**
   * @description step title
   */
  title: {
    type: String,
    default: ""
  },
  /**
   * @description step custom icon. Icons can be passed via named slot as well
   */
  icon: {
    type: icon.iconPropType
  },
  /**
   * @description step description
   */
  description: {
    type: String,
    default: ""
  },
  /**
   * @description current status. It will be automatically set by Steps if not configured.
   */
  status: {
    type: String,
    values: ["", "wait", "process", "finish", "error", "success"],
    default: ""
  }
});

exports.stepProps = stepProps;
//# sourceMappingURL=item.js.map
