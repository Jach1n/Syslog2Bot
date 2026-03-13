'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');

const skeletonProps = runtime.buildProps({
  /**
   * @description whether showing the animation
   */
  animated: Boolean,
  /**
   * @description how many fake items to render to the DOM
   */
  count: {
    type: Number,
    default: 1
  },
  /**
   * @description numbers of the row, only useful when no template slot were given
   */
  rows: {
    type: Number,
    default: 3
  },
  /**
   * @description whether showing the real DOM
   */
  loading: {
    type: Boolean,
    default: true
  },
  /**
   * @description rendering delay in milliseconds
   */
  throttle: {
    type: runtime.definePropType([Number, Object])
  }
});

exports.skeletonProps = skeletonProps;
//# sourceMappingURL=skeleton.js.map
