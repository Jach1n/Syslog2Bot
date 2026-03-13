'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var step = require('./step.js');
var vue = require('vue');
var lodashUnified = require('lodash-unified');
var index$2 = require('../../button/index.js');
var index$1 = require('../../icon/index.js');
var helper = require('./helper.js');
var index = require('../../../hooks/use-locale/index.js');
var icon = require('../../../utils/vue/icon.js');
var event = require('../../../utils/dom/event.js');
var aria = require('../../../constants/aria.js');

const _hoisted_1 = ["aria-label"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElTourStep"
  },
  __name: "step",
  props: step.tourStepProps,
  emits: step.tourStepEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { Close } = icon.CloseComponents;
    const { t } = index.useLocale();
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
    } = vue.inject(helper.tourKey);
    vue.watch(
      props,
      (val) => {
        currentStep.value = val;
      },
      {
        immediate: true
      }
    );
    const mergedShowClose = vue.computed(() => {
      var _a;
      return (_a = props.showClose) != null ? _a : showClose.value;
    });
    const mergedCloseIcon = vue.computed(
      () => {
        var _a, _b;
        return (_b = (_a = props.closeIcon) != null ? _a : closeIcon.value) != null ? _b : Close;
      }
    );
    const filterButtonProps = (btnProps) => {
      if (!btnProps) return;
      return lodashUnified.omit(btnProps, ["children", "onClick"]);
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
      const code = event.getEventCode(e);
      switch (code) {
        case aria.EVENT_CODE.left:
          e.preventDefault();
          current.value > 0 && onPrev();
          break;
        case aria.EVENT_CODE.right:
          e.preventDefault();
          onNext();
          break;
      }
    };
    vue.onMounted(() => {
      window.addEventListener("keydown", handleKeydown);
    });
    vue.onBeforeUnmount(() => {
      window.removeEventListener("keydown", handleKeydown);
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        null,
        [
          mergedShowClose.value ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 0,
            "aria-label": vue.unref(t)("el.tour.close"),
            class: vue.normalizeClass(vue.unref(ns).e("closebtn")),
            type: "button",
            onClick: onClose
          }, [
            vue.createVNode(vue.unref(index$1.ElIcon), {
              class: vue.normalizeClass(vue.unref(ns).e("close"))
            }, {
              default: vue.withCtx(() => [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(mergedCloseIcon.value)))
              ]),
              _: 1
              /* STABLE */
            }, 8, ["class"])
          ], 10, _hoisted_1)) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "header",
            {
              class: vue.normalizeClass([vue.unref(ns).e("header"), { "show-close": vue.unref(showClose) }])
            },
            [
              vue.renderSlot(_ctx.$slots, "header", {}, () => [
                vue.createElementVNode(
                  "span",
                  {
                    role: "heading",
                    class: vue.normalizeClass(vue.unref(ns).e("title"))
                  },
                  vue.toDisplayString(__props.title),
                  3
                  /* TEXT, CLASS */
                )
              ])
            ],
            2
            /* CLASS */
          ),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(vue.unref(ns).e("body"))
            },
            [
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                vue.createElementVNode(
                  "span",
                  null,
                  vue.toDisplayString(__props.description),
                  1
                  /* TEXT */
                )
              ])
            ],
            2
            /* CLASS */
          ),
          vue.createElementVNode(
            "footer",
            {
              class: vue.normalizeClass(vue.unref(ns).e("footer"))
            },
            [
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(vue.unref(ns).b("indicators"))
                },
                [
                  vue.unref(tourSlots).indicators ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(tourSlots).indicators), {
                    key: 0,
                    current: vue.unref(current),
                    total: vue.unref(total)
                  }, null, 8, ["current", "total"])) : (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    { key: 1 },
                    vue.renderList(vue.unref(total), (item, index) => {
                      return vue.openBlock(), vue.createElementBlock(
                        "span",
                        {
                          key: item,
                          class: vue.normalizeClass([vue.unref(ns).b("indicator"), vue.unref(ns).is("active", index === vue.unref(current))])
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
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(vue.unref(ns).b("buttons"))
                },
                [
                  vue.unref(current) > 0 ? (vue.openBlock(), vue.createBlock(vue.unref(index$2.ElButton), vue.mergeProps({
                    key: 0,
                    size: "small",
                    type: vue.unref(mergedType)
                  }, filterButtonProps(__props.prevButtonProps), { onClick: onPrev }), {
                    default: vue.withCtx(() => {
                      var _a, _b;
                      return [
                        vue.createTextVNode(
                          vue.toDisplayString((_b = (_a = __props.prevButtonProps) == null ? void 0 : _a.children) != null ? _b : vue.unref(t)("el.tour.previous")),
                          1
                          /* TEXT */
                        )
                      ];
                    }),
                    _: 1
                    /* STABLE */
                  }, 16, ["type"])) : vue.createCommentVNode("v-if", true),
                  vue.unref(current) <= vue.unref(total) - 1 ? (vue.openBlock(), vue.createBlock(vue.unref(index$2.ElButton), vue.mergeProps({
                    key: 1,
                    size: "small",
                    type: vue.unref(mergedType) === "primary" ? "default" : "primary"
                  }, filterButtonProps(__props.nextButtonProps), { onClick: onNext }), {
                    default: vue.withCtx(() => {
                      var _a, _b;
                      return [
                        vue.createTextVNode(
                          vue.toDisplayString((_b = (_a = __props.nextButtonProps) == null ? void 0 : _a.children) != null ? _b : vue.unref(current) === vue.unref(total) - 1 ? vue.unref(t)("el.tour.finish") : vue.unref(t)("el.tour.next")),
                          1
                          /* TEXT */
                        )
                      ];
                    }),
                    _: 1
                    /* STABLE */
                  }, 16, ["type"])) : vue.createCommentVNode("v-if", true)
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

exports.default = _sfc_main;
//# sourceMappingURL=step.vue2.js.map
