import { defineComponent, inject, computed } from 'vue';
import { DROPDOWN_INJECTION_KEY } from './tokens.mjs';
import { dropdownMenuProps } from './dropdown.mjs';
import { useDropdown } from './useDropdown.mjs';
import { ROVING_FOCUS_GROUP_INJECTION_KEY } from '../../roving-focus-group/src/tokens.mjs';
import { ROVING_FOCUS_COLLECTION_INJECTION_KEY as COLLECTION_INJECTION_KEY } from '../../roving-focus-group/src/roving-focus-group.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { composeRefs } from '../../../utils/vue/refs.mjs';
import { composeEventHandlers, getEventCode } from '../../../utils/dom/event.mjs';
import { EVENT_CODE } from '../../../constants/aria.mjs';

var _sfc_main = defineComponent({
  name: "ElDropdownMenu",
  props: dropdownMenuProps,
  setup(props) {
    const ns = useNamespace("dropdown");
    const { _elDropdownSize } = useDropdown();
    const size = _elDropdownSize.value;
    const { contentRef, role, triggerId, isUsingKeyboard, handleClose } = inject(DROPDOWN_INJECTION_KEY, void 0);
    const {
      rovingFocusGroupRef,
      rovingFocusGroupRootStyle,
      onBlur,
      onFocus,
      onKeydown,
      onMousedown
    } = inject(ROVING_FOCUS_GROUP_INJECTION_KEY, void 0);
    const { collectionRef: rovingFocusGroupCollectionRef } = inject(
      COLLECTION_INJECTION_KEY,
      void 0
    );
    const dropdownKls = computed(() => {
      return [ns.b("menu"), ns.bm("menu", size == null ? void 0 : size.value)];
    });
    const dropdownListWrapperRef = composeRefs(
      contentRef,
      rovingFocusGroupRef,
      rovingFocusGroupCollectionRef
    );
    const handleKeydown = composeEventHandlers(
      (e) => {
        var _a;
        (_a = props.onKeydown) == null ? void 0 : _a.call(props, e);
      },
      (e) => {
        const { currentTarget, target } = e;
        const code = getEventCode(e);
        currentTarget.contains(
          target
        );
        if (EVENT_CODE.tab === code) {
          return handleClose();
        }
        onKeydown(e);
      }
    );
    function handleFocus(e) {
      isUsingKeyboard.value && onFocus(e);
    }
    return {
      size,
      rovingFocusGroupRootStyle,
      dropdownKls,
      role,
      triggerId,
      dropdownListWrapperRef,
      handleKeydown,
      onBlur,
      handleFocus,
      onMousedown
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=dropdown-menu.vue2.mjs.map
