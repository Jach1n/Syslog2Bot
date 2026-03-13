'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');

const tourStrategies = ["absolute", "fixed"];
const tourPlacements = [
  "top-start",
  "top-end",
  "top",
  "bottom-start",
  "bottom-end",
  "bottom",
  "left-start",
  "left-end",
  "left",
  "right-start",
  "right-end",
  "right"
];
const tourContentProps = runtime.buildProps({
  /**
   * @description position of the guide card relative to the target element
   */
  placement: {
    type: runtime.definePropType(String),
    values: tourPlacements,
    default: "bottom"
  },
  /**
   * @description the reference dom
   */
  reference: {
    type: runtime.definePropType(Object),
    default: null
  },
  /**
   * @description position strategy of the content
   */
  strategy: {
    type: runtime.definePropType(String),
    values: tourStrategies,
    default: "absolute"
  },
  /**
   * @description offset of the arrow
   */
  offset: {
    type: Number,
    default: 10
  },
  /**
   * @description whether to show the arrow
   */
  showArrow: Boolean,
  /**
   * @description content's zIndex
   */
  zIndex: {
    type: Number,
    default: 2001
  }
});
const tourContentEmits = {
  close: () => true
};

exports.tourContentEmits = tourContentEmits;
exports.tourContentProps = tourContentProps;
exports.tourPlacements = tourPlacements;
exports.tourStrategies = tourStrategies;
//# sourceMappingURL=content.js.map
