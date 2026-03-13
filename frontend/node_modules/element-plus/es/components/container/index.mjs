import _sfc_main$4 from './src/container.vue2.mjs';
import _sfc_main$3 from './src/aside.vue2.mjs';
import _sfc_main$2 from './src/footer.vue2.mjs';
import _sfc_main$1 from './src/header.vue2.mjs';
import _sfc_main from './src/main.vue2.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElContainer = withInstall(_sfc_main$4, {
  Aside: _sfc_main$3,
  Footer: _sfc_main$2,
  Header: _sfc_main$1,
  Main: _sfc_main
});
const ElAside = withNoopInstall(_sfc_main$3);
const ElFooter = withNoopInstall(_sfc_main$2);
const ElHeader = withNoopInstall(_sfc_main$1);
const ElMain = withNoopInstall(_sfc_main);

export { ElAside, ElContainer, ElFooter, ElHeader, ElMain, ElContainer as default };
//# sourceMappingURL=index.mjs.map
