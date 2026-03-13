'use strict';

var shared = require('./shared.js');
var runtime = require('../../../../utils/vue/props/runtime.js');

const basicDateTableProps = runtime.buildProps({
  ...shared.datePickerSharedProps,
  showWeekNumber: Boolean,
  selectionMode: shared.selectionModeWithDefault("date")
});
const basicDateTableEmits = ["changerange", "pick", "select"];

exports.basicDateTableEmits = basicDateTableEmits;
exports.basicDateTableProps = basicDateTableProps;
//# sourceMappingURL=basic-date-table.js.map
