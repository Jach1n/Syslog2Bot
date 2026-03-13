import Select from './src/select.vue.mjs';
import Option from './src/option.vue.mjs';
import OptionGroup from './src/option-group.vue.mjs';
export { selectGroupKey, selectKey } from './src/token.mjs';
export { selectEmits, selectProps } from './src/select.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElSelect = withInstall(Select, {
  Option,
  OptionGroup
});
const ElOption = withNoopInstall(Option);
const ElOptionGroup = withNoopInstall(OptionGroup);

export { ElOption, ElOptionGroup, ElSelect, ElSelect as default };
//# sourceMappingURL=index.mjs.map
