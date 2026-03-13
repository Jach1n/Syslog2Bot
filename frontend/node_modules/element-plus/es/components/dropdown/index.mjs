import Dropdown from './src/dropdown.vue.mjs';
import DropdownItem from './src/dropdown-item.vue.mjs';
import DropdownMenu from './src/dropdown-menu.vue.mjs';
export { FIRST_KEYS, FIRST_LAST_KEYS, LAST_KEYS, dropdownItemProps, dropdownMenuProps, dropdownProps } from './src/dropdown.mjs';
export { DROPDOWN_INJECTION_KEY, DROPDOWN_INSTANCE_INJECTION_KEY } from './src/tokens.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElDropdown = withInstall(Dropdown, {
  DropdownItem,
  DropdownMenu
});
const ElDropdownItem = withNoopInstall(DropdownItem);
const ElDropdownMenu = withNoopInstall(DropdownMenu);

export { ElDropdown, ElDropdownItem, ElDropdownMenu, ElDropdown as default };
//# sourceMappingURL=index.mjs.map
