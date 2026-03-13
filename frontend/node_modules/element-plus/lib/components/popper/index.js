'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var popper_vue_vue_type_script_setup_true_lang = require('./src/popper.vue2.js');
var arrow_vue_vue_type_script_setup_true_lang = require('./src/arrow.vue2.js');
var trigger_vue_vue_type_script_setup_true_lang = require('./src/trigger.vue2.js');
var content_vue_vue_type_script_setup_true_lang = require('./src/content.vue2.js');
var popper = require('./src/popper.js');
var trigger = require('./src/trigger.js');
var content = require('./src/content.js');
var arrow = require('./src/arrow.js');
var constants = require('./src/constants.js');
var install = require('../../utils/vue/install.js');

const ElPopper = install.withInstall(popper_vue_vue_type_script_setup_true_lang.default);

exports.ElPopperArrow = arrow_vue_vue_type_script_setup_true_lang.default;
exports.ElPopperTrigger = trigger_vue_vue_type_script_setup_true_lang.default;
exports.ElPopperContent = content_vue_vue_type_script_setup_true_lang.default;
exports.Effect = popper.Effect;
exports.popperProps = popper.popperProps;
exports.roleTypes = popper.roleTypes;
exports.usePopperProps = popper.usePopperProps;
exports.popperTriggerProps = trigger.popperTriggerProps;
exports.usePopperTriggerProps = trigger.usePopperTriggerProps;
exports.popperContentEmits = content.popperContentEmits;
exports.popperContentProps = content.popperContentProps;
exports.popperContentPropsDefaults = content.popperContentPropsDefaults;
exports.popperCoreConfigProps = content.popperCoreConfigProps;
exports.popperCoreConfigPropsDefaults = content.popperCoreConfigPropsDefaults;
exports.usePopperContentEmits = content.usePopperContentEmits;
exports.usePopperContentProps = content.usePopperContentProps;
exports.usePopperCoreConfigProps = content.usePopperCoreConfigProps;
exports.popperArrowProps = arrow.popperArrowProps;
exports.popperArrowPropsDefaults = arrow.popperArrowPropsDefaults;
exports.usePopperArrowProps = arrow.usePopperArrowProps;
exports.POPPER_CONTENT_INJECTION_KEY = constants.POPPER_CONTENT_INJECTION_KEY;
exports.POPPER_INJECTION_KEY = constants.POPPER_INJECTION_KEY;
exports.ElPopper = ElPopper;
exports.default = ElPopper;
//# sourceMappingURL=index.js.map
