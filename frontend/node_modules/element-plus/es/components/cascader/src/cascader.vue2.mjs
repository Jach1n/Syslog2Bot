import { cascaderEmits, cascaderProps } from './cascader.mjs';
import { defineComponent, useAttrs, useSlots, ref, computed, watch, nextTick, onMounted, createBlock, openBlock, unref, withCtx, createElementBlock, createCommentVNode, withDirectives, withModifiers, normalizeClass, renderSlot, createVNode, vShow, Fragment, renderList, createElementVNode, toDisplayString, normalizeStyle, createSlots, resolveDynamicComponent, withKeys, vModelText } from 'vue';
import { cloneDeep } from 'lodash-unified';
import { useDebounceFn, useResizeObserver, isClient, useCssVar } from '@vueuse/core';
import { ElCascaderPanel } from '../../cascader-panel/index.mjs';
import { ElInput } from '../../input/index.mjs';
import { ElTooltip } from '../../tooltip/index.mjs';
import { ElScrollbar } from '../../scrollbar/index.mjs';
import { ElTag } from '../../tag/index.mjs';
import { ElIcon } from '../../icon/index.mjs';
import { Check, ArrowDown } from '@element-plus/icons-vue';
import ClickOutside from '../../../directives/click-outside/index.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';
import { useFormItem } from '../../form/src/hooks/use-form-item.mjs';
import { useFormDisabled, useFormSize } from '../../form/src/hooks/use-form-common-props.mjs';
import { useEmptyValues } from '../../../hooks/use-empty-values/index.mjs';
import { useComposition } from '../../../hooks/use-composition/index.mjs';
import { useFocusController } from '../../../hooks/use-focus-controller/index.mjs';
import { debugWarn } from '../../../utils/error.mjs';
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../../../constants/event.mjs';
import { isPromise } from '@vue/shared';
import { getEventCode } from '../../../utils/dom/event.mjs';
import { EVENT_CODE } from '../../../constants/aria.mjs';
import { focusNode, getSibling } from '../../../utils/dom/aria.mjs';

const _hoisted_1 = ["placeholder"];
const _hoisted_2 = ["onClick"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElCascader"
  },
  __name: "cascader",
  props: cascaderProps,
  emits: cascaderEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const popperOptions = {
      modifiers: [
        {
          name: "arrowPosition",
          enabled: true,
          phase: "main",
          fn: ({ state }) => {
            const { modifiersData, placement } = state;
            if (["right", "left", "bottom", "top"].includes(placement)) return;
            if (modifiersData.arrow) {
              modifiersData.arrow.x = 35;
            }
          },
          requires: ["arrow"]
        }
      ]
    };
    const props = __props;
    const emit = __emit;
    const attrs = useAttrs();
    const slots = useSlots();
    let inputInitialHeight = 0;
    let pressDeleteCount = 0;
    const nsCascader = useNamespace("cascader");
    const nsInput = useNamespace("input");
    const sizeMapPadding = {
      small: 7,
      default: 11,
      large: 15
    };
    const { t } = useLocale();
    const { formItem } = useFormItem();
    const isDisabled = useFormDisabled();
    const { valueOnClear } = useEmptyValues(props);
    const { isComposing, handleComposition } = useComposition({
      afterComposition(event) {
        var _a;
        const text = (_a = event.target) == null ? void 0 : _a.value;
        handleInput(text);
      }
    });
    const tooltipRef = ref();
    const tagTooltipRef = ref();
    const inputRef = ref();
    const tagWrapper = ref();
    const cascaderPanelRef = ref();
    const suggestionPanel = ref();
    const popperVisible = ref(false);
    const inputHover = ref(false);
    const filtering = ref(false);
    const inputValue = ref("");
    const searchInputValue = ref("");
    const tags = ref([]);
    const suggestions = ref([]);
    const showTagList = computed(() => {
      if (!props.props.multiple) {
        return [];
      }
      return props.collapseTags ? tags.value.slice(0, props.maxCollapseTags) : tags.value;
    });
    const collapseTagList = computed(() => {
      if (!props.props.multiple) {
        return [];
      }
      return props.collapseTags ? tags.value.slice(props.maxCollapseTags) : [];
    });
    const cascaderStyle = computed(() => {
      return attrs.style;
    });
    const inputPlaceholder = computed(
      () => {
        var _a;
        return (_a = props.placeholder) != null ? _a : t("el.cascader.placeholder");
      }
    );
    const currentPlaceholder = computed(
      () => searchInputValue.value || tags.value.length > 0 || isComposing.value ? "" : inputPlaceholder.value
    );
    const realSize = useFormSize();
    const tagSize = computed(
      () => realSize.value === "small" ? "small" : "default"
    );
    const multiple = computed(() => !!props.props.multiple);
    const readonly = computed(() => !props.filterable || multiple.value);
    const searchKeyword = computed(
      () => multiple.value ? searchInputValue.value : inputValue.value
    );
    const checkedNodes = computed(
      () => {
        var _a;
        return ((_a = cascaderPanelRef.value) == null ? void 0 : _a.checkedNodes) || [];
      }
    );
    const { wrapperRef, isFocused, handleBlur } = useFocusController(inputRef, {
      disabled: isDisabled,
      beforeBlur(event) {
        var _a, _b;
        return ((_a = tooltipRef.value) == null ? void 0 : _a.isFocusInsideContent(event)) || ((_b = tagTooltipRef.value) == null ? void 0 : _b.isFocusInsideContent(event));
      },
      afterBlur() {
        var _a;
        if (props.validateEvent) {
          (_a = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a.call(formItem, "blur").catch((err) => debugWarn(err));
        }
      }
    });
    const clearBtnVisible = computed(() => {
      if (!props.clearable || isDisabled.value || filtering.value || !inputHover.value && !isFocused.value)
        return false;
      return !!checkedNodes.value.length;
    });
    const presentText = computed(() => {
      const { showAllLevels, separator } = props;
      const nodes = checkedNodes.value;
      return nodes.length ? multiple.value ? "" : nodes[0].calcText(showAllLevels, separator) : "";
    });
    const validateState = computed(() => (formItem == null ? void 0 : formItem.validateState) || "");
    const checkedValue = computed({
      get() {
        return cloneDeep(props.modelValue);
      },
      set(val) {
        const value = val != null ? val : valueOnClear.value;
        emit(UPDATE_MODEL_EVENT, value);
        emit(CHANGE_EVENT, value);
        if (props.validateEvent) {
          formItem == null ? void 0 : formItem.validate("change").catch((err) => debugWarn(err));
        }
      }
    });
    const cascaderKls = computed(() => {
      return [
        nsCascader.b(),
        nsCascader.m(realSize.value),
        nsCascader.is("disabled", isDisabled.value),
        attrs.class
      ];
    });
    const cascaderIconKls = computed(() => {
      return [
        nsInput.e("icon"),
        "icon-arrow-down",
        nsCascader.is("reverse", popperVisible.value)
      ];
    });
    const inputClass = computed(() => nsCascader.is("focus", isFocused.value));
    const contentRef = computed(() => {
      var _a, _b;
      return (_b = (_a = tooltipRef.value) == null ? void 0 : _a.popperRef) == null ? void 0 : _b.contentRef;
    });
    const handleClickOutside = (event) => {
      if (isFocused.value) {
        const _event = new FocusEvent("blur", event);
        handleBlur(_event);
      }
      togglePopperVisible(false);
    };
    const togglePopperVisible = (visible) => {
      var _a, _b;
      if (isDisabled.value) return;
      visible = visible != null ? visible : !popperVisible.value;
      if (visible !== popperVisible.value) {
        popperVisible.value = visible;
        (_b = (_a = inputRef.value) == null ? void 0 : _a.input) == null ? void 0 : _b.setAttribute("aria-expanded", `${visible}`);
        if (visible) {
          updatePopperPosition();
          cascaderPanelRef.value && nextTick(cascaderPanelRef.value.scrollToExpandingNode);
        } else if (props.filterable) {
          syncPresentTextValue();
        }
        emit("visibleChange", visible);
      }
    };
    const updatePopperPosition = () => {
      nextTick(() => {
        var _a;
        (_a = tooltipRef.value) == null ? void 0 : _a.updatePopper();
      });
    };
    const hideSuggestionPanel = () => {
      filtering.value = false;
    };
    const genTag = (node) => {
      const { showAllLevels, separator } = props;
      return {
        node,
        key: node.uid,
        text: node.calcText(showAllLevels, separator),
        hitState: false,
        closable: !isDisabled.value && !node.isDisabled
      };
    };
    const deleteTag = (tag) => {
      var _a;
      const node = tag.node;
      node.doCheck(false);
      (_a = cascaderPanelRef.value) == null ? void 0 : _a.calculateCheckedValue();
      emit("removeTag", node.valueByOption);
    };
    const getStrategyCheckedNodes = () => {
      switch (props.showCheckedStrategy) {
        case "child":
          return checkedNodes.value;
        case "parent": {
          const clickedNodes = getCheckedNodes(false);
          const clickedNodesValue = clickedNodes.map((o) => o.value);
          const parentNodes = clickedNodes.filter(
            (o) => !o.parent || !clickedNodesValue.includes(o.parent.value)
          );
          return parentNodes;
        }
        default:
          return [];
      }
    };
    const calculatePresentTags = () => {
      if (!multiple.value) return;
      const nodes = getStrategyCheckedNodes();
      const allTags = [];
      nodes.forEach((node) => allTags.push(genTag(node)));
      tags.value = allTags;
    };
    const calculateSuggestions = () => {
      var _a, _b;
      const { filterMethod, showAllLevels, separator } = props;
      const res = (_b = (_a = cascaderPanelRef.value) == null ? void 0 : _a.getFlattedNodes(!props.props.checkStrictly)) == null ? void 0 : _b.filter((node) => {
        if (node.isDisabled) return false;
        node.calcText(showAllLevels, separator);
        return filterMethod(node, searchKeyword.value);
      });
      if (multiple.value) {
        tags.value.forEach((tag) => {
          tag.hitState = false;
        });
      }
      filtering.value = true;
      suggestions.value = res;
      updatePopperPosition();
    };
    const focusFirstNode = () => {
      var _a;
      let firstNode;
      if (filtering.value && suggestionPanel.value) {
        firstNode = suggestionPanel.value.$el.querySelector(
          `.${nsCascader.e("suggestion-item")}`
        );
      } else {
        firstNode = (_a = cascaderPanelRef.value) == null ? void 0 : _a.$el.querySelector(
          `.${nsCascader.b("node")}[tabindex="-1"]`
        );
      }
      if (firstNode) {
        firstNode.focus();
        !filtering.value && firstNode.click();
      }
    };
    const updateStyle = () => {
      var _a, _b, _c;
      const inputInner = (_a = inputRef.value) == null ? void 0 : _a.input;
      const tagWrapperEl = tagWrapper.value;
      const suggestionPanelEl = (_b = suggestionPanel.value) == null ? void 0 : _b.$el;
      if (!isClient || !inputInner) return;
      if (suggestionPanelEl) {
        const suggestionList = suggestionPanelEl.querySelector(
          `.${nsCascader.e("suggestion-list")}`
        );
        suggestionList.style.minWidth = `${inputInner.offsetWidth}px`;
      }
      if (tagWrapperEl) {
        const { offsetHeight } = tagWrapperEl;
        const height = tags.value.length > 0 ? `${Math.max(offsetHeight, inputInitialHeight) - 2}px` : `${inputInitialHeight}px`;
        inputInner.style.height = height;
        if (slots.prefix) {
          const prefix = (_c = inputRef.value) == null ? void 0 : _c.$el.querySelector(
            `.${nsInput.e("prefix")}`
          );
          let left = 0;
          if (prefix) {
            left = prefix.offsetWidth;
            if (left > 0) {
              left += sizeMapPadding[realSize.value || "default"];
            }
          }
          tagWrapperEl.style.left = `${left}px`;
        } else {
          tagWrapperEl.style.left = `0`;
        }
        updatePopperPosition();
      }
    };
    const getCheckedNodes = (leafOnly) => {
      var _a;
      return (_a = cascaderPanelRef.value) == null ? void 0 : _a.getCheckedNodes(leafOnly);
    };
    const handleExpandChange = (value) => {
      updatePopperPosition();
      emit("expandChange", value);
    };
    const handleKeyDown = (e) => {
      if (isComposing.value) return;
      const code = getEventCode(e);
      switch (code) {
        case EVENT_CODE.enter:
        case EVENT_CODE.numpadEnter:
          togglePopperVisible();
          break;
        case EVENT_CODE.down:
          togglePopperVisible(true);
          nextTick(focusFirstNode);
          e.preventDefault();
          break;
        case EVENT_CODE.esc:
          if (popperVisible.value === true) {
            e.preventDefault();
            e.stopPropagation();
            togglePopperVisible(false);
          }
          break;
        case EVENT_CODE.tab:
          togglePopperVisible(false);
          break;
      }
    };
    const handleClear = () => {
      var _a;
      (_a = cascaderPanelRef.value) == null ? void 0 : _a.clearCheckedNodes();
      if (!popperVisible.value && props.filterable) {
        syncPresentTextValue();
      }
      togglePopperVisible(false);
      emit("clear");
    };
    const syncPresentTextValue = () => {
      const { value } = presentText;
      inputValue.value = value;
      searchInputValue.value = value;
    };
    const handleSuggestionClick = (node) => {
      var _a, _b;
      const { checked } = node;
      if (multiple.value) {
        (_a = cascaderPanelRef.value) == null ? void 0 : _a.handleCheckChange(node, !checked, false);
      } else {
        !checked && ((_b = cascaderPanelRef.value) == null ? void 0 : _b.handleCheckChange(node, true, false));
        togglePopperVisible(false);
      }
    };
    const handleSuggestionKeyDown = (e) => {
      const target = e.target;
      const code = getEventCode(e);
      switch (code) {
        case EVENT_CODE.up:
        case EVENT_CODE.down: {
          e.preventDefault();
          const distance = code === EVENT_CODE.up ? -1 : 1;
          focusNode(
            getSibling(
              target,
              distance,
              `.${nsCascader.e("suggestion-item")}[tabindex="-1"]`
            )
          );
          break;
        }
        case EVENT_CODE.enter:
        case EVENT_CODE.numpadEnter:
          target.click();
          break;
      }
    };
    const handleDelete = () => {
      const lastTag = tags.value[tags.value.length - 1];
      pressDeleteCount = searchInputValue.value ? 0 : pressDeleteCount + 1;
      if (!lastTag || !pressDeleteCount || props.collapseTags && tags.value.length > 1)
        return;
      if (lastTag.hitState) {
        deleteTag(lastTag);
      } else {
        lastTag.hitState = true;
      }
    };
    const debounce = computed(() => props.debounce);
    const handleFilter = useDebounceFn(() => {
      const { value } = searchKeyword;
      if (!value) return;
      const passed = props.beforeFilter(value);
      if (isPromise(passed)) {
        passed.then(calculateSuggestions).catch(() => {
        });
      } else if (passed !== false) {
        calculateSuggestions();
      } else {
        hideSuggestionPanel();
      }
    }, debounce);
    const handleInput = (val, e) => {
      !popperVisible.value && togglePopperVisible(true);
      if (e == null ? void 0 : e.isComposing) return;
      val ? handleFilter() : hideSuggestionPanel();
    };
    const getInputInnerHeight = (inputInner) => Number.parseFloat(
      useCssVar(nsInput.cssVarName("input-height"), inputInner).value
    ) - 2;
    const focus = () => {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.focus();
    };
    const blur = () => {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.blur();
    };
    watch(filtering, updatePopperPosition);
    watch(
      [
        checkedNodes,
        isDisabled,
        () => props.collapseTags,
        () => props.maxCollapseTags
      ],
      calculatePresentTags
    );
    watch(tags, () => {
      nextTick(() => updateStyle());
    });
    watch(realSize, async () => {
      await nextTick();
      const inputInner = inputRef.value.input;
      inputInitialHeight = getInputInnerHeight(inputInner) || inputInitialHeight;
      updateStyle();
    });
    watch(presentText, syncPresentTextValue, { immediate: true });
    watch(
      () => popperVisible.value,
      (val) => {
        var _a;
        if (val && props.props.lazy && props.props.lazyLoad) {
          (_a = cascaderPanelRef.value) == null ? void 0 : _a.loadLazyRootNodes();
        }
      }
    );
    onMounted(() => {
      const inputInner = inputRef.value.input;
      const inputInnerHeight = getInputInnerHeight(inputInner);
      inputInitialHeight = inputInner.offsetHeight || inputInnerHeight;
      useResizeObserver(inputInner, updateStyle);
    });
    __expose({
      /**
       * @description get an array of currently selected node,(leafOnly) whether only return the leaf checked nodes, default is `false`
       */
      getCheckedNodes,
      /**
       * @description cascader panel ref
       */
      cascaderPanelRef,
      /**
       * @description toggle the visible of popper
       */
      togglePopperVisible,
      /**
       * @description cascader content ref
       */
      contentRef,
      /**
       * @description selected content text
       */
      presentText,
      /** @description focus the input element */
      focus,
      /** @description blur the input element */
      blur
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElTooltip), {
        ref_key: "tooltipRef",
        ref: tooltipRef,
        visible: popperVisible.value,
        teleported: __props.teleported,
        "popper-class": [unref(nsCascader).e("dropdown"), __props.popperClass],
        "popper-style": __props.popperStyle,
        "popper-options": popperOptions,
        "fallback-placements": __props.fallbackPlacements,
        "stop-popper-mouse-event": false,
        "gpu-acceleration": false,
        placement: __props.placement,
        transition: `${unref(nsCascader).namespace.value}-zoom-in-top`,
        effect: __props.effect,
        pure: "",
        persistent: __props.persistent,
        onHide: hideSuggestionPanel
      }, {
        default: withCtx(() => [
          withDirectives((openBlock(), createElementBlock(
            "div",
            {
              ref_key: "wrapperRef",
              ref: wrapperRef,
              class: normalizeClass(cascaderKls.value),
              style: normalizeStyle(cascaderStyle.value),
              onClick: _cache[8] || (_cache[8] = () => togglePopperVisible(readonly.value ? void 0 : true)),
              onKeydown: handleKeyDown,
              onMouseenter: _cache[9] || (_cache[9] = ($event) => inputHover.value = true),
              onMouseleave: _cache[10] || (_cache[10] = ($event) => inputHover.value = false)
            },
            [
              createVNode(unref(ElInput), {
                ref_key: "inputRef",
                ref: inputRef,
                modelValue: inputValue.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => inputValue.value = $event),
                placeholder: currentPlaceholder.value,
                readonly: readonly.value,
                disabled: unref(isDisabled),
                "validate-event": false,
                size: unref(realSize),
                class: normalizeClass(inputClass.value),
                tabindex: multiple.value && __props.filterable && !unref(isDisabled) ? -1 : void 0,
                onCompositionstart: unref(handleComposition),
                onCompositionupdate: unref(handleComposition),
                onCompositionend: unref(handleComposition),
                onInput: handleInput
              }, createSlots({
                suffix: withCtx(() => [
                  clearBtnVisible.value ? (openBlock(), createBlock(unref(ElIcon), {
                    key: "clear",
                    class: normalizeClass([unref(nsInput).e("icon"), "icon-circle-close"]),
                    onClick: withModifiers(handleClear, ["stop"])
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(__props.clearIcon)))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["class"])) : (openBlock(), createBlock(unref(ElIcon), {
                    key: "arrow-down",
                    class: normalizeClass(cascaderIconKls.value),
                    onClick: _cache[0] || (_cache[0] = withModifiers(($event) => togglePopperVisible(), ["stop"]))
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(ArrowDown))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["class"]))
                ]),
                _: 2
                /* DYNAMIC */
              }, [
                _ctx.$slots.prefix ? {
                  name: "prefix",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "prefix")
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["modelValue", "placeholder", "readonly", "disabled", "size", "class", "tabindex", "onCompositionstart", "onCompositionupdate", "onCompositionend"]),
              multiple.value ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  ref_key: "tagWrapper",
                  ref: tagWrapper,
                  class: normalizeClass([
                    unref(nsCascader).e("tags"),
                    unref(nsCascader).is("validate", Boolean(validateState.value))
                  ])
                },
                [
                  renderSlot(_ctx.$slots, "tag", {
                    data: tags.value,
                    deleteTag
                  }, () => [
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(showTagList.value, (tag) => {
                        return openBlock(), createBlock(unref(ElTag), {
                          key: tag.key,
                          type: __props.tagType,
                          size: tagSize.value,
                          effect: __props.tagEffect,
                          hit: tag.hitState,
                          closable: tag.closable,
                          "disable-transitions": "",
                          onClose: ($event) => deleteTag(tag)
                        }, {
                          default: withCtx(() => [
                            createElementVNode(
                              "span",
                              null,
                              toDisplayString(tag.text),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1032, ["type", "size", "effect", "hit", "closable", "onClose"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]),
                  __props.collapseTags && tags.value.length > __props.maxCollapseTags ? (openBlock(), createBlock(unref(ElTooltip), {
                    key: 0,
                    ref_key: "tagTooltipRef",
                    ref: tagTooltipRef,
                    disabled: popperVisible.value || !__props.collapseTagsTooltip,
                    "fallback-placements": ["bottom", "top", "right", "left"],
                    placement: "bottom",
                    "popper-class": __props.popperClass,
                    "popper-style": __props.popperStyle,
                    effect: __props.effect,
                    persistent: __props.persistent
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(ElTag), {
                        closable: false,
                        size: tagSize.value,
                        type: __props.tagType,
                        effect: __props.tagEffect,
                        "disable-transitions": ""
                      }, {
                        default: withCtx(() => [
                          createElementVNode(
                            "span",
                            {
                              class: normalizeClass(unref(nsCascader).e("tags-text"))
                            },
                            " + " + toDisplayString(tags.value.length - __props.maxCollapseTags),
                            3
                            /* TEXT, CLASS */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["size", "type", "effect"])
                    ]),
                    content: withCtx(() => [
                      createVNode(unref(ElScrollbar), { "max-height": __props.maxCollapseTagsTooltipHeight }, {
                        default: withCtx(() => [
                          createElementVNode(
                            "div",
                            {
                              class: normalizeClass(unref(nsCascader).e("collapse-tags"))
                            },
                            [
                              (openBlock(true), createElementBlock(
                                Fragment,
                                null,
                                renderList(collapseTagList.value, (tag, idx) => {
                                  return openBlock(), createElementBlock(
                                    "div",
                                    {
                                      key: idx,
                                      class: normalizeClass(unref(nsCascader).e("collapse-tag"))
                                    },
                                    [
                                      (openBlock(), createBlock(unref(ElTag), {
                                        key: tag.key,
                                        class: "in-tooltip",
                                        type: __props.tagType,
                                        size: tagSize.value,
                                        effect: __props.tagEffect,
                                        hit: tag.hitState,
                                        closable: tag.closable,
                                        "disable-transitions": "",
                                        onClose: ($event) => deleteTag(tag)
                                      }, {
                                        default: withCtx(() => [
                                          createElementVNode(
                                            "span",
                                            null,
                                            toDisplayString(tag.text),
                                            1
                                            /* TEXT */
                                          )
                                        ]),
                                        _: 2
                                        /* DYNAMIC */
                                      }, 1032, ["type", "size", "effect", "hit", "closable", "onClose"]))
                                    ],
                                    2
                                    /* CLASS */
                                  );
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ],
                            2
                            /* CLASS */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["max-height"])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["disabled", "popper-class", "popper-style", "effect", "persistent"])) : createCommentVNode("v-if", true),
                  __props.filterable && !unref(isDisabled) ? withDirectives((openBlock(), createElementBlock("input", {
                    key: 1,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => searchInputValue.value = $event),
                    type: "text",
                    class: normalizeClass(unref(nsCascader).e("search-input")),
                    placeholder: presentText.value ? "" : inputPlaceholder.value,
                    onInput: _cache[3] || (_cache[3] = (e) => handleInput(searchInputValue.value, e)),
                    onClick: _cache[4] || (_cache[4] = withModifiers(($event) => togglePopperVisible(true), ["stop"])),
                    onKeydown: withKeys(handleDelete, ["delete"]),
                    onCompositionstart: _cache[5] || (_cache[5] = //@ts-ignore
                    (...args) => unref(handleComposition) && unref(handleComposition)(...args)),
                    onCompositionupdate: _cache[6] || (_cache[6] = //@ts-ignore
                    (...args) => unref(handleComposition) && unref(handleComposition)(...args)),
                    onCompositionend: _cache[7] || (_cache[7] = //@ts-ignore
                    (...args) => unref(handleComposition) && unref(handleComposition)(...args))
                  }, null, 42, _hoisted_1)), [
                    [vModelText, searchInputValue.value]
                  ]) : createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true)
            ],
            38
            /* CLASS, STYLE, NEED_HYDRATION */
          )), [
            [unref(ClickOutside), handleClickOutside, contentRef.value]
          ])
        ]),
        content: withCtx(() => [
          _ctx.$slots.header ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(unref(nsCascader).e("header")),
              onClick: _cache[11] || (_cache[11] = withModifiers(() => {
              }, ["stop"]))
            },
            [
              renderSlot(_ctx.$slots, "header")
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true),
          withDirectives(createVNode(unref(ElCascaderPanel), {
            ref_key: "cascaderPanelRef",
            ref: cascaderPanelRef,
            modelValue: checkedValue.value,
            "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => checkedValue.value = $event),
            options: __props.options,
            props: props.props,
            border: false,
            "render-label": _ctx.$slots.default,
            onExpandChange: handleExpandChange,
            onClose: _cache[13] || (_cache[13] = ($event) => _ctx.$nextTick(() => togglePopperVisible(false)))
          }, {
            empty: withCtx(() => [
              renderSlot(_ctx.$slots, "empty")
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["modelValue", "options", "props", "render-label"]), [
            [vShow, !filtering.value]
          ]),
          __props.filterable ? withDirectives((openBlock(), createBlock(unref(ElScrollbar), {
            key: 1,
            ref_key: "suggestionPanel",
            ref: suggestionPanel,
            tag: "ul",
            class: normalizeClass(unref(nsCascader).e("suggestion-panel")),
            "view-class": unref(nsCascader).e("suggestion-list"),
            onKeydown: handleSuggestionKeyDown
          }, {
            default: withCtx(() => [
              suggestions.value.length ? (openBlock(true), createElementBlock(
                Fragment,
                { key: 0 },
                renderList(suggestions.value, (item) => {
                  return openBlock(), createElementBlock("li", {
                    key: item.uid,
                    class: normalizeClass([
                      unref(nsCascader).e("suggestion-item"),
                      unref(nsCascader).is("checked", item.checked)
                    ]),
                    tabindex: -1,
                    onClick: ($event) => handleSuggestionClick(item)
                  }, [
                    renderSlot(_ctx.$slots, "suggestion-item", { item }, () => [
                      createElementVNode(
                        "span",
                        null,
                        toDisplayString(item.text),
                        1
                        /* TEXT */
                      ),
                      item.checked ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(unref(Check))
                        ]),
                        _: 1
                        /* STABLE */
                      })) : createCommentVNode("v-if", true)
                    ])
                  ], 10, _hoisted_2);
                }),
                128
                /* KEYED_FRAGMENT */
              )) : renderSlot(_ctx.$slots, "empty", { key: 1 }, () => [
                createElementVNode(
                  "li",
                  {
                    class: normalizeClass(unref(nsCascader).e("empty-text"))
                  },
                  toDisplayString(unref(t)("el.cascader.noMatch")),
                  3
                  /* TEXT, CLASS */
                )
              ])
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["class", "view-class"])), [
            [vShow, filtering.value]
          ]) : createCommentVNode("v-if", true),
          _ctx.$slots.footer ? (openBlock(), createElementBlock(
            "div",
            {
              key: 2,
              class: normalizeClass(unref(nsCascader).e("footer")),
              onClick: _cache[14] || (_cache[14] = withModifiers(() => {
              }, ["stop"]))
            },
            [
              renderSlot(_ctx.$slots, "footer")
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["visible", "teleported", "popper-class", "popper-style", "fallback-placements", "placement", "transition", "effect", "persistent"]);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=cascader.vue2.mjs.map
