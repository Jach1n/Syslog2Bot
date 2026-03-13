import _sfc_main$1 from './src/breadcrumb.vue2.mjs';
import _sfc_main from './src/breadcrumb-item.vue2.mjs';
export { breadcrumbProps } from './src/breadcrumb.mjs';
export { breadcrumbItemProps } from './src/breadcrumb-item.mjs';
export { breadcrumbKey } from './src/constants.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElBreadcrumb = withInstall(_sfc_main$1, {
  BreadcrumbItem: _sfc_main
});
const ElBreadcrumbItem = withNoopInstall(_sfc_main);

export { ElBreadcrumb, ElBreadcrumbItem, ElBreadcrumb as default };
//# sourceMappingURL=index.mjs.map
