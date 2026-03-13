'use strict';

var browser = require('../browser.js');
var aria = require('../../constants/aria.js');

const composeEventHandlers = (theirsHandler, oursHandler, { checkForDefaultPrevented = true } = {}) => {
  const handleEvent = (event) => {
    const shouldPrevent = theirsHandler == null ? void 0 : theirsHandler(event);
    if (checkForDefaultPrevented === false || !shouldPrevent) {
      return oursHandler == null ? void 0 : oursHandler(event);
    }
  };
  return handleEvent;
};
const whenMouse = (handler) => {
  return (e) => e.pointerType === "mouse" ? handler(e) : void 0;
};
const getEventCode = (event) => {
  if (event.code && event.code !== "Unidentified") return event.code;
  const key = getEventKey(event);
  if (key) {
    if (Object.values(aria.EVENT_CODE).includes(key)) return key;
    switch (key) {
      case " ":
        return aria.EVENT_CODE.space;
      default:
        return "";
    }
  }
  return "";
};
const getEventKey = (event) => {
  let key = event.key && event.key !== "Unidentified" ? event.key : "";
  if (!key && event.type === "keyup" && browser.isAndroid()) {
    const target = event.target;
    key = target.value.charAt(target.selectionStart - 1);
  }
  return key;
};

exports.composeEventHandlers = composeEventHandlers;
exports.getEventCode = getEventCode;
exports.getEventKey = getEventKey;
exports.whenMouse = whenMouse;
//# sourceMappingURL=event.js.map
