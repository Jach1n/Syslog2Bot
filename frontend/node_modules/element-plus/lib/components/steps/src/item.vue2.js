'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var item = require('./item.js');
var vue = require('vue');
var index$1 = require('../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var tokens = require('./tokens.js');
var index = require('../../../hooks/use-namespace/index.js');
var types = require('../../../utils/types.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElStep"
  },
  __name: "item",
  props: item.stepProps,
  setup(__props) {
    const props = __props;
    const ns = index.useNamespace("step");
    const index$2 = vue.ref(-1);
    const lineStyle = vue.ref({});
    const internalStatus = vue.ref("");
    const parent = vue.inject(tokens.STEPS_INJECTION_KEY);
    const currentInstance = vue.getCurrentInstance();
    let stepDiff = 0;
    let beforeActive = 0;
    vue.onMounted(() => {
      vue.watch(
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
    const currentStatus = vue.computed(() => {
      return props.status || internalStatus.value;
    });
    const prevInternalStatus = vue.computed(() => {
      const prevStep = parent.steps.value[index$2.value - 1];
      return prevStep ? prevStep.internalStatus.value : "wait";
    });
    const isCenter = vue.computed(() => {
      return parent.props.alignCenter;
    });
    const isVertical = vue.computed(() => {
      return parent.props.direction === "vertical";
    });
    const isSimple = vue.computed(() => {
      return parent.props.simple;
    });
    const stepsCount = vue.computed(() => {
      return parent.steps.value.length;
    });
    const isLast = vue.computed(() => {
      var _a;
      return ((_a = parent.steps.value[stepsCount.value - 1]) == null ? void 0 : _a.uid) === currentInstance.uid;
    });
    const space = vue.computed(() => {
      return isSimple.value ? "" : parent.props.space;
    });
    const containerKls = vue.computed(() => {
      return [
        ns.b(),
        ns.is(isSimple.value ? "simple" : parent.props.direction),
        ns.is("flex", isLast.value && !space.value && !isCenter.value),
        ns.is("center", isCenter.value && !isVertical.value && !isSimple.value)
      ];
    });
    const style = vue.computed(() => {
      const style2 = {
        flexBasis: types.isNumber(space.value) ? `${space.value}px` : space.value ? space.value : `${100 / (stepsCount.value - (isCenter.value ? 0 : 1))}%`
      };
      if (isVertical.value) return style2;
      if (isLast.value) {
        style2.maxWidth = `${100 / stepsCount.value}%`;
      }
      return style2;
    });
    const setIndex = (val) => {
      index$2.value = val;
    };
    const calcProgress = (status) => {
      const isWait = status === "wait";
      const delayTimer = Math.abs(stepDiff) === 1 ? 0 : stepDiff > 0 ? (index$2.value + 1 - beforeActive) * 150 : -(index$2.value + 1 - parent.props.active) * 150;
      const style2 = {
        transitionDelay: `${delayTimer}ms`
      };
      const step = status === parent.props.processStatus || isWait ? 0 : 100;
      style2.borderWidth = step && !isSimple.value ? "1px" : 0;
      style2[parent.props.direction === "vertical" ? "height" : "width"] = `${step}%`;
      lineStyle.value = style2;
    };
    const updateStatus = (activeIndex) => {
      if (activeIndex > index$2.value) {
        internalStatus.value = parent.props.finishStatus;
      } else if (activeIndex === index$2.value && prevInternalStatus.value !== "error") {
        internalStatus.value = parent.props.processStatus;
      } else {
        internalStatus.value = "wait";
      }
      const prevChild = parent.steps.value[index$2.value - 1];
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
    vue.onBeforeUnmount(() => {
      parent.removeStep(stepItemState);
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          style: vue.normalizeStyle(style.value),
          class: vue.normalizeClass(containerKls.value)
        },
        [
          vue.createCommentVNode(" icon & line "),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass([vue.unref(ns).e("head"), vue.unref(ns).is(currentStatus.value)])
            },
            [
              !isSimple.value ? (vue.openBlock(), vue.createElementBlock(
                "div",
                {
                  key: 0,
                  class: vue.normalizeClass(vue.unref(ns).e("line"))
                },
                [
                  vue.createElementVNode(
                    "i",
                    {
                      class: vue.normalizeClass(vue.unref(ns).e("line-inner")),
                      style: vue.normalizeStyle(lineStyle.value)
                    },
                    null,
                    6
                    /* CLASS, STYLE */
                  )
                ],
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass([vue.unref(ns).e("icon"), vue.unref(ns).is(__props.icon || _ctx.$slots.icon ? "icon" : "text")])
                },
                [
                  vue.renderSlot(_ctx.$slots, "icon", {}, () => [
                    __props.icon ? (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElIcon), {
                      key: 0,
                      class: vue.normalizeClass(vue.unref(ns).e("icon-inner"))
                    }, {
                      default: vue.withCtx(() => [
                        (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.icon)))
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["class"])) : currentStatus.value === "success" ? (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElIcon), {
                      key: 1,
                      class: vue.normalizeClass([vue.unref(ns).e("icon-inner"), vue.unref(ns).is("status")])
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(vue.unref(iconsVue.Check))
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["class"])) : currentStatus.value === "error" ? (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElIcon), {
                      key: 2,
                      class: vue.normalizeClass([vue.unref(ns).e("icon-inner"), vue.unref(ns).is("status")])
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(vue.unref(iconsVue.Close))
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["class"])) : !isSimple.value ? (vue.openBlock(), vue.createElementBlock(
                      "div",
                      {
                        key: 3,
                        class: vue.normalizeClass(vue.unref(ns).e("icon-inner"))
                      },
                      vue.toDisplayString(index$2.value + 1),
                      3
                      /* TEXT, CLASS */
                    )) : vue.createCommentVNode("v-if", true)
                  ])
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ),
          vue.createCommentVNode(" title & description "),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(vue.unref(ns).e("main"))
            },
            [
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass([vue.unref(ns).e("title"), vue.unref(ns).is(currentStatus.value)])
                },
                [
                  vue.renderSlot(_ctx.$slots, "title", {}, () => [
                    vue.createTextVNode(
                      vue.toDisplayString(__props.title),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              ),
              isSimple.value ? (vue.openBlock(), vue.createElementBlock(
                "div",
                {
                  key: 0,
                  class: vue.normalizeClass(vue.unref(ns).e("arrow"))
                },
                null,
                2
                /* CLASS */
              )) : (vue.openBlock(), vue.createElementBlock(
                "div",
                {
                  key: 1,
                  class: vue.normalizeClass([vue.unref(ns).e("description"), vue.unref(ns).is(currentStatus.value)])
                },
                [
                  vue.renderSlot(_ctx.$slots, "description", {}, () => [
                    vue.createTextVNode(
                      vue.toDisplayString(__props.description),
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

exports.default = _sfc_main;
//# sourceMappingURL=item.vue2.js.map
