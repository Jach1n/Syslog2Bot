import _sfc_main$2 from './src/checkbox.vue2.mjs';
import _sfc_main$1 from './src/checkbox-button.vue2.mjs';
import _sfc_main from './src/checkbox-group.vue2.mjs';
export { checkboxDefaultProps, checkboxGroupEmits, checkboxGroupProps } from './src/checkbox-group.mjs';
export { checkboxEmits, checkboxProps, checkboxPropsDefaults } from './src/checkbox.mjs';
export { checkboxGroupContextKey } from './src/constants.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElCheckbox = withInstall(_sfc_main$2, {
  CheckboxButton: _sfc_main$1,
  CheckboxGroup: _sfc_main
});
const ElCheckboxButton = withNoopInstall(_sfc_main$1);
const ElCheckboxGroup = withNoopInstall(_sfc_main);

export { ElCheckbox, ElCheckboxButton, ElCheckboxGroup, ElCheckbox as default };
//# sourceMappingURL=index.mjs.map
