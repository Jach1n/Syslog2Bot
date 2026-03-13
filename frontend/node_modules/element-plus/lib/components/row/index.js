'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var row_vue_vue_type_script_setup_true_lang = require('./src/row.vue2.js');
var row = require('./src/row.js');
var constants = require('./src/constants.js');
var install = require('../../utils/vue/install.js');

const ElRow = install.withInstall(row_vue_vue_type_script_setup_true_lang.default);

exports.RowAlign = row.RowAlign;
exports.RowJustify = row.RowJustify;
exports.rowProps = row.rowProps;
exports.rowContextKey = constants.rowContextKey;
exports.ElRow = ElRow;
exports.default = ElRow;
//# sourceMappingURL=index.js.map
