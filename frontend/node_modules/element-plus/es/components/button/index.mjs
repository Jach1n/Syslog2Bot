import _sfc_main$1 from './src/button.vue2.mjs';
import _sfc_main from './src/button-group.vue2.mjs';
export { buttonEmits, buttonNativeTypes, buttonProps, buttonTypes } from './src/button.mjs';
export { buttonGroupContextKey } from './src/constants.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElButton = withInstall(_sfc_main$1, {
  ButtonGroup: _sfc_main
});
const ElButtonGroup = withNoopInstall(_sfc_main);

export { ElButton, ElButtonGroup, ElButton as default };
//# sourceMappingURL=index.mjs.map
