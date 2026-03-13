'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var index = require('../../../hooks/use-aria/index.js');
var types = require('../../../utils/types.js');

const scrollbarProps = runtime.buildProps({
  /**
   * @description trigger distance(px)
   */
  distance: {
    type: Number,
    default: 0
  },
  /**
   * @description height of scrollbar
   */
  height: {
    type: [String, Number],
    default: ""
  },
  /**
   * @description max height of scrollbar
   */
  maxHeight: {
    type: [String, Number],
    default: ""
  },
  /**
   * @description whether to use the native scrollbar
   */
  native: Boolean,
  /**
   * @description style of wrap
   */
  wrapStyle: {
    type: runtime.definePropType([String, Object, Array]),
    default: ""
  },
  /**
   * @description class of wrap
   */
  wrapClass: {
    type: [String, Array],
    default: ""
  },
  /**
   * @description class of view
   */
  viewClass: {
    type: [String, Array],
    default: ""
  },
  /**
   * @description style of view
   */
  viewStyle: {
    type: [String, Array, Object],
    default: ""
  },
  /**
   * @description do not respond to container size changes, if the container size does not change, it is better to set it to optimize performance
   */
  noresize: Boolean,
  // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
  /**
   * @description element tag of the view
   */
  tag: {
    type: String,
    default: "div"
  },
  /**
   * @description always show
   */
  always: Boolean,
  /**
   * @description minimum size of scrollbar
   */
  minSize: {
    type: Number,
    default: 20
  },
  /**
   * @description Wrap tabindex
   */
  tabindex: {
    type: [String, Number],
    default: void 0
  },
  /**
   * @description id of view
   */
  id: String,
  /**
   * @description role of view
   */
  role: String,
  ...index.useAriaProps(["ariaLabel", "ariaOrientation"])
});
const scrollbarEmits = {
  "end-reached": (direction) => ["left", "right", "top", "bottom"].includes(direction),
  scroll: ({
    scrollTop,
    scrollLeft
  }) => [scrollTop, scrollLeft].every(types.isNumber)
};

exports.scrollbarEmits = scrollbarEmits;
exports.scrollbarProps = scrollbarProps;
//# sourceMappingURL=scrollbar.js.map
