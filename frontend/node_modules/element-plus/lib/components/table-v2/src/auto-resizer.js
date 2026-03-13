'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');

const autoResizerProps = runtime.buildProps({
  disableWidth: Boolean,
  disableHeight: Boolean,
  onResize: {
    type: runtime.definePropType(Function)
  }
});

exports.autoResizerProps = autoResizerProps;
//# sourceMappingURL=auto-resizer.js.map
