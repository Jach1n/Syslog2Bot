'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');

const skeletonItemProps = runtime.buildProps({
  /**
   * @description the current rendering skeleton type
   */
  variant: {
    type: String,
    values: [
      "circle",
      "rect",
      "h1",
      "h3",
      "text",
      "caption",
      "p",
      "image",
      "button"
    ],
    default: "text"
  }
});

exports.skeletonItemProps = skeletonItemProps;
//# sourceMappingURL=skeleton-item.js.map
