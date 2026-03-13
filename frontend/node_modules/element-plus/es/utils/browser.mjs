import { isClient } from '@vueuse/core';
export { isClient, isIOS } from '@vueuse/core';

const isFirefox = () => isClient && /firefox/i.test(window.navigator.userAgent);
const isAndroid = () => isClient && /android/i.test(window.navigator.userAgent);

export { isAndroid, isFirefox };
//# sourceMappingURL=browser.mjs.map
