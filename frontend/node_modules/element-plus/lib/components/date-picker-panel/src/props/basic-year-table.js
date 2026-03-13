'use strict';

var shared = require('./shared.js');
var runtime = require('../../../../utils/vue/props/runtime.js');

const basicYearTableProps = runtime.buildProps({
  ...shared.datePickerSharedProps,
  selectionMode: shared.selectionModeWithDefault("year")
});

exports.basicYearTableProps = basicYearTableProps;
//# sourceMappingURL=basic-year-table.js.map
