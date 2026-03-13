'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var popover_vue_vue_type_script_setup_true_lang = require('./src/popover.vue2.js');
var directive = require('./src/directive.js');
var popover = require('./src/popover.js');
var install = require('../../utils/vue/install.js');

const ElPopoverDirective = install.withInstallDirective(directive.default, directive.VPopover);
const ElPopover = install.withInstall(popover_vue_vue_type_script_setup_true_lang.default, {
  directive: ElPopoverDirective
});

exports.popoverEmits = popover.popoverEmits;
exports.popoverProps = popover.popoverProps;
exports.popoverPropsDefaults = popover.popoverPropsDefaults;
exports.ElPopover = ElPopover;
exports.ElPopoverDirective = ElPopoverDirective;
exports.default = ElPopover;
//# sourceMappingURL=index.js.map
