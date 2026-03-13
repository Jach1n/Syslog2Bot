'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dialogContent = require('./dialog-content.js');
var vue = require('vue');
var index$2 = require('../../icon/index.js');
var constants = require('./constants.js');
var tokens = require('../../focus-trap/src/tokens.js');
var refs = require('../../../utils/vue/refs.js');
var index$1 = require('../../../hooks/use-draggable/index.js');
var icon = require('../../../utils/vue/icon.js');
var index = require('../../../hooks/use-locale/index.js');

const _hoisted_1 = ["aria-level"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = ["id"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{ name: "ElDialogContent" },
  __name: "dialog-content",
  props: dialogContent.dialogContentProps,
  emits: dialogContent.dialogContentEmits,
  setup(__props, { expose: __expose }) {
    const { t } = index.useLocale();
    const { Close } = icon.CloseComponents;
    const props = __props;
    const { dialogRef, headerRef, bodyId, ns, style } = vue.inject(constants.dialogInjectionKey);
    const { focusTrapRef } = vue.inject(tokens.FOCUS_TRAP_INJECTION_KEY);
    const composedDialogRef = refs.composeRefs(focusTrapRef, dialogRef);
    const draggable = vue.computed(() => !!props.draggable);
    const overflow = vue.computed(() => !!props.overflow);
    const { resetPosition, updatePosition, isDragging } = index$1.useDraggable(
      dialogRef,
      headerRef,
      draggable,
      overflow
    );
    const dialogKls = vue.computed(() => [
      ns.b(),
      ns.is("fullscreen", props.fullscreen),
      ns.is("draggable", draggable.value),
      ns.is("dragging", isDragging.value),
      ns.is("align-center", !!props.alignCenter),
      { [ns.m("center")]: props.center }
    ]);
    __expose({
      resetPosition,
      updatePosition
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          ref: vue.unref(composedDialogRef),
          class: vue.normalizeClass(dialogKls.value),
          style: vue.normalizeStyle(vue.unref(style)),
          tabindex: "-1"
        },
        [
          vue.createElementVNode(
            "header",
            {
              ref_key: "headerRef",
              ref: headerRef,
              class: vue.normalizeClass([vue.unref(ns).e("header"), __props.headerClass, { "show-close": __props.showClose }])
            },
            [
              vue.renderSlot(_ctx.$slots, "header", {}, () => [
                vue.createElementVNode("span", {
                  role: "heading",
                  "aria-level": __props.ariaLevel,
                  class: vue.normalizeClass(vue.unref(ns).e("title"))
                }, vue.toDisplayString(__props.title), 11, _hoisted_1)
              ]),
              __props.showClose ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 0,
                "aria-label": vue.unref(t)("el.dialog.close"),
                class: vue.normalizeClass(vue.unref(ns).e("headerbtn")),
                type: "button",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
              }, [
                vue.createVNode(vue.unref(index$2.ElIcon), {
                  class: vue.normalizeClass(vue.unref(ns).e("close"))
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.closeIcon || vue.unref(Close))))
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["class"])
              ], 10, _hoisted_2)) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          ),
          vue.createElementVNode("div", {
            id: vue.unref(bodyId),
            class: vue.normalizeClass([vue.unref(ns).e("body"), __props.bodyClass])
          }, [
            vue.renderSlot(_ctx.$slots, "default")
          ], 10, _hoisted_3),
          _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock(
            "footer",
            {
              key: 0,
              class: vue.normalizeClass([vue.unref(ns).e("footer"), __props.footerClass])
            },
            [
              vue.renderSlot(_ctx.$slots, "footer")
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=dialog-content.vue2.js.map
