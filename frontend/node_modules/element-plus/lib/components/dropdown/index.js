'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dropdown$1 = require('./src/dropdown.vue.js');
var dropdownItem = require('./src/dropdown-item.vue.js');
var dropdownMenu = require('./src/dropdown-menu.vue.js');
var dropdown = require('./src/dropdown.js');
var tokens = require('./src/tokens.js');
var install = require('../../utils/vue/install.js');

const ElDropdown = install.withInstall(dropdown$1.default, {
  DropdownItem: dropdownItem.default,
  DropdownMenu: dropdownMenu.default
});
const ElDropdownItem = install.withNoopInstall(dropdownItem.default);
const ElDropdownMenu = install.withNoopInstall(dropdownMenu.default);

exports.FIRST_KEYS = dropdown.FIRST_KEYS;
exports.FIRST_LAST_KEYS = dropdown.FIRST_LAST_KEYS;
exports.LAST_KEYS = dropdown.LAST_KEYS;
exports.dropdownItemProps = dropdown.dropdownItemProps;
exports.dropdownMenuProps = dropdown.dropdownMenuProps;
exports.dropdownProps = dropdown.dropdownProps;
exports.DROPDOWN_INJECTION_KEY = tokens.DROPDOWN_INJECTION_KEY;
exports.DROPDOWN_INSTANCE_INJECTION_KEY = tokens.DROPDOWN_INSTANCE_INJECTION_KEY;
exports.ElDropdown = ElDropdown;
exports.ElDropdownItem = ElDropdownItem;
exports.ElDropdownMenu = ElDropdownMenu;
exports.default = ElDropdown;
//# sourceMappingURL=index.js.map
