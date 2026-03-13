'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var segmented = require('./segmented.js');
var vue = require('vue');
var core = require('@vueuse/core');
var index = require('../../../hooks/use-namespace/index.js');
var index$1 = require('../../../hooks/use-id/index.js');
var useFormCommonProps = require('../../form/src/hooks/use-form-common-props.js');
var useFormItem = require('../../form/src/hooks/use-form-item.js');
var error = require('../../../utils/error.js');
var event = require('../../../constants/event.js');
var shared = require('@vue/shared');

const _hoisted_1 = ["id", "aria-label", "aria-labelledby"];
const _hoisted_2 = ["name", "disabled", "checked", "onChange"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElSegmented"
  },
  __name: "segmented",
  props: segmented.segmentedProps,
  emits: segmented.segmentedEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = index.useNamespace("segmented");
    const segmentedId = index$1.useId();
    const segmentedSize = useFormCommonProps.useFormSize();
    const _disabled = useFormCommonProps.useFormDisabled();
    const { formItem } = useFormItem.useFormItem();
    const { inputId, isLabeledByFormItem } = useFormItem.useFormItemInputId(props, {
      formItemContext: formItem
    });
    const segmentedRef = vue.ref(null);
    const activeElement = core.useActiveElement();
    const state = vue.reactive({
      isInit: false,
      width: 0,
      height: 0,
      translateX: 0,
      translateY: 0,
      focusVisible: false
    });
    const handleChange = (evt, item) => {
      const value = getValue(item);
      emit(event.UPDATE_MODEL_EVENT, value);
      emit(event.CHANGE_EVENT, value);
      evt.target.checked = value === props.modelValue;
    };
    const aliasProps = vue.computed(() => ({ ...segmented.defaultProps, ...props.props }));
    const intoAny = (item) => item;
    const getValue = (item) => {
      return shared.isObject(item) ? item[aliasProps.value.value] : item;
    };
    const getLabel = (item) => {
      return shared.isObject(item) ? item[aliasProps.value.label] : item;
    };
    const getDisabled = (item) => {
      return !!(_disabled.value || (shared.isObject(item) ? item[aliasProps.value.disabled] : false));
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
    const segmentedCls = vue.computed(() => [
      ns.b(),
      ns.m(segmentedSize.value),
      ns.is("block", props.block)
    ]);
    const selectedStyle = vue.computed(() => ({
      width: props.direction === "vertical" ? "100%" : `${state.width}px`,
      height: props.direction === "vertical" ? `${state.height}px` : "100%",
      transform: props.direction === "vertical" ? `translateY(${state.translateY}px)` : `translateX(${state.translateX}px)`,
      display: state.isInit ? "block" : "none"
    }));
    const selectedCls = vue.computed(() => [
      ns.e("item-selected"),
      ns.is("disabled", getDisabled(getOption(props.modelValue))),
      ns.is("focus-visible", state.focusVisible)
    ]);
    const name = vue.computed(() => {
      return props.name || segmentedId.value;
    });
    core.useResizeObserver(segmentedRef, updateSelect);
    vue.watch(activeElement, updateSelect);
    vue.watch(
      () => props.modelValue,
      () => {
        var _a;
        updateSelect();
        if (props.validateEvent) {
          (_a = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a.call(formItem, "change").catch((err) => error.debugWarn(err));
        }
      },
      {
        flush: "post"
      }
    );
    return (_ctx, _cache) => {
      return __props.options.length ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        id: vue.unref(inputId),
        ref_key: "segmentedRef",
        ref: segmentedRef,
        class: vue.normalizeClass(segmentedCls.value),
        role: "radiogroup",
        "aria-label": !vue.unref(isLabeledByFormItem) ? __props.ariaLabel || "segmented" : void 0,
        "aria-labelledby": vue.unref(isLabeledByFormItem) ? vue.unref(formItem).labelId : void 0
      }, [
        vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass([vue.unref(ns).e("group"), vue.unref(ns).m(__props.direction)])
          },
          [
            vue.createElementVNode(
              "div",
              {
                style: vue.normalizeStyle(selectedStyle.value),
                class: vue.normalizeClass(selectedCls.value)
              },
              null,
              6
              /* CLASS, STYLE */
            ),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(__props.options, (item, index) => {
                return vue.openBlock(), vue.createElementBlock(
                  "label",
                  {
                    key: index,
                    class: vue.normalizeClass(getItemCls(item))
                  },
                  [
                    vue.createElementVNode("input", {
                      class: vue.normalizeClass(vue.unref(ns).e("item-input")),
                      type: "radio",
                      name: name.value,
                      disabled: getDisabled(item),
                      checked: getSelected(item),
                      onChange: ($event) => handleChange($event, item)
                    }, null, 42, _hoisted_2),
                    vue.createElementVNode(
                      "div",
                      {
                        class: vue.normalizeClass(vue.unref(ns).e("item-label"))
                      },
                      [
                        vue.renderSlot(_ctx.$slots, "default", {
                          item: intoAny(item)
                        }, () => [
                          vue.createTextVNode(
                            vue.toDisplayString(getLabel(item)),
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
      ], 10, _hoisted_1)) : vue.createCommentVNode("v-if", true);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=segmented.vue2.js.map
