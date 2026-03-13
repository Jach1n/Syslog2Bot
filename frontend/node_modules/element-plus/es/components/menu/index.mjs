import Menu from './src/menu.mjs';
export { menuEmits, menuProps } from './src/menu.mjs';
import _sfc_main$1 from './src/menu-item.vue2.mjs';
import _sfc_main from './src/menu-item-group.vue2.mjs';
import SubMenu from './src/sub-menu.mjs';
export { subMenuProps } from './src/sub-menu.mjs';
export { menuItemEmits, menuItemProps } from './src/menu-item.mjs';
export { menuItemGroupProps } from './src/menu-item-group.mjs';
export { MENU_INJECTION_KEY, SUB_MENU_INJECTION_KEY } from './src/tokens.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElMenu = withInstall(Menu, {
  MenuItem: _sfc_main$1,
  MenuItemGroup: _sfc_main,
  SubMenu
});
const ElMenuItem = withNoopInstall(_sfc_main$1);
const ElMenuItemGroup = withNoopInstall(_sfc_main);
const ElSubMenu = withNoopInstall(SubMenu);

export { ElMenu, ElMenuItem, ElMenuItemGroup, ElSubMenu, ElMenu as default };
//# sourceMappingURL=index.mjs.map
