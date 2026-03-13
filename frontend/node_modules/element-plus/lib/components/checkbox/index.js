'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var checkbox_vue_vue_type_script_setup_true_lang = require('./src/checkbox.vue2.js');
var checkboxButton_vue_vue_type_script_setup_true_lang = require('./src/checkbox-button.vue2.js');
var checkboxGroup_vue_vue_type_script_setup_true_lang = require('./src/checkbox-group.vue2.js');
var checkboxGroup = require('./src/checkbox-group.js');
var checkbox = require('./src/checkbox.js');
var constants = require('./src/constants.js');
var install = require('../../utils/vue/install.js');

const ElCheckbox = install.withInstall(checkbox_vue_vue_type_script_setup_true_lang.default, {
  CheckboxButton: checkboxButton_vue_vue_type_script_setup_true_lang.default,
  CheckboxGroup: checkboxGroup_vue_vue_type_script_setup_true_lang.default
});
const ElCheckboxButton = install.withNoopInstall(checkboxButton_vue_vue_type_script_setup_true_lang.default);
const ElCheckboxGroup = install.withNoopInstall(checkboxGroup_vue_vue_type_script_setup_true_lang.default);

exports.checkboxDefaultProps = checkboxGroup.checkboxDefaultProps;
exports.checkboxGroupEmits = checkboxGroup.checkboxGroupEmits;
exports.checkboxGroupProps = checkboxGroup.checkboxGroupProps;
exports.checkboxEmits = checkbox.checkboxEmits;
exports.checkboxProps = checkbox.checkboxProps;
exports.checkboxPropsDefaults = checkbox.checkboxPropsDefaults;
exports.checkboxGroupContextKey = constants.checkboxGroupContextKey;
exports.ElCheckbox = ElCheckbox;
exports.ElCheckboxButton = ElCheckboxButton;
exports.ElCheckboxGroup = ElCheckboxGroup;
exports.default = ElCheckbox;
//# sourceMappingURL=index.js.map
