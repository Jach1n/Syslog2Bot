'use strict';

var common = require('./common.js');
var runtime = require('../../../utils/vue/props/runtime.js');

const tableV2HeaderCell = runtime.buildProps({
  class: common.classType,
  columnIndex: Number,
  column: common.column
});

exports.tableV2HeaderCell = tableV2HeaderCell;
//# sourceMappingURL=header-cell.js.map
