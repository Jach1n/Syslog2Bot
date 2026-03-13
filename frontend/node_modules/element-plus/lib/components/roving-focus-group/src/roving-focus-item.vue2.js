'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var rovingFocusGroup = require('./roving-focus-group.js');
var tokens = require('./tokens.js');
var index = require('../../../hooks/use-id/index.js');
var event = require('../../../utils/dom/event.js');
var aria = require('../../../constants/aria.js');

var _sfc_main = vue.defineComponent({
  components: {
    ElRovingFocusCollectionItem: rovingFocusGroup.ElCollectionItem
  },
  props: {
    focusable: {
      type: Boolean,
      default: true
    },
    active: Boolean
  },
  emits: ["mousedown", "focus", "keydown"],
  setup(props, { emit }) {
    const { currentTabbedId, onItemFocus, onItemShiftTab, onKeydown } = vue.inject(
      tokens.ROVING_FOCUS_GROUP_INJECTION_KEY,
      void 0
    );
    const id = index.useId();
    const rovingFocusGroupItemRef = vue.ref();
    const handleMousedown = event.composeEventHandlers(
      (e) => {
        emit("mousedown", e);
      },
      (e) => {
        if (!props.focusable) {
          e.preventDefault();
        } else {
          onItemFocus(vue.unref(id));
        }
      }
    );
    const handleFocus = event.composeEventHandlers(
      (e) => {
        emit("focus", e);
      },
      () => {
        onItemFocus(vue.unref(id));
      }
    );
    const handleKeydown = event.composeEventHandlers(
      (e) => {
        emit("keydown", e);
      },
      (e) => {
        const { shiftKey, target, currentTarget } = e;
        const code = event.getEventCode(e);
        if (code === aria.EVENT_CODE.tab && shiftKey) {
          onItemShiftTab();
          return;
        }
        if (target !== currentTarget) return;
        onKeydown(e);
      }
    );
    const isCurrentTab = vue.computed(() => currentTabbedId.value === vue.unref(id));
    vue.provide(tokens.ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, {
      rovingFocusGroupItemRef,
      tabIndex: vue.computed(() => vue.unref(isCurrentTab) ? 0 : -1),
      handleMousedown,
      handleFocus,
      handleKeydown
    });
    return {
      id,
      handleKeydown,
      handleFocus,
      handleMousedown
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=roving-focus-item.vue2.js.map
