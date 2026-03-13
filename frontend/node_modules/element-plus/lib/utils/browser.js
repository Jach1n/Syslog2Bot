'use strict';

var core = require('@vueuse/core');

const isFirefox = () => core.isClient && /firefox/i.test(window.navigator.userAgent);
const isAndroid = () => core.isClient && /android/i.test(window.navigator.userAgent);

Object.defineProperty(exports, "isClient", {
  enumerable: true,
  get: function () { return core.isClient; }
});
Object.defineProperty(exports, "isIOS", {
  enumerable: true,
  get: function () { return core.isIOS; }
});
exports.isAndroid = isAndroid;
exports.isFirefox = isFirefox;
//# sourceMappingURL=browser.js.map
