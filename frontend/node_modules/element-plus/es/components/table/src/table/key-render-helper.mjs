import { onMounted, onUnmounted } from 'vue';

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
  onMounted(() => {
    initWatchDom();
  });
  onUnmounted(() => {
    observer == null ? void 0 : observer.disconnect();
  });
}

export { useKeyRender as default };
//# sourceMappingURL=key-render-helper.mjs.map
