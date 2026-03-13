'use strict';

var vue = require('vue');
var core = require('@vueuse/core');
var event = require('../../utils/dom/event.js');
var aria = require('../../constants/aria.js');

let registeredEscapeHandlers = [];
const cachedHandler = (event$1) => {
  const code = event.getEventCode(event$1);
  if (code === aria.EVENT_CODE.esc) {
    registeredEscapeHandlers.forEach(
      (registeredHandler) => registeredHandler(event$1)
    );
  }
};
const useEscapeKeydown = (handler) => {
  vue.onMounted(() => {
    if (registeredEscapeHandlers.length === 0) {
      document.addEventListener("keydown", cachedHandler);
    }
    if (core.isClient) registeredEscapeHandlers.push(handler);
  });
  vue.onBeforeUnmount(() => {
    registeredEscapeHandlers = registeredEscapeHandlers.filter(
      (registeredHandler) => registeredHandler !== handler
    );
    if (registeredEscapeHandlers.length === 0) {
      if (core.isClient) document.removeEventListener("keydown", cachedHandler);
    }
  });
};

exports.useEscapeKeydown = useEscapeKeydown;
//# sourceMappingURL=index.js.map
