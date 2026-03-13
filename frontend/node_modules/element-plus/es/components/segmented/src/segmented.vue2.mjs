import { segmentedEmits, segmentedProps, defaultProps } from './segmented.mjs';
import { defineComponent, ref, reactive, computed, watch, createElementBlock, createCommentVNode, openBlock, unref, normalizeClass, createElementVNode, normalizeStyle, Fragment, renderList, renderSlot, createTextVNode, toDisplayString } from 'vue';
import { useActiveElement, useResizeObserver } from '@vueuse/core';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useId } from '../../../hooks/use-id/index.mjs';
import { useFormSize, useFormDisabled } from '../../form/src/hooks/use-form-common-props.mjs';
import { useFormItem, useFormItemInputId } from '../../form/src/hooks/use-form-item.mjs';
import { debugWarn } from '../../../utils/error.mjs';
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../../../constants/event.mjs';
import { isObject } from '@vue/shared';

const _hoisted_1 = ["id", "aria-label", "aria-labelledby"];
const _hoisted_2 = ["name", "disabled", "checked", "onChange"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElSegmented"
  },
  __name: "segmented",
  props: segmentedProps,
  emits: segmentedEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("segmented");
    const segmentedId = useId();
    const segmentedSize = useFormSize();
    const _disabled = useFormDisabled();
    const { formItem } = useFormItem();
    const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
      formItemContext: formItem
    });
    const segmentedRef = ref(null);
    const activeElement = useActiveElement();
    const state = reactive({
      isInit: false,
      width: 0,
      height: 0,
      translateX: 0,
      translateY: 0,
      focusVisible: false
    });
    const handleChange = (evt, item) => {
      const value = getValue(item);
      emit(UPDATE_MODEL_EVENT, value);
      emit(CHANGE_EVENT, value);
      evt.target.checked = value === props.modelValue;
    };
    const aliasProps = computed(() => ({ ...defaultProps, ...props.props }));
    const intoAny = (item) => item;
    const getValue = (item) => {
      return isObject(item) ? item[aliasProps.value.value] : item;
    };
    const getLabel = (item) => {
      return isObject(item) ? item[aliasProps.value.label] : item;
    };
    const getDisabled = (item) => {
      return !!(_disabled.value || (isObject(item) ? item[aliasProps.value.disabled] : false));
    };
    const getSelected = (item) => {
      return props.modelValue === getValue(item);
    };
    const getOption = (value) => {
      return props.options.find((item) => getValue(item) === value);
    };
    const getItemCls = (item) => {
      return [
        ns.e("item"),
        ns.is("selected", getSelected(item)),
        ns.is("disabled", getDisabled(item))
      ];
    };
    const updateSelect = () => {
      if (!segmentedRef.value) return;
      const selectedItem = segmentedRef.value.querySelector(
        ".is-selected"
      );
      const selectedItemInput = segmentedRef.value.querySelector(
        ".is-selected input"
      );
      if (!selectedItem || !selectedItemInput) {
        state.width = 0;
        state.height = 0;
        state.translateX = 0;
        state.translateY = 0;
        state.focusVisible = false;
        return;
      }
      state.isInit = true;
      if (props.direction === "vertical") {
        state.height = selectedItem.offsetHeight;
        state.translateY = selectedItem.offsetTop;
      } else {
        state.width = selectedItem.offsetWidth;
        state.translateX = selectedItem.offsetLeft;
      }
      try {
        state.focusVisible = selectedItemInput.matches(":focus-visible");
      } catch (e) {
      }
    };
    const segmentedCls = computed(() => [
      ns.b(),
      ns.m(segmentedSize.value),
      ns.is("block", props.block)
    ]);
    const selectedStyle = computed(() => ({
      width: props.direction === "vertical" ? "100%" : `${state.width}px`,
      height: props.direction === "vertical" ? `${state.height}px` : "100%",
      transform: props.direction === "vertical" ? `translateY(${state.translateY}px)` : `translateX(${state.translateX}px)`,
      display: state.isInit ? "block" : "none"
    }));
    const selectedCls = computed(() => [
      ns.e("item-selected"),
      ns.is("disabled", getDisabled(getOption(props.modelValue))),
      ns.is("focus-visible", state.focusVisible)
    ]);
    const name = computed(() => {
      return props.name || segmentedId.value;
    });
    useResizeObserver(segmentedRef, updateSelect);
    watch(activeElement, updateSelect);
    watch(
      () => props.modelValue,
      () => {
        var _a;
        updateSelect();
        if (props.validateEvent) {
          (_a = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a.call(formItem, "change").catch((err) => debugWarn(err));
        }
      },
      {
        flush: "post"
      }
    );
    return (_ctx, _cache) => {
      return __props.options.length ? (openBlock(), createElementBlock("div", {
        key: 0,
        id: unref(inputId),
        ref_key: "segmentedRef",
        ref: segmentedRef,
        class: normalizeClass(segmentedCls.value),
        role: "radiogroup",
        "aria-label": !unref(isLabeledByFormItem) ? __props.ariaLabel || "segmented" : void 0,
        "aria-labelledby": unref(isLabeledByFormItem) ? unref(formItem).labelId : void 0
      }, [
        createElementVNode(
          "div",
          {
            class: normalizeClass([unref(ns).e("group"), unref(ns).m(__props.direction)])
          },
          [
            createElementVNode(
              "div",
              {
                style: normalizeStyle(selectedStyle.value),
                class: normalizeClass(selectedCls.value)
              },
              null,
              6
              /* CLASS, STYLE */
            ),
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(__props.options, (item, index) => {
                return openBlock(), createElementBlock(
                  "label",
                  {
                    key: index,
                    class: normalizeClass(getItemCls(item))
                  },
                  [
                    createElementVNode("input", {
                      class: normalizeClass(unref(ns).e("item-input")),
                      type: "radio",
                      name: name.value,
                      disabled: getDisabled(item),
                      checked: getSelected(item),
                      onChange: ($event) => handleChange($event, item)
                    }, null, 42, _hoisted_2),
                    createElementVNode(
                      "div",
                      {
                        class: normalizeClass(unref(ns).e("item-label"))
                      },
                      [
                        renderSlot(_ctx.$slots, "default", {
                          item: intoAny(item)
                        }, () => [
                          createTextVNode(
                            toDisplayString(getLabel(item)),
                            1
                            /* TEXT */
                          )
                        ])
                      ],
                      2
                      /* CLASS */
                    )
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
      ], 10, _hoisted_1)) : createCommentVNode("v-if", true);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=segmented.vue2.mjs.map
