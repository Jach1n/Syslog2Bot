'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var popconfirm = require('./popconfirm.js');
var vue = require('vue');
var index$4 = require('../../button/index.js');
var index$3 = require('../../icon/index.js');
var index$2 = require('../../tooltip/index.js');
var index = require('../../../hooks/use-locale/index.js');
var index$1 = require('../../../hooks/use-namespace/index.js');
var style = require('../../../utils/dom/style.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElPopconfirm"
  },
  __name: "popconfirm",
  props: popconfirm.popconfirmProps,
  emits: popconfirm.popconfirmEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = index.useLocale();
    const ns = index$1.useNamespace("popconfirm");
    const tooltipRef = vue.ref();
    const rootRef = vue.ref();
    const popperRef = vue.computed(() => {
      var _a;
      return (_a = vue.unref(tooltipRef)) == null ? void 0 : _a.popperRef;
    });
    const showPopper = () => {
      var _a, _b;
      (_b = (_a = rootRef.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    };
    const hidePopper = () => {
      var _a, _b;
      (_b = (_a = tooltipRef.value) == null ? void 0 : _a.onClose) == null ? void 0 : _b.call(_a);
    };
    const style$1 = vue.computed(() => {
      return {
        width: style.addUnit(props.width)
      };
    });
    const confirm = (e) => {
      emit("confirm", e);
      hidePopper();
    };
    const cancel = (e) => {
      emit("cancel", e);
      hidePopper();
    };
    const finalConfirmButtonText = vue.computed(
      () => props.confirmButtonText || t("el.popconfirm.confirmButtonText")
    );
    const finalCancelButtonText = vue.computed(
      () => props.cancelButtonText || t("el.popconfirm.cancelButtonText")
    );
    __expose({
      popperRef,
      hide: hidePopper
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(index$2.ElTooltip), vue.mergeProps({
        ref_key: "tooltipRef",
        ref: tooltipRef,
        trigger: "click",
        effect: __props.effect
      }, _ctx.$attrs, {
        "virtual-triggering": __props.virtualTriggering,
        "virtual-ref": __props.virtualRef,
        "popper-class": `${vue.unref(ns).namespace.value}-popover`,
        "popper-style": style$1.value,
        teleported: __props.teleported,
        "fallback-placements": ["bottom", "top", "right", "left"],
        "hide-after": __props.hideAfter,
        persistent: __props.persistent,
        loop: "",
        onShow: showPopper
      }), {
        content: vue.withCtx(() => [
          vue.createElementVNode(
            "div",
            {
              ref_key: "rootRef",
              ref: rootRef,
              tabindex: "-1",
              class: vue.normalizeClass(vue.unref(ns).b())
            },
            [
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(vue.unref(ns).e("main"))
                },
                [
                  !__props.hideIcon && __props.icon ? (vue.openBlock(), vue.createBlock(vue.unref(index$3.ElIcon), {
                    key: 0,
                    class: vue.normalizeClass(vue.unref(ns).e("icon")),
                    style: vue.normalizeStyle({ color: __props.iconColor })
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.icon)))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["class", "style"])) : vue.createCommentVNode("v-if", true),
                  vue.createTextVNode(
                    " " + vue.toDisplayString(__props.title),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(vue.unref(ns).e("action"))
                },
                [
                  vue.renderSlot(_ctx.$slots, "actions", {
                    confirm,
                    cancel
                  }, () => [
                    vue.createVNode(vue.unref(index$4.ElButton), {
                      size: "small",
                      type: __props.cancelButtonType === "text" ? "" : __props.cancelButtonType,
                      text: __props.cancelButtonType === "text",
                      onClick: cancel
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode(
                          vue.toDisplayString(finalCancelButtonText.value),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["type", "text"]),
                    vue.createVNode(vue.unref(index$4.ElButton), {
                      size: "small",
                      type: __props.confirmButtonType === "text" ? "" : __props.confirmButtonType,
                      text: __props.confirmButtonType === "text",
                      onClick: confirm
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode(
                          vue.toDisplayString(finalConfirmButtonText.value),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["type", "text"])
                  ])
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )
        ]),
        default: vue.withCtx(() => [
          _ctx.$slots.reference ? vue.renderSlot(_ctx.$slots, "reference", { key: 0 }) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["effect", "virtual-triggering", "virtual-ref", "popper-class", "popper-style", "teleported", "hide-after", "persistent"]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=popconfirm.vue2.js.map
