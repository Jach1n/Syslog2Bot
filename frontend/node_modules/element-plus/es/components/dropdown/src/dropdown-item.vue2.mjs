import { defineComponent, getCurrentInstance, inject, computed } from 'vue';
import ElRovingFocusItem from '../../roving-focus-group/src/roving-focus-item.vue.mjs';
import ElDropdownItemImpl from './dropdown-item-impl.vue.mjs';
import { useDropdown } from './useDropdown.mjs';
import { dropdownItemProps } from './dropdown.mjs';
import { DROPDOWN_INJECTION_KEY } from './tokens.mjs';
import { composeEventHandlers, whenMouse } from '../../../utils/dom/event.mjs';

var _sfc_main = defineComponent({
  name: "ElDropdownItem",
  components: {
    ElRovingFocusItem,
    ElDropdownItemImpl
  },
  inheritAttrs: false,
  props: dropdownItemProps,
  emits: ["pointermove", "pointerleave", "click"],
  setup(props, { emit, attrs }) {
    const { elDropdown } = useDropdown();
    const _instance = getCurrentInstance();
    const { onItemEnter, onItemLeave } = inject(
      DROPDOWN_INJECTION_KEY,
      void 0
    );
    const handlePointerMove = composeEventHandlers(
      (e) => {
        emit("pointermove", e);
        return e.defaultPrevented;
      },
      whenMouse((e) => {
        if (props.disabled) {
          onItemLeave(e);
          return;
        }
        const target = e.currentTarget;
        if (target === document.activeElement || target.contains(document.activeElement)) {
          return;
        }
        onItemEnter(e);
        if (!e.defaultPrevented) {
          target == null ? void 0 : target.focus({
            preventScroll: true
          });
        }
      })
    );
    const handlePointerLeave = composeEventHandlers((e) => {
      emit("pointerleave", e);
      return e.defaultPrevented;
    }, whenMouse(onItemLeave));
    const handleClick = composeEventHandlers(
      (e) => {
        if (props.disabled) {
          return;
        }
        emit("click", e);
        return e.type !== "keydown" && e.defaultPrevented;
      },
      (e) => {
        var _a, _b, _c;
        if (props.disabled) {
          e.stopImmediatePropagation();
          return;
        }
        if ((_a = elDropdown == null ? void 0 : elDropdown.hideOnClick) == null ? void 0 : _a.value) {
          (_b = elDropdown.handleClick) == null ? void 0 : _b.call(elDropdown);
        }
        (_c = elDropdown.commandHandler) == null ? void 0 : _c.call(elDropdown, props.command, _instance, e);
      }
    );
    const propsAndAttrs = computed(() => ({ ...props, ...attrs }));
    return {
      handleClick,
      handlePointerMove,
      handlePointerLeave,
      propsAndAttrs
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=dropdown-item.vue2.mjs.map
