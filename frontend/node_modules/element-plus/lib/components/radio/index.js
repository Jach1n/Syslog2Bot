'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var radio_vue_vue_type_script_setup_true_lang = require('./src/radio.vue2.js');
var radioButton_vue_vue_type_script_setup_true_lang = require('./src/radio-button.vue2.js');
var radioGroup_vue_vue_type_script_setup_true_lang = require('./src/radio-group.vue2.js');
var radio = require('./src/radio.js');
var radioGroup = require('./src/radio-group.js');
var radioButton = require('./src/radio-button.js');
var constants = require('./src/constants.js');
var install = require('../../utils/vue/install.js');

const ElRadio = install.withInstall(radio_vue_vue_type_script_setup_true_lang.default, {
  RadioButton: radioButton_vue_vue_type_script_setup_true_lang.default,
  RadioGroup: radioGroup_vue_vue_type_script_setup_true_lang.default
});
const ElRadioGroup = install.withNoopInstall(radioGroup_vue_vue_type_script_setup_true_lang.default);
const ElRadioButton = install.withNoopInstall(radioButton_vue_vue_type_script_setup_true_lang.default);

exports.radioEmits = radio.radioEmits;
exports.radioProps = radio.radioProps;
exports.radioPropsBase = radio.radioPropsBase;
exports.radioPropsDefaults = radio.radioPropsDefaults;
exports.radioDefaultProps = radioGroup.radioDefaultProps;
exports.radioGroupEmits = radioGroup.radioGroupEmits;
exports.radioGroupProps = radioGroup.radioGroupProps;
exports.radioGroupPropsDefaults = radioGroup.radioGroupPropsDefaults;
exports.radioButtonProps = radioButton.radioButtonProps;
exports.radioButtonPropsDefaults = radioButton.radioButtonPropsDefaults;
exports.radioGroupKey = constants.radioGroupKey;
exports.ElRadio = ElRadio;
exports.ElRadioButton = ElRadioButton;
exports.ElRadioGroup = ElRadioGroup;
exports.default = ElRadio;
//# sourceMappingURL=index.js.map
