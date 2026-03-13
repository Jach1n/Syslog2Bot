'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var menu = require('./src/menu.js');
var menuItem_vue_vue_type_script_setup_true_lang = require('./src/menu-item.vue2.js');
var menuItemGroup_vue_vue_type_script_setup_true_lang = require('./src/menu-item-group.vue2.js');
var subMenu = require('./src/sub-menu.js');
var menuItem = require('./src/menu-item.js');
var menuItemGroup = require('./src/menu-item-group.js');
var tokens = require('./src/tokens.js');
var install = require('../../utils/vue/install.js');

const ElMenu = install.withInstall(menu.default, {
  MenuItem: menuItem_vue_vue_type_script_setup_true_lang.default,
  MenuItemGroup: menuItemGroup_vue_vue_type_script_setup_true_lang.default,
  SubMenu: subMenu.default
});
const ElMenuItem = install.withNoopInstall(menuItem_vue_vue_type_script_setup_true_lang.default);
const ElMenuItemGroup = install.withNoopInstall(menuItemGroup_vue_vue_type_script_setup_true_lang.default);
const ElSubMenu = install.withNoopInstall(subMenu.default);

exports.menuEmits = menu.menuEmits;
exports.menuProps = menu.menuProps;
exports.subMenuProps = subMenu.subMenuProps;
exports.menuItemEmits = menuItem.menuItemEmits;
exports.menuItemProps = menuItem.menuItemProps;
exports.menuItemGroupProps = menuItemGroup.menuItemGroupProps;
exports.MENU_INJECTION_KEY = tokens.MENU_INJECTION_KEY;
exports.SUB_MENU_INJECTION_KEY = tokens.SUB_MENU_INJECTION_KEY;
exports.ElMenu = ElMenu;
exports.ElMenuItem = ElMenuItem;
exports.ElMenuItemGroup = ElMenuItemGroup;
exports.ElSubMenu = ElSubMenu;
exports.default = ElMenu;
//# sourceMappingURL=index.js.map
