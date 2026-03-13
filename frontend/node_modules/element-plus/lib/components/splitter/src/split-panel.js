'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');

const splitterPanelProps = runtime.buildProps({
  min: {
    type: [String, Number]
  },
  max: {
    type: [String, Number]
  },
  size: {
    type: [String, Number]
  },
  resizable: {
    type: Boolean,
    default: true
  },
  collapsible: Boolean
});
const splitterPanelEmits = {
  "update:size": (value) => typeof value === "number" || typeof value === "string"
};

exports.splitterPanelEmits = splitterPanelEmits;
exports.splitterPanelProps = splitterPanelProps;
//# sourceMappingURL=split-panel.js.map
