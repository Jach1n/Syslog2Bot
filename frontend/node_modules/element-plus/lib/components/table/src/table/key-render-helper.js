'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

function useKeyRender(table) {
  let observer;
  const initWatchDom = () => {
    const el = table.vnode.el;
    const columnsWrapper = el.querySelector(".hidden-columns");
    const config = { childList: true, subtree: true };
    const updateOrderFns = table.store.states.updateOrderFns;
    observer = new MutationObserver(() => {
      updateOrderFns.forEach((fn) => fn());
    });
    observer.observe(columnsWrapper, config);
  };
  vue.onMounted(() => {
    initWatchDom();
  });
  vue.onUnmounted(() => {
    observer == null ? void 0 : observer.disconnect();
  });
}

exports.default = useKeyRender;
//# sourceMappingURL=key-render-helper.js.map
