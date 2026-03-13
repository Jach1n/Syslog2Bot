import _sfc_main from './src/description.vue2.mjs';
import DescriptionItem from './src/description-item.mjs';
export { descriptionItemProps } from './src/description-item.mjs';
export { descriptionProps } from './src/description.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElDescriptions = withInstall(_sfc_main, {
  DescriptionsItem: DescriptionItem
});
const ElDescriptionsItem = withNoopInstall(DescriptionItem);

export { ElDescriptions, ElDescriptionsItem, ElDescriptions as default };
//# sourceMappingURL=index.mjs.map
