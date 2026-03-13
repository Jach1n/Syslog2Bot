'use strict';

var runtime = require('../../../../utils/vue/props/runtime.js');

const svPanelProps = runtime.buildProps({
  color: {
    type: runtime.definePropType(Object),
    required: true
  },
  disabled: Boolean
});

exports.svPanelProps = svPanelProps;
//# sourceMappingURL=sv-panel.js.map
