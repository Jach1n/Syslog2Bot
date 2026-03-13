import { defineComponent, inject, computed } from 'vue';
import { ElIcon } from '../../icon/index.mjs';
import { dropdownItemProps } from './dropdown.mjs';
import { DROPDOWN_INJECTION_KEY } from './tokens.mjs';
import { ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY as COLLECTION_ITEM_INJECTION_KEY } from '../../roving-focus-group/src/roving-focus-group.mjs';
import { ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY } from '../../roving-focus-group/src/tokens.mjs';
import { COLLECTION_ITEM_SIGN } from '../../collection/src/collection.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { composeRefs } from '../../../utils/vue/refs.mjs';
import { composeEventHandlers, getEventCode } from '../../../utils/dom/event.mjs';
import { EVENT_CODE } from '../../../constants/aria.mjs';

var _sfc_main = defineComponent({
  name: "DropdownItemImpl",
  components: {
    ElIcon
  },
  props: dropdownItemProps,
  emits: ["pointermove", "pointerleave", "click", "clickimpl"],
  setup(_, { emit }) {
    const ns = useNamespace("dropdown");
    const { role: menuRole } = inject(DROPDOWN_INJECTION_KEY, void 0);
    const { collectionItemRef: rovingFocusCollectionItemRef } = inject(
      COLLECTION_ITEM_INJECTION_KEY,
      void 0
    );
    const {
      rovingFocusGroupItemRef,
      tabIndex,
      handleFocus,
      handleKeydown: handleItemKeydown,
      handleMousedown
    } = inject(ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, void 0);
    const itemRef = composeRefs(
      rovingFocusCollectionItemRef,
      rovingFocusGroupItemRef
    );
    const role = computed(() => {
      if (menuRole.value === "menu") {
        return "menuitem";
      } else if (menuRole.value === "navigation") {
        return "link";
      }
      return "button";
    });
    const handleKeydown = composeEventHandlers((e) => {
      const code = getEventCode(e);
      if ([EVENT_CODE.enter, EVENT_CODE.numpadEnter, EVENT_CODE.space].includes(
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
        [COLLECTION_ITEM_SIGN]: ""
      },
      role,
      tabIndex,
      handleFocus,
      handleKeydown,
      handleMousedown
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=dropdown-item-impl.vue2.mjs.map
