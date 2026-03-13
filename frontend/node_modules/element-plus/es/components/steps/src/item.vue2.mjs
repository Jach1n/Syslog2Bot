import { stepProps } from './item.mjs';
import { defineComponent, ref, inject, getCurrentInstance, onMounted, watch, computed, onBeforeUnmount, createElementBlock, openBlock, normalizeClass, normalizeStyle, createCommentVNode, createElementVNode, unref, renderSlot, createBlock, withCtx, resolveDynamicComponent, createVNode, toDisplayString, createTextVNode } from 'vue';
import { ElIcon } from '../../icon/index.mjs';
import { Check, Close } from '@element-plus/icons-vue';
import { STEPS_INJECTION_KEY } from './tokens.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { isNumber } from '../../../utils/types.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElStep"
  },
  __name: "item",
  props: stepProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("step");
    const index = ref(-1);
    const lineStyle = ref({});
    const internalStatus = ref("");
    const parent = inject(STEPS_INJECTION_KEY);
    const currentInstance = getCurrentInstance();
    let stepDiff = 0;
    let beforeActive = 0;
    onMounted(() => {
      watch(
        [
          () => parent.props.active,
          () => parent.props.processStatus,
          () => parent.props.finishStatus
        ],
        ([active], [oldActive]) => {
          beforeActive = oldActive || 0;
          stepDiff = active - beforeActive;
          updateStatus(active);
        },
        { immediate: true }
      );
    });
    const currentStatus = computed(() => {
      return props.status || internalStatus.value;
    });
    const prevInternalStatus = computed(() => {
      const prevStep = parent.steps.value[index.value - 1];
      return prevStep ? prevStep.internalStatus.value : "wait";
    });
    const isCenter = computed(() => {
      return parent.props.alignCenter;
    });
    const isVertical = computed(() => {
      return parent.props.direction === "vertical";
    });
    const isSimple = computed(() => {
      return parent.props.simple;
    });
    const stepsCount = computed(() => {
      return parent.steps.value.length;
    });
    const isLast = computed(() => {
      var _a;
      return ((_a = parent.steps.value[stepsCount.value - 1]) == null ? void 0 : _a.uid) === currentInstance.uid;
    });
    const space = computed(() => {
      return isSimple.value ? "" : parent.props.space;
    });
    const containerKls = computed(() => {
      return [
        ns.b(),
        ns.is(isSimple.value ? "simple" : parent.props.direction),
        ns.is("flex", isLast.value && !space.value && !isCenter.value),
        ns.is("center", isCenter.value && !isVertical.value && !isSimple.value)
      ];
    });
    const style = computed(() => {
      const style2 = {
        flexBasis: isNumber(space.value) ? `${space.value}px` : space.value ? space.value : `${100 / (stepsCount.value - (isCenter.value ? 0 : 1))}%`
      };
      if (isVertical.value) return style2;
      if (isLast.value) {
        style2.maxWidth = `${100 / stepsCount.value}%`;
      }
      return style2;
    });
    const setIndex = (val) => {
      index.value = val;
    };
    const calcProgress = (status) => {
      const isWait = status === "wait";
      const delayTimer = Math.abs(stepDiff) === 1 ? 0 : stepDiff > 0 ? (index.value + 1 - beforeActive) * 150 : -(index.value + 1 - parent.props.active) * 150;
      const style2 = {
        transitionDelay: `${delayTimer}ms`
      };
      const step = status === parent.props.processStatus || isWait ? 0 : 100;
      style2.borderWidth = step && !isSimple.value ? "1px" : 0;
      style2[parent.props.direction === "vertical" ? "height" : "width"] = `${step}%`;
      lineStyle.value = style2;
    };
    const updateStatus = (activeIndex) => {
      if (activeIndex > index.value) {
        internalStatus.value = parent.props.finishStatus;
      } else if (activeIndex === index.value && prevInternalStatus.value !== "error") {
        internalStatus.value = parent.props.processStatus;
      } else {
        internalStatus.value = "wait";
      }
      const prevChild = parent.steps.value[index.value - 1];
      if (prevChild) prevChild.calcProgress(internalStatus.value);
    };
    const stepItemState = {
      uid: currentInstance.uid,
      getVnode: () => currentInstance.vnode,
      currentStatus,
      internalStatus,
      setIndex,
      calcProgress
    };
    parent.addStep(stepItemState);
    onBeforeUnmount(() => {
      parent.removeStep(stepItemState);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          style: normalizeStyle(style.value),
          class: normalizeClass(containerKls.value)
        },
        [
          createCommentVNode(" icon & line "),
          createElementVNode(
            "div",
            {
              class: normalizeClass([unref(ns).e("head"), unref(ns).is(currentStatus.value)])
            },
            [
              !isSimple.value ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  class: normalizeClass(unref(ns).e("line"))
                },
                [
                  createElementVNode(
                    "i",
                    {
                      class: normalizeClass(unref(ns).e("line-inner")),
                      style: normalizeStyle(lineStyle.value)
                    },
                    null,
                    6
                    /* CLASS, STYLE */
                  )
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true),
              createElementVNode(
                "div",
                {
                  class: normalizeClass([unref(ns).e("icon"), unref(ns).is(__props.icon || _ctx.$slots.icon ? "icon" : "text")])
                },
                [
                  renderSlot(_ctx.$slots, "icon", {}, () => [
                    __props.icon ? (openBlock(), createBlock(unref(ElIcon), {
                      key: 0,
                      class: normalizeClass(unref(ns).e("icon-inner"))
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(__props.icon)))
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["class"])) : currentStatus.value === "success" ? (openBlock(), createBlock(unref(ElIcon), {
                      key: 1,
                      class: normalizeClass([unref(ns).e("icon-inner"), unref(ns).is("status")])
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Check))
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["class"])) : currentStatus.value === "error" ? (openBlock(), createBlock(unref(ElIcon), {
                      key: 2,
                      class: normalizeClass([unref(ns).e("icon-inner"), unref(ns).is("status")])
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Close))
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["class"])) : !isSimple.value ? (openBlock(), createElementBlock(
                      "div",
                      {
                        key: 3,
                        class: normalizeClass(unref(ns).e("icon-inner"))
                      },
                      toDisplayString(index.value + 1),
                      3
                      /* TEXT, CLASS */
                    )) : createCommentVNode("v-if", true)
                  ])
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ),
          createCommentVNode(" title & description "),
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("main"))
            },
            [
              createElementVNode(
                "div",
                {
                  class: normalizeClass([unref(ns).e("title"), unref(ns).is(currentStatus.value)])
                },
                [
                  renderSlot(_ctx.$slots, "title", {}, () => [
                    createTextVNode(
                      toDisplayString(__props.title),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              ),
              isSimple.value ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  class: normalizeClass(unref(ns).e("arrow"))
                },
                null,
                2
                /* CLASS */
              )) : (openBlock(), createElementBlock(
                "div",
                {
                  key: 1,
                  class: normalizeClass([unref(ns).e("description"), unref(ns).is(currentStatus.value)])
                },
                [
                  renderSlot(_ctx.$slots, "description", {}, () => [
                    createTextVNode(
                      toDisplayString(__props.description),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              ))
            ],
            2
            /* CLASS */
          )
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=item.vue2.mjs.map
