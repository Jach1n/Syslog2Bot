'use strict';

var shared = require('./shared.js');
var runtime = require('../../../../utils/vue/props/runtime.js');

const panelTimeRangeProps = runtime.buildProps({
  ...shared.timePanelSharedProps,
  parsedValue: {
    type: runtime.definePropType(Array)
  }
});

exports.panelTimeRangeProps = panelTimeRangeProps;
//# sourceMappingURL=panel-time-range.js.map
