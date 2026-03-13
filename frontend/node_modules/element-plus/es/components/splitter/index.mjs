import _sfc_main$1 from './src/splitter.vue2.mjs';
import _sfc_main from './src/split-panel.vue2.mjs';
export { splitterEmits, splitterProps } from './src/splitter.mjs';
export { splitterPanelEmits, splitterPanelProps } from './src/split-panel.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElSplitter = withInstall(_sfc_main$1, {
  SplitPanel: _sfc_main
});
const ElSplitterPanel = withNoopInstall(_sfc_main);

export { ElSplitter, ElSplitterPanel, ElSplitter as default };
//# sourceMappingURL=index.mjs.map
