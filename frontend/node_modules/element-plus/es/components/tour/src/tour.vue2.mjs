import { tourEmits, tourProps } from './tour.mjs';
import { defineComponent, ref, computed, toRef, watch, useSlots, provide, createElementBlock, openBlock, Fragment, createVNode, createCommentVNode, unref, withCtx, createElementVNode, mergeProps, createBlock, normalizeStyle, renderSlot } from 'vue';
import { useVModel } from '@vueuse/core';
import { ElTeleport } from '../../teleport/index.mjs';
import _sfc_main$1 from './mask.vue2.mjs';
import _sfc_main$2 from './content.vue2.mjs';
import ElTourSteps from './steps.mjs';
import { useTarget, tourKey } from './helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { isBoolean } from '../../../utils/types.mjs';
import { useZIndex } from '../../../hooks/use-z-index/index.mjs';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants/event.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElTour",
    inheritAttrs: false
  },
  __name: "tour",
  props: tourProps,
  emits: tourEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("tour");
    const total = ref(0);
    const currentStep = ref();
    const current = useVModel(props, "current", emit, {
      passive: true
    });
    const currentTarget = computed(() => {
      var _a;
      return (_a = currentStep.value) == null ? void 0 : _a.target;
    });
    const kls = computed(() => [
      ns.b(),
      mergedType.value === "primary" ? ns.m("primary") : ""
    ]);
    const mergedPlacement = computed(
      () => {
        var _a;
        return ((_a = currentStep.value) == null ? void 0 : _a.placement) || props.placement;
      }
    );
    const mergedContentStyle = computed(
      () => {
        var _a, _b;
        return (_b = (_a = currentStep.value) == null ? void 0 : _a.contentStyle) != null ? _b : props.contentStyle;
      }
    );
    const mergedMask = computed(() => {
      var _a, _b;
      return (_b = (_a = currentStep.value) == null ? void 0 : _a.mask) != null ? _b : props.mask;
    });
    const mergedShowMask = computed(() => !!mergedMask.value && props.modelValue);
    const mergedMaskStyle = computed(
      () => isBoolean(mergedMask.value) ? void 0 : mergedMask.value
    );
    const mergedShowArrow = computed(
      () => {
        var _a, _b;
        return !!currentTarget.value && ((_b = (_a = currentStep.value) == null ? void 0 : _a.showArrow) != null ? _b : props.showArrow);
      }
    );
    const mergedScrollIntoViewOptions = computed(
      () => {
        var _a, _b;
        return (_b = (_a = currentStep.value) == null ? void 0 : _a.scrollIntoViewOptions) != null ? _b : props.scrollIntoViewOptions;
      }
    );
    const mergedType = computed(() => {
      var _a, _b;
      return (_b = (_a = currentStep.value) == null ? void 0 : _a.type) != null ? _b : props.type;
    });
    const { nextZIndex } = useZIndex();
    const nowZIndex = nextZIndex();
    const mergedZIndex = computed(() => {
      var _a;
      return (_a = props.zIndex) != null ? _a : nowZIndex;
    });
    const { mergedPosInfo: pos, triggerTarget } = useTarget(
      currentTarget,
      toRef(props, "modelValue"),
      toRef(props, "gap"),
      mergedMask,
      mergedScrollIntoViewOptions
    );
    watch(
      () => props.modelValue,
      (val) => {
        if (!val) {
          current.value = 0;
        }
      }
    );
    const onEscClose = () => {
      if (props.closeOnPressEscape) {
        emit(UPDATE_MODEL_EVENT, false);
        emit("close", current.value);
      }
    };
    const onUpdateTotal = (val) => {
      total.value = val;
    };
    const slots = useSlots();
    provide(tourKey, {
      currentStep,
      current,
      total,
      showClose: toRef(props, "showClose"),
      closeIcon: toRef(props, "closeIcon"),
      mergedType,
      ns,
      slots,
      updateModelValue(modelValue) {
        emit(UPDATE_MODEL_EVENT, modelValue);
      },
      onClose() {
        emit("close", current.value);
      },
      onFinish() {
        emit("finish");
      },
      onChange() {
        emit(CHANGE_EVENT, current.value);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        Fragment,
        null,
        [
          createVNode(unref(ElTeleport), { to: __props.appendTo }, {
            default: withCtx(() => {
              var _a, _b;
              return [
                createElementVNode(
                  "div",
                  mergeProps({ class: kls.value }, _ctx.$attrs),
                  [
                    createVNode(_sfc_main$1, {
                      visible: mergedShowMask.value,
                      fill: (_a = mergedMaskStyle.value) == null ? void 0 : _a.color,
                      style: normalizeStyle((_b = mergedMaskStyle.value) == null ? void 0 : _b.style),
                      pos: unref(pos),
                      "z-index": mergedZIndex.value,
                      "target-area-clickable": __props.targetAreaClickable
                    }, null, 8, ["visible", "fill", "style", "pos", "z-index", "target-area-clickable"]),
                    __props.modelValue ? (openBlock(), createBlock(_sfc_main$2, {
                      key: unref(current),
                      reference: unref(triggerTarget),
                      placement: mergedPlacement.value,
                      "show-arrow": mergedShowArrow.value,
                      "z-index": mergedZIndex.value,
                      style: normalizeStyle(mergedContentStyle.value),
                      onClose: onEscClose
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ElTourSteps), {
                          current: unref(current),
                          onUpdateTotal
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "default")
                          ]),
                          _: 3
                          /* FORWARDED */
                        }, 8, ["current"])
                      ]),
                      _: 3
                      /* FORWARDED */
                    }, 8, ["reference", "placement", "show-arrow", "z-index", "style"])) : createCommentVNode("v-if", true)
                  ],
                  16
                  /* FULL_PROPS */
                )
              ];
            }),
            _: 3
            /* FORWARDED */
          }, 8, ["to"]),
          createCommentVNode(" just for IDE "),
          createCommentVNode("v-if", true)
        ],
        64
        /* STABLE_FRAGMENT */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=tour.vue2.mjs.map
