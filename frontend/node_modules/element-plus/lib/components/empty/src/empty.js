'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');

const emptyProps = runtime.buildProps({
  /**
   * @description image URL of empty
   */
  image: {
    type: String,
    default: ""
  },
  /**
   * @description image size (width) of empty
   */
  imageSize: Number,
  /**
   * @description description of empty
   */
  description: {
    type: String,
    default: ""
  }
});

exports.emptyProps = emptyProps;
//# sourceMappingURL=empty.js.map
