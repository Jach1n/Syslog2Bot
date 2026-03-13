import Tabs from './src/tabs.mjs';
export { tabsEmits, tabsProps } from './src/tabs.mjs';
import _sfc_main from './src/tab-pane.vue2.mjs';
export { tabBarProps } from './src/tab-bar.mjs';
export { tabNavEmits, tabNavProps } from './src/tab-nav.mjs';
export { tabPaneProps } from './src/tab-pane.mjs';
export { tabsRootContextKey } from './src/constants.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElTabs = withInstall(Tabs, {
  TabPane: _sfc_main
});
const ElTabPane = withNoopInstall(_sfc_main);

export { ElTabPane, ElTabs, ElTabs as default };
//# sourceMappingURL=index.mjs.map
