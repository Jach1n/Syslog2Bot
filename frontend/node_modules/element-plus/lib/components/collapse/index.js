'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var collapse_vue_vue_type_script_setup_true_lang = require('./src/collapse.vue2.js');
var collapseItem_vue_vue_type_script_setup_true_lang = require('./src/collapse-item.vue2.js');
var collapse = require('./src/collapse.js');
var collapseItem = require('./src/collapse-item.js');
var constants = require('./src/constants.js');
var install = require('../../utils/vue/install.js');

const ElCollapse = install.withInstall(collapse_vue_vue_type_script_setup_true_lang.default, {
  CollapseItem: collapseItem_vue_vue_type_script_setup_true_lang.default
});
const ElCollapseItem = install.withNoopInstall(collapseItem_vue_vue_type_script_setup_true_lang.default);

exports.collapseEmits = collapse.collapseEmits;
exports.collapseProps = collapse.collapseProps;
exports.emitChangeFn = collapse.emitChangeFn;
exports.collapseItemProps = collapseItem.collapseItemProps;
exports.collapseContextKey = constants.collapseContextKey;
exports.ElCollapse = ElCollapse;
exports.ElCollapseItem = ElCollapseItem;
exports.default = ElCollapse;
//# sourceMappingURL=index.js.map
