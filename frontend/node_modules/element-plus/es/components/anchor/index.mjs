import _sfc_main$1 from './src/anchor.vue2.mjs';
import _sfc_main from './src/anchor-link.vue2.mjs';
export { anchorEmits, anchorProps } from './src/anchor.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElAnchor = withInstall(_sfc_main$1, {
  AnchorLink: _sfc_main
});
const ElAnchorLink = withNoopInstall(_sfc_main);

export { ElAnchor, ElAnchorLink, ElAnchor as default };
//# sourceMappingURL=index.mjs.map
