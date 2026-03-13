'use strict';

var shared = require('./shared.js');
var runtime = require('../../../../utils/vue/props/runtime.js');

const panelDateRangeProps = runtime.buildProps({
  ...shared.panelSharedProps,
  ...shared.panelRangeSharedProps
});

exports.panelDateRangeProps = panelDateRangeProps;
//# sourceMappingURL=panel-date-range.js.map
