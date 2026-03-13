'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../icon/index.js');
var dropdown = require('./dropdown.js');
var tokens = require('./tokens.js');
var rovingFocusGroup = require('../../roving-focus-group/src/roving-focus-group.js');
var tokens$1 = require('../../roving-focus-group/src/tokens.js');
var collection = require('../../collection/src/collection.js');
var index$1 = require('../../../hooks/use-namespace/index.js');
var refs = require('../../../utils/vue/refs.js');
var event = require('../../../utils/dom/event.js');
var aria = require('../../../constants/aria.js');

var _sfc_main = vue.defineComponent({
  name: "DropdownItemImpl",
  components: {
    ElIcon: index.ElIcon
  },
  props: dropdown.dropdownItemProps,
  emits: ["pointermove", "pointerleave", "click", "clickimpl"],
  setup(_, { emit }) {
    const ns = index$1.useNamespace("dropdown");
    const { role: menuRole } = vue.inject(tokens.DROPDOWN_INJECTION_KEY, void 0);
    const { collectionItemRef: rovingFocusCollectionItemRef } = vue.inject(
      rovingFocusGroup.ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY,
      void 0
    );
    const {
      rovingFocusGroupItemRef,
      tabIndex,
      handleFocus,
      handleKeydown: handleItemKeydown,
      handleMousedown
    } = vue.inject(tokens$1.ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, void 0);
    const itemRef = refs.composeRefs(
      rovingFocusCollectionItemRef,
      rovingFocusGroupItemRef
    );
    const role = vue.computed(() => {
      if (menuRole.value === "menu") {
        return "menuitem";
      } else if (menuRole.value === "navigation") {
        return "link";
      }
      return "button";
    });
    const handleKeydown = event.composeEventHandlers((e) => {
      const code = event.getEventCode(e);
      if ([aria.EVENT_CODE.enter, aria.EVENT_CODE.numpadEnter, aria.EVENT_CODE.space].includes(
        code
      )) {
        e.preventDefault();
        e.stopImmediatePropagation();
        emit("clickimpl", e);
        return true;
      }
    }, handleItemKeydown);
    return {
      ns,
      itemRef,
      dataset: {
        [collection.COLLECTION_ITEM_SIGN]: ""
      },
      role,
      tabIndex,
      handleFocus,
      handleKeydown,
      handleMousedown
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=dropdown-item-impl.vue2.js.map
