import { onMounted, onBeforeUnmount } from 'vue';
import { isClient } from '@vueuse/core';
import { getEventCode } from '../../utils/dom/event.mjs';
import { EVENT_CODE } from '../../constants/aria.mjs';

let registeredEscapeHandlers = [];
const cachedHandler = (event) => {
  const code = getEventCode(event);
  if (code === EVENT_CODE.esc) {
    registeredEscapeHandlers.forEach(
      (registeredHandler) => registeredHandler(event)
    );
  }
};
const useEscapeKeydown = (handler) => {
  onMounted(() => {
    if (registeredEscapeHandlers.length === 0) {
      document.addEventListener("keydown", cachedHandler);
    }
    if (isClient) registeredEscapeHandlers.push(handler);
  });
  onBeforeUnmount(() => {
    registeredEscapeHandlers = registeredEscapeHandlers.filter(
      (registeredHandler) => registeredHandler !== handler
    );
    if (registeredEscapeHandlers.length === 0) {
      if (isClient) document.removeEventListener("keydown", cachedHandler);
    }
  });
};

export { useEscapeKeydown };
//# sourceMappingURL=index.mjs.map
