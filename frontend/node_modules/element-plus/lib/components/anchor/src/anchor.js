'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var shared = require('@vue/shared');
var types = require('../../../utils/types.js');

const anchorProps = runtime.buildProps({
  /**
   * @description scroll container
   */
  container: {
    type: runtime.definePropType([
      String,
      Object
    ])
  },
  /**
   * @description Set the offset of the anchor scroll
   */
  offset: {
    type: Number,
    default: 0
  },
  /**
   * @description The offset of the element starting to trigger the anchor
   */
  bound: {
    type: Number,
    default: 15
  },
  /**
   * @description Set the scroll duration of the container when the anchor is clicked, in milliseconds
   */
  duration: {
    type: Number,
    default: 300
  },
  /**
   * @description Whether to show the marker
   */
  marker: {
    type: Boolean,
    default: true
  },
  /**
   * @description Set Anchor type
   */
  type: {
    type: runtime.definePropType(String),
    default: "default"
  },
  /**
   * @description Set Anchor direction
   */
  direction: {
    type: runtime.definePropType(String),
    default: "vertical"
  },
  /**
   * @description Scroll whether link is selected at the top
   */
  selectScrollTop: Boolean
});
const anchorEmits = {
  change: (href) => shared.isString(href),
  click: (e, href) => e instanceof MouseEvent && (shared.isString(href) || types.isUndefined(href))
};

exports.anchorEmits = anchorEmits;
exports.anchorProps = anchorProps;
//# sourceMappingURL=anchor.js.map
