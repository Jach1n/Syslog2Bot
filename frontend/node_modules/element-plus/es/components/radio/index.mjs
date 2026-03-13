import _sfc_main$2 from './src/radio.vue2.mjs';
import _sfc_main$1 from './src/radio-button.vue2.mjs';
import _sfc_main from './src/radio-group.vue2.mjs';
export { radioEmits, radioProps, radioPropsBase, radioPropsDefaults } from './src/radio.mjs';
export { radioDefaultProps, radioGroupEmits, radioGroupProps, radioGroupPropsDefaults } from './src/radio-group.mjs';
export { radioButtonProps, radioButtonPropsDefaults } from './src/radio-button.mjs';
export { radioGroupKey } from './src/constants.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElRadio = withInstall(_sfc_main$2, {
  RadioButton: _sfc_main$1,
  RadioGroup: _sfc_main
});
const ElRadioGroup = withNoopInstall(_sfc_main);
const ElRadioButton = withNoopInstall(_sfc_main$1);

export { ElRadio, ElRadioButton, ElRadioGroup, ElRadio as default };
//# sourceMappingURL=index.mjs.map
