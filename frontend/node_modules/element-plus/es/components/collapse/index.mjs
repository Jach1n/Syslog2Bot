import _sfc_main$1 from './src/collapse.vue2.mjs';
import _sfc_main from './src/collapse-item.vue2.mjs';
export { collapseEmits, collapseProps, emitChangeFn } from './src/collapse.mjs';
export { collapseItemProps } from './src/collapse-item.mjs';
export { collapseContextKey } from './src/constants.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElCollapse = withInstall(_sfc_main$1, {
  CollapseItem: _sfc_main
});
const ElCollapseItem = withNoopInstall(_sfc_main);

export { ElCollapse, ElCollapseItem, ElCollapse as default };
//# sourceMappingURL=index.mjs.map
