'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var core = require('@vueuse/core');
var rovingFocusGroup = require('./roving-focus-group.js');
var tokens = require('./tokens.js');
var utils = require('./utils.js');
var event = require('../../../utils/dom/event.js');

const CURRENT_TAB_ID_CHANGE_EVT = "currentTabIdChange";
const ENTRY_FOCUS_EVT = "rovingFocusGroup.entryFocus";
const EVT_OPTS = { bubbles: false, cancelable: true };
var _sfc_main = vue.defineComponent({
  name: "ElRovingFocusGroupImpl",
  inheritAttrs: false,
  props: rovingFocusGroup.rovingFocusGroupProps,
  emits: [CURRENT_TAB_ID_CHANGE_EVT, "entryFocus"],
  setup(props, { emit }) {
    var _a;
    const currentTabbedId = vue.ref(
      (_a = props.currentTabId || props.defaultCurrentTabId) != null ? _a : null
    );
    const isBackingOut = vue.ref(false);
    const isClickFocus = vue.ref(false);
    const rovingFocusGroupRef = vue.ref();
    const { getItems } = vue.inject(
      rovingFocusGroup.ROVING_FOCUS_COLLECTION_INJECTION_KEY,
      void 0
    );
    const rovingFocusGroupRootStyle = vue.computed(() => {
      return [
        {
          outline: "none"
        },
        props.style
      ];
    });
    const onItemFocus = (tabbedId) => {
      emit(CURRENT_TAB_ID_CHANGE_EVT, tabbedId);
    };
    const onItemShiftTab = () => {
      isBackingOut.value = true;
    };
    const onMousedown = event.composeEventHandlers(
      (e) => {
        var _a2;
        (_a2 = props.onMousedown) == null ? void 0 : _a2.call(props, e);
      },
      () => {
        isClickFocus.value = true;
      }
    );
    const onFocus = event.composeEventHandlers(
      (e) => {
        var _a2;
        (_a2 = props.onFocus) == null ? void 0 : _a2.call(props, e);
      },
      (e) => {
        const isKeyboardFocus = !vue.unref(isClickFocus);
        const { target, currentTarget } = e;
        if (target === currentTarget && isKeyboardFocus && !vue.unref(isBackingOut)) {
          const entryFocusEvt = new Event(ENTRY_FOCUS_EVT, EVT_OPTS);
          currentTarget == null ? void 0 : currentTarget.dispatchEvent(entryFocusEvt);
          if (!entryFocusEvt.defaultPrevented) {
            const items = getItems().filter((item) => item.focusable);
            const activeItem = items.find((item) => item.active);
            const currentItem = items.find(
              (item) => item.id === vue.unref(currentTabbedId)
            );
            const candidates = [activeItem, currentItem, ...items].filter(
              Boolean
            );
            const candidateNodes = candidates.map((item) => item.ref);
            utils.focusFirst(candidateNodes);
          }
        }
        isClickFocus.value = false;
      }
    );
    const onBlur = event.composeEventHandlers(
      (e) => {
        var _a2;
        (_a2 = props.onBlur) == null ? void 0 : _a2.call(props, e);
      },
      () => {
        isBackingOut.value = false;
      }
    );
    const handleEntryFocus = (...args) => {
      emit("entryFocus", ...args);
    };
    const onKeydown = (e) => {
      const focusIntent = utils.getFocusIntent(e);
      if (focusIntent) {
        e.preventDefault();
        const items = getItems().filter((item) => item.focusable);
        let elements = items.map((item) => item.ref);
        switch (focusIntent) {
          case "last": {
            elements.reverse();
            break;
          }
          case "prev":
          case "next": {
            if (focusIntent === "prev") {
              elements.reverse();
            }
            const currentIdx = elements.indexOf(e.currentTarget);
            elements = props.loop ? utils.reorderArray(elements, currentIdx + 1) : elements.slice(currentIdx + 1);
            break;
          }
        }
        vue.nextTick(() => {
          utils.focusFirst(elements);
        });
      }
    };
    vue.provide(tokens.ROVING_FOCUS_GROUP_INJECTION_KEY, {
      currentTabbedId: vue.readonly(currentTabbedId),
      loop: vue.toRef(props, "loop"),
      tabIndex: vue.computed(() => {
        return vue.unref(isBackingOut) ? -1 : 0;
      }),
      rovingFocusGroupRef,
      rovingFocusGroupRootStyle,
      orientation: vue.toRef(props, "orientation"),
      dir: vue.toRef(props, "dir"),
      onItemFocus,
      onItemShiftTab,
      onBlur,
      onFocus,
      onMousedown,
      onKeydown
    });
    vue.watch(
      () => props.currentTabId,
      (val) => {
        currentTabbedId.value = val != null ? val : null;
      }
    );
    core.useEventListener(rovingFocusGroupRef, ENTRY_FOCUS_EVT, handleEntryFocus);
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=roving-focus-group-impl.vue2.js.map
