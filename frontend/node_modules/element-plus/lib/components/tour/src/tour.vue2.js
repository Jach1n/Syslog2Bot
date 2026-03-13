'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tour = require('./tour.js');
var vue = require('vue');
var core = require('@vueuse/core');
var index$2 = require('../../teleport/index.js');
var mask_vue_vue_type_script_setup_true_lang = require('./mask.vue2.js');
var content_vue_vue_type_script_setup_true_lang = require('./content.vue2.js');
var steps = require('./steps.js');
var helper = require('./helper.js');
var index = require('../../../hooks/use-namespace/index.js');
var types = require('../../../utils/types.js');
var index$1 = require('../../../hooks/use-z-index/index.js');
var event = require('../../../constants/event.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElTour",
    inheritAttrs: false
  },
  __name: "tour",
  props: tour.tourProps,
  emits: tour.tourEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = index.useNamespace("tour");
    const total = vue.ref(0);
    const currentStep = vue.ref();
    const current = core.useVModel(props, "current", emit, {
      passive: true
    });
    const currentTarget = vue.computed(() => {
      var _a;
      return (_a = currentStep.value) == null ? void 0 : _a.target;
    });
    const kls = vue.computed(() => [
      ns.b(),
      mergedType.value === "primary" ? ns.m("primary") : ""
    ]);
    const mergedPlacement = vue.computed(
      () => {
        var _a;
        return ((_a = currentStep.value) == null ? void 0 : _a.placement) || props.placement;
      }
    );
    const mergedContentStyle = vue.computed(
      () => {
        var _a, _b;
        return (_b = (_a = currentStep.value) == null ? void 0 : _a.contentStyle) != null ? _b : props.contentStyle;
      }
    );
    const mergedMask = vue.computed(() => {
      var _a, _b;
      return (_b = (_a = currentStep.value) == null ? void 0 : _a.mask) != null ? _b : props.mask;
    });
    const mergedShowMask = vue.computed(() => !!mergedMask.value && props.modelValue);
    const mergedMaskStyle = vue.computed(
      () => types.isBoolean(mergedMask.value) ? void 0 : mergedMask.value
    );
    const mergedShowArrow = vue.computed(
      () => {
        var _a, _b;
        return !!currentTarget.value && ((_b = (_a = currentStep.value) == null ? void 0 : _a.showArrow) != null ? _b : props.showArrow);
      }
    );
    const mergedScrollIntoViewOptions = vue.computed(
      () => {
        var _a, _b;
        return (_b = (_a = currentStep.value) == null ? void 0 : _a.scrollIntoViewOptions) != null ? _b : props.scrollIntoViewOptions;
      }
    );
    const mergedType = vue.computed(() => {
      var _a, _b;
      return (_b = (_a = currentStep.value) == null ? void 0 : _a.type) != null ? _b : props.type;
    });
    const { nextZIndex } = index$1.useZIndex();
    const nowZIndex = nextZIndex();
    const mergedZIndex = vue.computed(() => {
      var _a;
      return (_a = props.zIndex) != null ? _a : nowZIndex;
    });
    const { mergedPosInfo: pos, triggerTarget } = helper.useTarget(
      currentTarget,
      vue.toRef(props, "modelValue"),
      vue.toRef(props, "gap"),
      mergedMask,
      mergedScrollIntoViewOptions
    );
    vue.watch(
      () => props.modelValue,
      (val) => {
        if (!val) {
          current.value = 0;
        }
      }
    );
    const onEscClose = () => {
      if (props.closeOnPressEscape) {
        emit(event.UPDATE_MODEL_EVENT, false);
        emit("close", current.value);
      }
    };
    const onUpdateTotal = (val) => {
      total.value = val;
    };
    const slots = vue.useSlots();
    vue.provide(helper.tourKey, {
      currentStep,
      current,
      total,
      showClose: vue.toRef(props, "showClose"),
      closeIcon: vue.toRef(props, "closeIcon"),
      mergedType,
      ns,
      slots,
      updateModelValue(modelValue) {
        emit(event.UPDATE_MODEL_EVENT, modelValue);
      },
      onClose() {
        emit("close", current.value);
      },
      onFinish() {
        emit("finish");
      },
      onChange() {
        emit(event.CHANGE_EVENT, current.value);
      }
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        null,
        [
          vue.createVNode(vue.unref(index$2.ElTeleport), { to: __props.appendTo }, {
            default: vue.withCtx(() => {
              var _a, _b;
              return [
                vue.createElementVNode(
                  "div",
                  vue.mergeProps({ class: kls.value }, _ctx.$attrs),
                  [
                    vue.createVNode(mask_vue_vue_type_script_setup_true_lang.default, {
                      visible: mergedShowMask.value,
                      fill: (_a = mergedMaskStyle.value) == null ? void 0 : _a.color,
                      style: vue.normalizeStyle((_b = mergedMaskStyle.value) == null ? void 0 : _b.style),
                      pos: vue.unref(pos),
                      "z-index": mergedZIndex.value,
                      "target-area-clickable": __props.targetAreaClickable
                    }, null, 8, ["visible", "fill", "style", "pos", "z-index", "target-area-clickable"]),
                    __props.modelValue ? (vue.openBlock(), vue.createBlock(content_vue_vue_type_script_setup_true_lang.default, {
                      key: vue.unref(current),
                      reference: vue.unref(triggerTarget),
                      placement: mergedPlacement.value,
                      "show-arrow": mergedShowArrow.value,
                      "z-index": mergedZIndex.value,
                      style: vue.normalizeStyle(mergedContentStyle.value),
                      onClose: onEscClose
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(vue.unref(steps.default), {
                          current: vue.unref(current),
                          onUpdateTotal
                        }, {
                          default: vue.withCtx(() => [
                            vue.renderSlot(_ctx.$slots, "default")
                          ]),
                          _: 3
                          /* FORWARDED */
                        }, 8, ["current"])
                      ]),
                      _: 3
                      /* FORWARDED */
                    }, 8, ["reference", "placement", "show-arrow", "z-index", "style"])) : vue.createCommentVNode("v-if", true)
                  ],
                  16
                  /* FULL_PROPS */
                )
              ];
            }),
            _: 3
            /* FORWARDED */
          }, 8, ["to"]),
          vue.createCommentVNode(" just for IDE "),
          vue.createCommentVNode("v-if", true)
        ],
        64
        /* STABLE_FRAGMENT */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=tour.vue2.js.map
