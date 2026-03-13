'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var transfer = require('./transfer.js');
var vue = require('vue');
var index$2 = require('../../button/index.js');
var index$3 = require('../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var transferPanel_vue_vue_type_script_setup_true_lang = require('./transfer-panel.vue2.js');
var useComputedData = require('./composables/use-computed-data.js');
var useMove = require('./composables/use-move.js');
var useCheckedChange = require('./composables/use-checked-change.js');
var index = require('../../../hooks/use-locale/index.js');
var index$1 = require('../../../hooks/use-namespace/index.js');
var useFormItem = require('../../form/src/hooks/use-form-item.js');
var usePropsAlias = require('./composables/use-props-alias.js');
var error = require('../../../utils/error.js');
var types = require('../../../utils/types.js');

const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 0 };
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElTransfer"
  },
  __name: "transfer",
  props: transfer.transferProps,
  emits: transfer.transferEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const slots = vue.useSlots();
    const { t } = index.useLocale();
    const ns = index$1.useNamespace("transfer");
    const { formItem } = useFormItem.useFormItem();
    const checkedState = vue.reactive({
      leftChecked: [],
      rightChecked: []
    });
    const propsAlias = usePropsAlias.usePropsAlias(props);
    const { sourceData, targetData } = useComputedData.useComputedData(props);
    const { onSourceCheckedChange, onTargetCheckedChange } = useCheckedChange.useCheckedChange(
      checkedState,
      emit
    );
    const { addToLeft, addToRight } = useMove.useMove(props, checkedState, emit);
    const leftPanel = vue.ref();
    const rightPanel = vue.ref();
    const clearQuery = (which) => {
      switch (which) {
        case "left":
          leftPanel.value.query = "";
          break;
        case "right":
          rightPanel.value.query = "";
          break;
      }
    };
    const hasButtonTexts = vue.computed(() => props.buttonTexts.length === 2);
    const leftPanelTitle = vue.computed(
      () => props.titles[0] || t("el.transfer.titles.0")
    );
    const rightPanelTitle = vue.computed(
      () => props.titles[1] || t("el.transfer.titles.1")
    );
    const panelFilterPlaceholder = vue.computed(
      () => props.filterPlaceholder || t("el.transfer.filterPlaceholder")
    );
    vue.watch(
      () => props.modelValue,
      () => {
        var _a;
        if (props.validateEvent) {
          (_a = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a.call(formItem, "change").catch((err) => error.debugWarn(err));
        }
      }
    );
    const optionRender = vue.computed(() => (option) => {
      var _a;
      if (props.renderContent) return props.renderContent(vue.h, option);
      const defaultSlotVNodes = (((_a = slots.default) == null ? void 0 : _a.call(slots, { option })) || []).filter(
        (node) => node.type !== vue.Comment
      );
      if (defaultSlotVNodes.length) {
        return defaultSlotVNodes;
      }
      return vue.h(
        "span",
        option[propsAlias.value.label] || option[propsAlias.value.key]
      );
    });
    __expose({
      /** @description clear the filter keyword of a certain panel */
      clearQuery,
      /** @description left panel ref */
      leftPanel,
      /** @description right panel ref */
      rightPanel
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(vue.unref(ns).b())
        },
        [
          vue.createVNode(transferPanel_vue_vue_type_script_setup_true_lang.default, {
            ref_key: "leftPanel",
            ref: leftPanel,
            data: vue.unref(sourceData),
            "option-render": optionRender.value,
            placeholder: panelFilterPlaceholder.value,
            title: leftPanelTitle.value,
            filterable: __props.filterable,
            format: __props.format,
            "filter-method": __props.filterMethod,
            "default-checked": __props.leftDefaultChecked,
            props: props.props,
            onCheckedChange: vue.unref(onSourceCheckedChange)
          }, {
            empty: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "left-empty")
            ]),
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "left-footer")
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["data", "option-render", "placeholder", "title", "filterable", "format", "filter-method", "default-checked", "props", "onCheckedChange"]),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(vue.unref(ns).e("buttons"))
            },
            [
              vue.createVNode(vue.unref(index$2.ElButton), {
                type: "primary",
                class: vue.normalizeClass([vue.unref(ns).e("button"), vue.unref(ns).is("with-texts", hasButtonTexts.value)]),
                disabled: vue.unref(types.isEmpty)(checkedState.rightChecked),
                onClick: vue.unref(addToLeft)
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(vue.unref(index$3.ElIcon), null, {
                    default: vue.withCtx(() => [
                      vue.createVNode(vue.unref(iconsVue.ArrowLeft))
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  !vue.unref(types.isUndefined)(__props.buttonTexts[0]) ? (vue.openBlock(), vue.createElementBlock(
                    "span",
                    _hoisted_1,
                    vue.toDisplayString(__props.buttonTexts[0]),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true)
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class", "disabled", "onClick"]),
              vue.createVNode(vue.unref(index$2.ElButton), {
                type: "primary",
                class: vue.normalizeClass([vue.unref(ns).e("button"), vue.unref(ns).is("with-texts", hasButtonTexts.value)]),
                disabled: vue.unref(types.isEmpty)(checkedState.leftChecked),
                onClick: vue.unref(addToRight)
              }, {
                default: vue.withCtx(() => [
                  !vue.unref(types.isUndefined)(__props.buttonTexts[1]) ? (vue.openBlock(), vue.createElementBlock(
                    "span",
                    _hoisted_2,
                    vue.toDisplayString(__props.buttonTexts[1]),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true),
                  vue.createVNode(vue.unref(index$3.ElIcon), null, {
                    default: vue.withCtx(() => [
                      vue.createVNode(vue.unref(iconsVue.ArrowRight))
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class", "disabled", "onClick"])
            ],
            2
            /* CLASS */
          ),
          vue.createVNode(transferPanel_vue_vue_type_script_setup_true_lang.default, {
            ref_key: "rightPanel",
            ref: rightPanel,
            data: vue.unref(targetData),
            "option-render": optionRender.value,
            placeholder: panelFilterPlaceholder.value,
            filterable: __props.filterable,
            format: __props.format,
            "filter-method": __props.filterMethod,
            title: rightPanelTitle.value,
            "default-checked": __props.rightDefaultChecked,
            props: props.props,
            onCheckedChange: vue.unref(onTargetCheckedChange)
          }, {
            empty: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "right-empty")
            ]),
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "right-footer")
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["data", "option-render", "placeholder", "filterable", "format", "filter-method", "title", "default-checked", "props", "onCheckedChange"])
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=transfer.vue2.js.map
