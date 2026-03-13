'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var container_vue_vue_type_script_setup_true_lang = require('./src/container.vue2.js');
var aside_vue_vue_type_script_setup_true_lang = require('./src/aside.vue2.js');
var footer_vue_vue_type_script_setup_true_lang = require('./src/footer.vue2.js');
var header_vue_vue_type_script_setup_true_lang = require('./src/header.vue2.js');
var main_vue_vue_type_script_setup_true_lang = require('./src/main.vue2.js');
var install = require('../../utils/vue/install.js');

const ElContainer = install.withInstall(container_vue_vue_type_script_setup_true_lang.default, {
  Aside: aside_vue_vue_type_script_setup_true_lang.default,
  Footer: footer_vue_vue_type_script_setup_true_lang.default,
  Header: header_vue_vue_type_script_setup_true_lang.default,
  Main: main_vue_vue_type_script_setup_true_lang.default
});
const ElAside = install.withNoopInstall(aside_vue_vue_type_script_setup_true_lang.default);
const ElFooter = install.withNoopInstall(footer_vue_vue_type_script_setup_true_lang.default);
const ElHeader = install.withNoopInstall(header_vue_vue_type_script_setup_true_lang.default);
const ElMain = install.withNoopInstall(main_vue_vue_type_script_setup_true_lang.default);

exports.ElAside = ElAside;
exports.ElContainer = ElContainer;
exports.ElFooter = ElFooter;
exports.ElHeader = ElHeader;
exports.ElMain = ElMain;
exports.default = ElContainer;
//# sourceMappingURL=index.js.map
