import _sfc_main$1 from './src/steps.vue2.mjs';
import _sfc_main from './src/item.vue2.mjs';
export { stepProps } from './src/item.mjs';
export { stepsEmits, stepsProps } from './src/steps.mjs';
export { STEPS_INJECTION_KEY } from './src/tokens.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElSteps = withInstall(_sfc_main$1, {
  Step: _sfc_main
});
const ElStep = withNoopInstall(_sfc_main);

export { ElStep, ElSteps, ElSteps as default };
//# sourceMappingURL=index.mjs.map
