'use strict';

var vue = require('vue');
var dayjs = require('dayjs');
var shared = require('@vue/shared');

const useShortcut = (lang) => {
  const { emit } = vue.getCurrentInstance();
  const attrs = vue.useAttrs();
  const slots = vue.useSlots();
  const handleShortcutClick = (shortcut) => {
    const shortcutValues = shared.isFunction(shortcut.value) ? shortcut.value() : shortcut.value;
    if (shortcutValues) {
      emit("pick", [
        dayjs(shortcutValues[0]).locale(lang.value),
        dayjs(shortcutValues[1]).locale(lang.value)
      ]);
      return;
    }
    if (shortcut.onClick) {
      shortcut.onClick({
        attrs,
        slots,
        emit
      });
    }
  };
  return handleShortcutClick;
};

exports.useShortcut = useShortcut;
//# sourceMappingURL=use-shortcut.js.map
