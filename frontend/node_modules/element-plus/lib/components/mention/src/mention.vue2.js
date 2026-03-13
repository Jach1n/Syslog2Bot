'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mention = require('./mention.js');
var vue = require('vue');
var lodashUnified = require('lodash-unified');
var index$3 = require('../../input/index.js');
var index$4 = require('../../tooltip/index.js');
var helper = require('./helper.js');
var mentionDropdown_vue_vue_type_script_setup_true_lang = require('./mention-dropdown.vue2.js');
var input = require('../../input/src/input.js');
var index = require('../../../hooks/use-namespace/index.js');
var useFormCommonProps = require('../../form/src/hooks/use-form-common-props.js');
var index$1 = require('../../../hooks/use-id/index.js');
var index$2 = require('../../../hooks/use-focus-controller/index.js');
var event = require('../../../constants/event.js');
var event$1 = require('../../../utils/dom/event.js');
var aria = require('../../../constants/aria.js');
var shared = require('@vue/shared');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElMention",
    inheritAttrs: false
  },
  __name: "mention",
  props: mention.mentionProps,
  emits: mention.mentionEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const passInputProps = vue.computed(() => lodashUnified.pick(props, Object.keys(input.inputProps)));
    const ns = index.useNamespace("mention");
    const disabled = useFormCommonProps.useFormDisabled();
    const contentId = index$1.useId();
    const elInputRef = vue.ref();
    const tooltipRef = vue.ref();
    const dropdownRef = vue.ref();
    const visible = vue.ref(false);
    const cursorStyle = vue.ref();
    const mentionCtx = vue.ref();
    const computedPlacement = vue.computed(
      () => props.showArrow ? props.placement : `${props.placement}-start`
    );
    const computedFallbackPlacements = vue.computed(
      () => props.showArrow ? ["bottom", "top"] : ["bottom-start", "top-start"]
    );
    const aliasProps = vue.computed(() => ({
      ...mention.mentionDefaultProps,
      ...props.props
    }));
    const mapOption = (option) => {
      const base = {
        label: option[aliasProps.value.label],
        value: option[aliasProps.value.value],
        disabled: option[aliasProps.value.disabled]
      };
      return { ...option, ...base };
    };
    const options = vue.computed(() => props.options.map(mapOption));
    const filteredOptions = vue.computed(() => {
      const { filterOption: filterOption2 } = props;
      if (!mentionCtx.value || !filterOption2) return options.value;
      return options.value.filter(
        (option) => filterOption2(mentionCtx.value.pattern, option)
      );
    });
    const dropdownVisible = vue.computed(() => {
      return visible.value && (!!filteredOptions.value.length || props.loading);
    });
    const hoveringId = vue.computed(() => {
      var _a;
      return `${contentId.value}-${(_a = dropdownRef.value) == null ? void 0 : _a.hoveringIndex}`;
    });
    const handleInputChange = (value) => {
      emit(event.UPDATE_MODEL_EVENT, value);
      emit(event.INPUT_EVENT, value);
      syncAfterCursorMove();
    };
    const handleInputKeyDown = (event$2) => {
      var _a, _b, _c, _d;
      if ((_a = elInputRef.value) == null ? void 0 : _a.isComposing) return;
      const code = event$1.getEventCode(event$2);
      switch (code) {
        case aria.EVENT_CODE.left:
        case aria.EVENT_CODE.right:
          syncAfterCursorMove();
          break;
        case aria.EVENT_CODE.up:
        case aria.EVENT_CODE.down:
          if (!visible.value) return;
          event$2.preventDefault();
          (_b = dropdownRef.value) == null ? void 0 : _b.navigateOptions(
            code === aria.EVENT_CODE.up ? "prev" : "next"
          );
          break;
        case aria.EVENT_CODE.enter:
        case aria.EVENT_CODE.numpadEnter:
          if (!visible.value) {
            props.type !== "textarea" && syncAfterCursorMove();
            return;
          }
          event$2.preventDefault();
          if ((_c = dropdownRef.value) == null ? void 0 : _c.hoverOption) {
            (_d = dropdownRef.value) == null ? void 0 : _d.selectHoverOption();
          } else {
            visible.value = false;
          }
          break;
        case aria.EVENT_CODE.esc:
          if (!visible.value) return;
          event$2.preventDefault();
          visible.value = false;
          break;
        case aria.EVENT_CODE.backspace:
          if (props.whole && mentionCtx.value) {
            const { splitIndex, selectionEnd, pattern, prefixIndex, prefix } = mentionCtx.value;
            const inputEl = getInputEl();
            if (!inputEl) return;
            const inputValue = inputEl.value;
            const matchOption = options.value.find((item) => item.value === pattern);
            const isWhole = shared.isFunction(props.checkIsWhole) ? props.checkIsWhole(pattern, prefix) : matchOption;
            if (isWhole && splitIndex !== -1 && splitIndex + 1 === selectionEnd) {
              event$2.preventDefault();
              const newValue = inputValue.slice(0, prefixIndex) + inputValue.slice(splitIndex + 1);
              emit(event.UPDATE_MODEL_EVENT, newValue);
              emit(event.INPUT_EVENT, newValue);
              emit("whole-remove", pattern, prefix);
              const newSelectionEnd = prefixIndex;
              vue.nextTick(() => {
                inputEl.selectionStart = newSelectionEnd;
                inputEl.selectionEnd = newSelectionEnd;
                syncDropdownVisible();
              });
            }
          }
      }
    };
    const { wrapperRef } = index$2.useFocusController(elInputRef, {
      disabled,
      afterFocus() {
        syncAfterCursorMove();
      },
      beforeBlur(event) {
        var _a;
        return (_a = tooltipRef.value) == null ? void 0 : _a.isFocusInsideContent(event);
      },
      afterBlur() {
        visible.value = false;
      }
    });
    const handleInputMouseDown = () => {
      syncAfterCursorMove();
    };
    const getOriginalOption = (mentionOption) => {
      return props.options.find((option) => {
        return mentionOption.value === option[aliasProps.value.value];
      });
    };
    const handleSelect = (item) => {
      if (!mentionCtx.value) return;
      const inputEl = getInputEl();
      if (!inputEl) return;
      const inputValue = inputEl.value;
      const { split } = props;
      const newEndPart = inputValue.slice(mentionCtx.value.end);
      const alreadySeparated = newEndPart.startsWith(split);
      const newMiddlePart = `${item.value}${alreadySeparated ? "" : split}`;
      const newValue = inputValue.slice(0, mentionCtx.value.start) + newMiddlePart + newEndPart;
      emit(event.UPDATE_MODEL_EVENT, newValue);
      emit(event.INPUT_EVENT, newValue);
      emit("select", getOriginalOption(item), mentionCtx.value.prefix);
      const newSelectionEnd = mentionCtx.value.start + newMiddlePart.length + (alreadySeparated ? 1 : 0);
      vue.nextTick(() => {
        inputEl.selectionStart = newSelectionEnd;
        inputEl.selectionEnd = newSelectionEnd;
        inputEl.focus();
        syncDropdownVisible();
      });
    };
    const getInputEl = () => {
      var _a, _b;
      return props.type === "textarea" ? (_a = elInputRef.value) == null ? void 0 : _a.textarea : (_b = elInputRef.value) == null ? void 0 : _b.input;
    };
    const syncAfterCursorMove = () => {
      setTimeout(() => {
        syncCursor();
        syncDropdownVisible();
        vue.nextTick(() => {
          var _a;
          return (_a = tooltipRef.value) == null ? void 0 : _a.updatePopper();
        });
      }, 0);
    };
    const syncCursor = () => {
      const inputEl = getInputEl();
      if (!inputEl) return;
      const caretPosition = helper.getCursorPosition(inputEl);
      const inputRect = inputEl.getBoundingClientRect();
      const wrapperRect = wrapperRef.value.getBoundingClientRect();
      cursorStyle.value = {
        position: "absolute",
        width: 0,
        height: `${caretPosition.height}px`,
        left: `${caretPosition.left + inputRect.left - wrapperRect.left}px`,
        top: `${caretPosition.top + inputRect.top - wrapperRect.top}px`
      };
    };
    const syncDropdownVisible = () => {
      const inputEl = getInputEl();
      if (document.activeElement !== inputEl) {
        visible.value = false;
        return;
      }
      const { prefix, split } = props;
      mentionCtx.value = helper.getMentionCtx(inputEl, prefix, split);
      if (mentionCtx.value && mentionCtx.value.splitIndex === -1) {
        visible.value = true;
        emit("search", mentionCtx.value.pattern, mentionCtx.value.prefix);
        return;
      }
      visible.value = false;
    };
    __expose({
      input: elInputRef,
      tooltip: tooltipRef,
      dropdownVisible
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          ref_key: "wrapperRef",
          ref: wrapperRef,
          class: vue.normalizeClass(vue.unref(ns).b())
        },
        [
          vue.createVNode(vue.unref(index$3.ElInput), vue.mergeProps(vue.mergeProps(passInputProps.value, _ctx.$attrs), {
            ref_key: "elInputRef",
            ref: elInputRef,
            "model-value": __props.modelValue,
            disabled: vue.unref(disabled),
            role: dropdownVisible.value ? "combobox" : void 0,
            "aria-activedescendant": dropdownVisible.value ? hoveringId.value || "" : void 0,
            "aria-controls": dropdownVisible.value ? vue.unref(contentId) : void 0,
            "aria-expanded": dropdownVisible.value || void 0,
            "aria-label": __props.ariaLabel,
            "aria-autocomplete": dropdownVisible.value ? "none" : void 0,
            "aria-haspopup": dropdownVisible.value ? "listbox" : void 0,
            onInput: handleInputChange,
            onKeydown: handleInputKeyDown,
            onMousedown: handleInputMouseDown
          }), vue.createSlots({
            _: 2
            /* DYNAMIC */
          }, [
            vue.renderList(_ctx.$slots, (_, name) => {
              return {
                name,
                fn: vue.withCtx((slotProps) => [
                  vue.renderSlot(_ctx.$slots, name, vue.normalizeProps(vue.guardReactiveProps(slotProps)))
                ])
              };
            })
          ]), 1040, ["model-value", "disabled", "role", "aria-activedescendant", "aria-controls", "aria-expanded", "aria-label", "aria-autocomplete", "aria-haspopup"]),
          vue.createVNode(vue.unref(index$4.ElTooltip), {
            ref_key: "tooltipRef",
            ref: tooltipRef,
            visible: dropdownVisible.value,
            "popper-class": [vue.unref(ns).e("popper"), __props.popperClass],
            "popper-style": __props.popperStyle,
            "popper-options": __props.popperOptions,
            placement: computedPlacement.value,
            "fallback-placements": computedFallbackPlacements.value,
            effect: "light",
            pure: "",
            offset: __props.offset,
            "show-arrow": __props.showArrow
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "div",
                {
                  style: vue.normalizeStyle(cursorStyle.value)
                },
                null,
                4
                /* STYLE */
              )
            ]),
            content: vue.withCtx(() => [
              vue.createVNode(mentionDropdown_vue_vue_type_script_setup_true_lang.default, {
                ref_key: "dropdownRef",
                ref: dropdownRef,
                options: filteredOptions.value,
                disabled: vue.unref(disabled),
                loading: __props.loading,
                "content-id": vue.unref(contentId),
                "aria-label": __props.ariaLabel,
                onSelect: handleSelect,
                onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => {
                  var _a;
                  return (_a = elInputRef.value) == null ? void 0 : _a.focus();
                }, ["stop"]))
              }, vue.createSlots({
                _: 2
                /* DYNAMIC */
              }, [
                vue.renderList(_ctx.$slots, (_, name) => {
                  return {
                    name,
                    fn: vue.withCtx((slotProps) => [
                      vue.renderSlot(_ctx.$slots, name, vue.normalizeProps(vue.guardReactiveProps(slotProps)))
                    ])
                  };
                })
              ]), 1032, ["options", "disabled", "loading", "content-id", "aria-label"])
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["visible", "popper-class", "popper-style", "popper-options", "placement", "fallback-placements", "offset", "show-arrow"])
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=mention.vue2.js.map
