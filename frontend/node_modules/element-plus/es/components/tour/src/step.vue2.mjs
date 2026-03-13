import { tourStepEmits, tourStepProps } from './step.mjs';
import { defineComponent, inject, watch, computed, onMounted, onBeforeUnmount, createElementBlock, openBlock, Fragment, createCommentVNode, createElementVNode, normalizeClass, unref, createVNode, withCtx, createBlock, resolveDynamicComponent, renderSlot, toDisplayString, renderList, mergeProps, createTextVNode } from 'vue';
import { omit } from 'lodash-unified';
import { ElButton } from '../../button/index.mjs';
import { ElIcon } from '../../icon/index.mjs';
import { tourKey } from './helper.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';
import { CloseComponents } from '../../../utils/vue/icon.mjs';
import { getEventCode } from '../../../utils/dom/event.mjs';
import { EVENT_CODE } from '../../../constants/aria.mjs';

const _hoisted_1 = ["aria-label"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElTourStep"
  },
  __name: "step",
  props: tourStepProps,
  emits: tourStepEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { Close } = CloseComponents;
    const { t } = useLocale();
    const {
      currentStep,
      current,
      total,
      showClose,
      closeIcon,
      mergedType,
      ns,
      slots: tourSlots,
      updateModelValue,
      onClose: tourOnClose,
      onFinish: tourOnFinish,
      onChange
    } = inject(tourKey);
    watch(
      props,
      (val) => {
        currentStep.value = val;
      },
      {
        immediate: true
      }
    );
    const mergedShowClose = computed(() => {
      var _a;
      return (_a = props.showClose) != null ? _a : showClose.value;
    });
    const mergedCloseIcon = computed(
      () => {
        var _a, _b;
        return (_b = (_a = props.closeIcon) != null ? _a : closeIcon.value) != null ? _b : Close;
      }
    );
    const filterButtonProps = (btnProps) => {
      if (!btnProps) return;
      return omit(btnProps, ["children", "onClick"]);
    };
    const onPrev = () => {
      var _a, _b;
      current.value -= 1;
      if ((_a = props.prevButtonProps) == null ? void 0 : _a.onClick) {
        (_b = props.prevButtonProps) == null ? void 0 : _b.onClick();
      }
      onChange();
    };
    const onNext = () => {
      var _a;
      if (current.value >= total.value - 1) {
        onFinish();
      } else {
        current.value += 1;
      }
      if ((_a = props.nextButtonProps) == null ? void 0 : _a.onClick) {
        props.nextButtonProps.onClick();
      }
      onChange();
    };
    const onFinish = () => {
      onClose();
      tourOnFinish();
    };
    const onClose = () => {
      updateModelValue(false);
      tourOnClose();
      emit("close");
    };
    const handleKeydown = (e) => {
      const target = e.target;
      if (target == null ? void 0 : target.isContentEditable) return;
      const code = getEventCode(e);
      switch (code) {
        case EVENT_CODE.left:
          e.preventDefault();
          current.value > 0 && onPrev();
          break;
        case EVENT_CODE.right:
          e.preventDefault();
          onNext();
          break;
      }
    };
    onMounted(() => {
      window.addEventListener("keydown", handleKeydown);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("keydown", handleKeydown);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        Fragment,
        null,
        [
          mergedShowClose.value ? (openBlock(), createElementBlock("button", {
            key: 0,
            "aria-label": unref(t)("el.tour.close"),
            class: normalizeClass(unref(ns).e("closebtn")),
            type: "button",
            onClick: onClose
          }, [
            createVNode(unref(ElIcon), {
              class: normalizeClass(unref(ns).e("close"))
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(mergedCloseIcon.value)))
              ]),
              _: 1
              /* STABLE */
            }, 8, ["class"])
          ], 10, _hoisted_1)) : createCommentVNode("v-if", true),
          createElementVNode(
            "header",
            {
              class: normalizeClass([unref(ns).e("header"), { "show-close": unref(showClose) }])
            },
            [
              renderSlot(_ctx.$slots, "header", {}, () => [
                createElementVNode(
                  "span",
                  {
                    role: "heading",
                    class: normalizeClass(unref(ns).e("title"))
                  },
                  toDisplayString(__props.title),
                  3
                  /* TEXT, CLASS */
                )
              ])
            ],
            2
            /* CLASS */
          ),
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("body"))
            },
            [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createElementVNode(
                  "span",
                  null,
                  toDisplayString(__props.description),
                  1
                  /* TEXT */
                )
              ])
            ],
            2
            /* CLASS */
          ),
          createElementVNode(
            "footer",
            {
              class: normalizeClass(unref(ns).e("footer"))
            },
            [
              createElementVNode(
                "div",
                {
                  class: normalizeClass(unref(ns).b("indicators"))
                },
                [
                  unref(tourSlots).indicators ? (openBlock(), createBlock(resolveDynamicComponent(unref(tourSlots).indicators), {
                    key: 0,
                    current: unref(current),
                    total: unref(total)
                  }, null, 8, ["current", "total"])) : (openBlock(true), createElementBlock(
                    Fragment,
                    { key: 1 },
                    renderList(unref(total), (item, index) => {
                      return openBlock(), createElementBlock(
                        "span",
                        {
                          key: item,
                          class: normalizeClass([unref(ns).b("indicator"), unref(ns).is("active", index === unref(current))])
                        },
                        null,
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
              ),
              createElementVNode(
                "div",
                {
                  class: normalizeClass(unref(ns).b("buttons"))
                },
                [
                  unref(current) > 0 ? (openBlock(), createBlock(unref(ElButton), mergeProps({
                    key: 0,
                    size: "small",
                    type: unref(mergedType)
                  }, filterButtonProps(__props.prevButtonProps), { onClick: onPrev }), {
                    default: withCtx(() => {
                      var _a, _b;
                      return [
                        createTextVNode(
                          toDisplayString((_b = (_a = __props.prevButtonProps) == null ? void 0 : _a.children) != null ? _b : unref(t)("el.tour.previous")),
                          1
                          /* TEXT */
                        )
                      ];
                    }),
                    _: 1
                    /* STABLE */
                  }, 16, ["type"])) : createCommentVNode("v-if", true),
                  unref(current) <= unref(total) - 1 ? (openBlock(), createBlock(unref(ElButton), mergeProps({
                    key: 1,
                    size: "small",
                    type: unref(mergedType) === "primary" ? "default" : "primary"
                  }, filterButtonProps(__props.nextButtonProps), { onClick: onNext }), {
                    default: withCtx(() => {
                      var _a, _b;
                      return [
                        createTextVNode(
                          toDisplayString((_b = (_a = __props.nextButtonProps) == null ? void 0 : _a.children) != null ? _b : unref(current) === unref(total) - 1 ? unref(t)("el.tour.finish") : unref(t)("el.tour.next")),
                          1
                          /* TEXT */
                        )
                      ];
                    }),
                    _: 1
                    /* STABLE */
                  }, 16, ["type"])) : createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )
        ],
        64
        /* STABLE_FRAGMENT */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=step.vue2.mjs.map
