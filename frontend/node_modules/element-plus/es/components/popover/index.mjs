import _sfc_main from './src/popover.vue2.mjs';
import PopoverDirective, { VPopover } from './src/directive.mjs';
export { popoverEmits, popoverProps, popoverPropsDefaults } from './src/popover.mjs';
import { withInstallDirective, withInstall } from '../../utils/vue/install.mjs';

const ElPopoverDirective = withInstallDirective(PopoverDirective, VPopover);
const ElPopover = withInstall(_sfc_main, {
  directive: ElPopoverDirective
});

export { ElPopover, ElPopoverDirective, ElPopover as default };
//# sourceMappingURL=index.mjs.map
