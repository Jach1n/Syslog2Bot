'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dialog_vue_vue_type_script_setup_true_lang = require('./src/dialog.vue2.js');
var useDialog = require('./src/use-dialog.js');
var dialog = require('./src/dialog.js');
var constants = require('./src/constants.js');
var install = require('../../utils/vue/install.js');

const ElDialog = install.withInstall(dialog_vue_vue_type_script_setup_true_lang.default);

exports.useDialog = useDialog.useDialog;
exports.dialogContextKey = dialog.dialogContextKey;
exports.dialogEmits = dialog.dialogEmits;
exports.dialogProps = dialog.dialogProps;
exports.dialogPropsDefaults = dialog.dialogPropsDefaults;
exports.DEFAULT_DIALOG_TRANSITION = constants.DEFAULT_DIALOG_TRANSITION;
exports.dialogInjectionKey = constants.dialogInjectionKey;
exports.ElDialog = ElDialog;
exports.default = ElDialog;
//# sourceMappingURL=index.js.map
