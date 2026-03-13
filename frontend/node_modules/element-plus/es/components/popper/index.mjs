import _sfc_main from './src/popper.vue2.mjs';
export { default as ElPopperArrow } from './src/arrow.vue2.mjs';
export { default as ElPopperTrigger } from './src/trigger.vue2.mjs';
export { default as ElPopperContent } from './src/content.vue2.mjs';
export { Effect, popperProps, roleTypes, usePopperProps } from './src/popper.mjs';
export { popperTriggerProps, usePopperTriggerProps } from './src/trigger.mjs';
export { popperContentEmits, popperContentProps, popperContentPropsDefaults, popperCoreConfigProps, popperCoreConfigPropsDefaults, usePopperContentEmits, usePopperContentProps, usePopperCoreConfigProps } from './src/content.mjs';
export { popperArrowProps, popperArrowPropsDefaults, usePopperArrowProps } from './src/arrow.mjs';
export { POPPER_CONTENT_INJECTION_KEY, POPPER_INJECTION_KEY } from './src/constants.mjs';
import { withInstall } from '../../utils/vue/install.mjs';

const ElPopper = withInstall(_sfc_main);

export { ElPopper, ElPopper as default };
//# sourceMappingURL=index.mjs.map
