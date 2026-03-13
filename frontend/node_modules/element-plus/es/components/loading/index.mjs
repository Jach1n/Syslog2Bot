import Loading from './src/service.mjs';
import vLoading from './src/directive.mjs';

const ElLoading = {
  install(app) {
    Loading._context = app._context;
    vLoading._context = app._context;
    app.directive("loading", vLoading);
    app.config.globalProperties.$loading = Loading;
  },
  directive: vLoading,
  service: Loading
};

export { ElLoading, vLoading as ElLoadingDirective, Loading as ElLoadingService, ElLoading as default, vLoading };
//# sourceMappingURL=index.mjs.map
