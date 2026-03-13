'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');

const splitterProps = runtime.buildProps({
  layout: {
    type: String,
    default: "horizontal",
    values: ["horizontal", "vertical"]
  },
  lazy: Boolean
});
const splitterEmits = {
  resizeStart: (index, sizes) => true,
  resize: (index, sizes) => true,
  resizeEnd: (index, sizes) => true,
  collapse: (index, type, sizes) => true
};

exports.splitterEmits = splitterEmits;
exports.splitterProps = splitterProps;
//# sourceMappingURL=splitter.js.map
