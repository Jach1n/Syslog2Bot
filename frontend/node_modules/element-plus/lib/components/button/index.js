'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var button_vue_vue_type_script_setup_true_lang = require('./src/button.vue2.js');
var buttonGroup_vue_vue_type_script_setup_true_lang = require('./src/button-group.vue2.js');
var button = require('./src/button.js');
var constants = require('./src/constants.js');
var install = require('../../utils/vue/install.js');

const ElButton = install.withInstall(button_vue_vue_type_script_setup_true_lang.default, {
  ButtonGroup: buttonGroup_vue_vue_type_script_setup_true_lang.default
});
const ElButtonGroup = install.withNoopInstall(buttonGroup_vue_vue_type_script_setup_true_lang.default);

exports.buttonEmits = button.buttonEmits;
exports.buttonNativeTypes = button.buttonNativeTypes;
exports.buttonProps = button.buttonProps;
exports.buttonTypes = button.buttonTypes;
exports.buttonGroupContextKey = constants.buttonGroupContextKey;
exports.ElButton = ElButton;
exports.ElButtonGroup = ElButtonGroup;
exports.default = ElButton;
//# sourceMappingURL=index.js.map
