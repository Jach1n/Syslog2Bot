'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var breadcrumb_vue_vue_type_script_setup_true_lang = require('./src/breadcrumb.vue2.js');
var breadcrumbItem_vue_vue_type_script_setup_true_lang = require('./src/breadcrumb-item.vue2.js');
var breadcrumb = require('./src/breadcrumb.js');
var breadcrumbItem = require('./src/breadcrumb-item.js');
var constants = require('./src/constants.js');
var install = require('../../utils/vue/install.js');

const ElBreadcrumb = install.withInstall(breadcrumb_vue_vue_type_script_setup_true_lang.default, {
  BreadcrumbItem: breadcrumbItem_vue_vue_type_script_setup_true_lang.default
});
const ElBreadcrumbItem = install.withNoopInstall(breadcrumbItem_vue_vue_type_script_setup_true_lang.default);

exports.breadcrumbProps = breadcrumb.breadcrumbProps;
exports.breadcrumbItemProps = breadcrumbItem.breadcrumbItemProps;
exports.breadcrumbKey = constants.breadcrumbKey;
exports.ElBreadcrumb = ElBreadcrumb;
exports.ElBreadcrumbItem = ElBreadcrumbItem;
exports.default = ElBreadcrumb;
//# sourceMappingURL=index.js.map
