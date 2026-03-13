import _sfc_main$1 from './src/skeleton.vue2.mjs';
import _sfc_main from './src/skeleton-item.vue2.mjs';
export { skeletonProps } from './src/skeleton.mjs';
export { skeletonItemProps } from './src/skeleton-item.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElSkeleton = withInstall(_sfc_main$1, {
  SkeletonItem: _sfc_main
});
const ElSkeletonItem = withNoopInstall(_sfc_main);

export { ElSkeleton, ElSkeletonItem, ElSkeleton as default };
//# sourceMappingURL=index.mjs.map
