'use strict';

var runtime = require('../../../../utils/vue/props/runtime.js');

const predefineProps = runtime.buildProps({
  colors: {
    type: runtime.definePropType(Array),
    required: true
  },
  color: {
    type: runtime.definePropType(Object),
    required: true
  },
  enableAlpha: {
    type: Boolean,
    required: true
  },
  disabled: Boolean
});

exports.predefineProps = predefineProps;
//# sourceMappingURL=predefine.js.map
