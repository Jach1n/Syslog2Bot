'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var service = require('./src/service.js');
var directive = require('./src/directive.js');

const ElLoading = {
  install(app) {
    service.default._context = app._context;
    directive.default._context = app._context;
    app.directive("loading", directive.default);
    app.config.globalProperties.$loading = service.default;
  },
  directive: directive.default,
  service: service.default
};

exports.ElLoadingService = service.default;
exports.ElLoadingDirective = directive.default;
exports.vLoading = directive.default;
exports.ElLoading = ElLoading;
exports.default = ElLoading;
//# sourceMappingURL=index.js.map
