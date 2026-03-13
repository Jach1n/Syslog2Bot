'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');

const carouselItemProps = runtime.buildProps({
  /**
   * @description name of the item, can be used in `setActiveItem`
   */
  name: { type: String, default: "" },
  /**
   * @description text content for the corresponding indicator
   */
  label: {
    type: [String, Number],
    default: ""
  }
});

exports.carouselItemProps = carouselItemProps;
//# sourceMappingURL=carousel-item.js.map
