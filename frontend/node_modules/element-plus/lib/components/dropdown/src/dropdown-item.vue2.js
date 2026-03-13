'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var rovingFocusItem = require('../../roving-focus-group/src/roving-focus-item.vue.js');
var dropdownItemImpl = require('./dropdown-item-impl.vue.js');
var useDropdown = require('./useDropdown.js');
var dropdown = require('./dropdown.js');
var tokens = require('./tokens.js');
var event = require('../../../utils/dom/event.js');

var _sfc_main = vue.defineComponent({
  name: "ElDropdownItem",
  components: {
    ElRovingFocusItem: rovingFocusItem.default,
    ElDropdownItemImpl: dropdownItemImpl.default
  },
  inheritAttrs: false,
  props: dropdown.dropdownItemProps,
  emits: ["pointermove", "pointerleave", "click"],
  setup(props, { emit, attrs }) {
    const { elDropdown } = useDropdown.useDropdown();
    const _instance = vue.getCurrentInstance();
    const { onItemEnter, onItemLeave } = vue.inject(
      tokens.DROPDOWN_INJECTION_KEY,
      void 0
    );
    const handlePointerMove = event.composeEventHandlers(
      (e) => {
        emit("pointermove", e);
        return e.defaultPrevented;
      },
      event.whenMouse((e) => {
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
    const handlePointerLeave = event.composeEventHandlers((e) => {
      emit("pointerleave", e);
      return e.defaultPrevented;
    }, event.whenMouse(onItemLeave));
    const handleClick = event.composeEventHandlers(
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
    const propsAndAttrs = vue.computed(() => ({ ...props, ...attrs }));
    return {
      handleClick,
      handlePointerMove,
      handlePointerLeave,
      propsAndAttrs
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=dropdown-item.vue2.js.map
