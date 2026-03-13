'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');

const thumbProps = runtime.buildProps({
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: true
  },
  always: Boolean
});

exports.thumbProps = thumbProps;
//# sourceMappingURL=thumb.js.map
