import { defineComponent, inject, ref, unref, computed, provide } from 'vue';
import { ElCollectionItem } from './roving-focus-group.mjs';
import { ROVING_FOCUS_GROUP_INJECTION_KEY, ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY } from './tokens.mjs';
import { useId } from '../../../hooks/use-id/index.mjs';
import { composeEventHandlers, getEventCode } from '../../../utils/dom/event.mjs';
import { EVENT_CODE } from '../../../constants/aria.mjs';

var _sfc_main = defineComponent({
  components: {
    ElRovingFocusCollectionItem: ElCollectionItem
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
    const { currentTabbedId, onItemFocus, onItemShiftTab, onKeydown } = inject(
      ROVING_FOCUS_GROUP_INJECTION_KEY,
      void 0
    );
    const id = useId();
    const rovingFocusGroupItemRef = ref();
    const handleMousedown = composeEventHandlers(
      (e) => {
        emit("mousedown", e);
      },
      (e) => {
        if (!props.focusable) {
          e.preventDefault();
        } else {
          onItemFocus(unref(id));
        }
      }
    );
    const handleFocus = composeEventHandlers(
      (e) => {
        emit("focus", e);
      },
      () => {
        onItemFocus(unref(id));
      }
    );
    const handleKeydown = composeEventHandlers(
      (e) => {
        emit("keydown", e);
      },
      (e) => {
        const { shiftKey, target, currentTarget } = e;
        const code = getEventCode(e);
        if (code === EVENT_CODE.tab && shiftKey) {
          onItemShiftTab();
          return;
        }
        if (target !== currentTarget) return;
        onKeydown(e);
      }
    );
    const isCurrentTab = computed(() => currentTabbedId.value === unref(id));
    provide(ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, {
      rovingFocusGroupItemRef,
      tabIndex: computed(() => unref(isCurrentTab) ? 0 : -1),
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

export { _sfc_main as default };
//# sourceMappingURL=roving-focus-item.vue2.mjs.map
