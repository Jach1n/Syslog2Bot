import { radioPropsBase } from './radio.mjs';
import { buildProps } from '../../../utils/vue/props/runtime.mjs';

const radioButtonProps = buildProps({
  ...radioPropsBase
});
const radioButtonPropsDefaults = {
  modelValue: void 0,
  disabled: void 0,
  label: void 0,
  value: void 0,
  name: void 0
};

export { radioButtonProps, radioButtonPropsDefaults };
//# sourceMappingURL=radio-button.mjs.map
