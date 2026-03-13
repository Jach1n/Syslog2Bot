'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var icon = require('../../../utils/vue/icon.js');

const timelineItemProps = runtime.buildProps({
  /**
   * @description timestamp content
   */
  timestamp: {
    type: String,
    default: ""
  },
  /**
   * @description whether to show timestamp
   */
  hideTimestamp: Boolean,
  /**
   * @description whether vertically centered
   */
  center: Boolean,
  /**
   * @description position of timestamp
   */
  placement: {
    type: String,
    values: ["top", "bottom"],
    default: "bottom"
  },
  /**
   * @description node type
   */
  type: {
    type: String,
    values: ["primary", "success", "warning", "danger", "info"],
    default: ""
  },
  /**
   * @description background color of node
   */
  color: {
    type: String,
    default: ""
  },
  /**
   * @description node size
   */
  size: {
    type: String,
    values: ["normal", "large"],
    default: "normal"
  },
  /**
   * @description icon component
   */
  icon: {
    type: icon.iconPropType
  },
  /**
   * @description icon is hollow
   */
  hollow: Boolean
});

exports.timelineItemProps = timelineItemProps;
//# sourceMappingURL=timeline-item.js.map
