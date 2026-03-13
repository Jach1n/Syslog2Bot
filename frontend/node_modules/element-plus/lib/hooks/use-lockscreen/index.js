'use strict';

var vue = require('vue');
var index = require('../use-namespace/index.js');
var error = require('../../utils/error.js');
var style = require('../../utils/dom/style.js');
var scroll = require('../../utils/dom/scroll.js');

const useLockscreen = (trigger, options = {}) => {
  if (!vue.isRef(trigger)) {
    error.throwError(
      "[useLockscreen]",
      "You need to pass a ref param to this function"
    );
  }
  const ns = options.ns || index.useNamespace("popup");
  const hiddenCls = vue.computed(() => ns.bm("parent", "hidden"));
  let scrollBarWidth = 0;
  let withoutHiddenClass = false;
  let bodyWidth = "0";
  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    setTimeout(() => {
      if (typeof document === "undefined") return;
      if (withoutHiddenClass && document) {
        document.body.style.width = bodyWidth;
        style.removeClass(document.body, hiddenCls.value);
      }
    }, 200);
  };
  vue.watch(trigger, (val) => {
    if (!val) {
      cleanup();
      return;
    }
    cleaned = false;
    withoutHiddenClass = !style.hasClass(document.body, hiddenCls.value);
    if (withoutHiddenClass) {
      bodyWidth = document.body.style.width;
      style.addClass(document.body, hiddenCls.value);
    }
    scrollBarWidth = scroll.getScrollBarWidth(ns.namespace.value);
    const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
    const bodyOverflowY = style.getStyle(document.body, "overflowY");
    if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === "scroll") && withoutHiddenClass) {
      document.body.style.width = `calc(100% - ${scrollBarWidth}px)`;
    }
  });
  vue.onScopeDispose(() => cleanup());
};

exports.useLockscreen = useLockscreen;
//# sourceMappingURL=index.js.map
