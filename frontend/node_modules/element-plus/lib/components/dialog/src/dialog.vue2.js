'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dialog = require('./dialog.js');
var vue = require('vue');
var index$3 = require('../../overlay/index.js');
var focusTrap = require('../../focus-trap/src/focus-trap.vue.js');
var index$2 = require('../../teleport/index.js');
var dialogContent_vue_vue_type_script_setup_true_lang = require('./dialog-content.vue2.js');
var constants = require('./constants.js');
var useDialog = require('./use-dialog.js');
var index = require('../../../hooks/use-deprecated/index.js');
var index$1 = require('../../../hooks/use-namespace/index.js');
var index$4 = require('../../../hooks/use-same-target/index.js');

const _hoisted_1 = ["aria-label", "aria-labelledby", "aria-describedby"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElDialog",
    inheritAttrs: false
  },
  __name: "dialog",
  props: dialog.dialogProps,
  emits: dialog.dialogEmits,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const slots = vue.useSlots();
    index.useDeprecated(
      {
        scope: "el-dialog",
        from: "the title slot",
        replacement: "the header slot",
        version: "3.0.0",
        ref: "https://element-plus.org/en-US/component/dialog.html#slots"
      },
      vue.computed(() => !!slots.title)
    );
    const ns = index$1.useNamespace("dialog");
    const dialogRef = vue.ref();
    const headerRef = vue.ref();
    const dialogContentRef = vue.ref();
    const {
      visible,
      titleId,
      bodyId,
      style,
      overlayDialogStyle,
      rendered,
      transitionConfig,
      zIndex,
      _draggable,
      _alignCenter,
      _overflow,
      handleClose,
      onModalClick,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onCloseRequested,
      onFocusoutPrevented,
      closing
    } = useDialog.useDialog(props, dialogRef);
    vue.provide(constants.dialogInjectionKey, {
      dialogRef,
      headerRef,
      bodyId,
      ns,
      rendered,
      style
    });
    const overlayEvent = index$4.useSameTarget(onModalClick);
    const penetrable = vue.computed(
      () => props.modalPenetrable && !props.modal && !props.fullscreen
    );
    const resetPosition = () => {
      var _a;
      (_a = dialogContentRef.value) == null ? void 0 : _a.resetPosition();
    };
    __expose({
      /** @description whether the dialog is visible */
      visible,
      dialogContentRef,
      resetPosition,
      handleClose
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(index$2.ElTeleport), {
        to: __props.appendTo,
        disabled: __props.appendTo !== "body" ? false : !__props.appendToBody
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(
            vue.Transition,
            vue.mergeProps(vue.unref(transitionConfig), { persisted: "" }),
            {
              default: vue.withCtx(() => {
                var _a;
                return [
                  vue.withDirectives(vue.createVNode(vue.unref(index$3.ElOverlay), {
                    "custom-mask-event": "",
                    mask: __props.modal,
                    "overlay-class": [
                      (_a = __props.modalClass) != null ? _a : "",
                      `${vue.unref(ns).namespace.value}-modal-dialog`,
                      vue.unref(ns).is("penetrable", penetrable.value)
                    ],
                    "z-index": vue.unref(zIndex)
                  }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("div", {
                        role: "dialog",
                        "aria-modal": "true",
                        "aria-label": __props.title || void 0,
                        "aria-labelledby": !__props.title ? vue.unref(titleId) : void 0,
                        "aria-describedby": vue.unref(bodyId),
                        class: vue.normalizeClass([
                          `${vue.unref(ns).namespace.value}-overlay-dialog`,
                          vue.unref(ns).is("closing", vue.unref(closing))
                        ]),
                        style: vue.normalizeStyle(vue.unref(overlayDialogStyle)),
                        onClick: _cache[0] || (_cache[0] = //@ts-ignore
                        (...args) => vue.unref(overlayEvent).onClick && vue.unref(overlayEvent).onClick(...args)),
                        onMousedown: _cache[1] || (_cache[1] = //@ts-ignore
                        (...args) => vue.unref(overlayEvent).onMousedown && vue.unref(overlayEvent).onMousedown(...args)),
                        onMouseup: _cache[2] || (_cache[2] = //@ts-ignore
                        (...args) => vue.unref(overlayEvent).onMouseup && vue.unref(overlayEvent).onMouseup(...args))
                      }, [
                        vue.createVNode(vue.unref(focusTrap.default), {
                          loop: "",
                          trapped: vue.unref(visible),
                          "focus-start-el": "container",
                          onFocusAfterTrapped: vue.unref(onOpenAutoFocus),
                          onFocusAfterReleased: vue.unref(onCloseAutoFocus),
                          onFocusoutPrevented: vue.unref(onFocusoutPrevented),
                          onReleaseRequested: vue.unref(onCloseRequested)
                        }, {
                          default: vue.withCtx(() => [
                            vue.unref(rendered) ? (vue.openBlock(), vue.createBlock(dialogContent_vue_vue_type_script_setup_true_lang.default, vue.mergeProps({
                              key: 0,
                              ref_key: "dialogContentRef",
                              ref: dialogContentRef
                            }, _ctx.$attrs, {
                              center: __props.center,
                              "align-center": vue.unref(_alignCenter),
                              "close-icon": __props.closeIcon,
                              draggable: vue.unref(_draggable),
                              overflow: vue.unref(_overflow),
                              fullscreen: __props.fullscreen,
                              "header-class": __props.headerClass,
                              "body-class": __props.bodyClass,
                              "footer-class": __props.footerClass,
                              "show-close": __props.showClose,
                              title: __props.title,
                              "aria-level": __props.headerAriaLevel,
                              onClose: vue.unref(handleClose)
                            }), vue.createSlots({
                              header: vue.withCtx(() => [
                                !_ctx.$slots.title ? vue.renderSlot(_ctx.$slots, "header", {
                                  key: 0,
                                  close: vue.unref(handleClose),
                                  titleId: vue.unref(titleId),
                                  titleClass: vue.unref(ns).e("title")
                                }) : vue.renderSlot(_ctx.$slots, "title", { key: 1 })
                              ]),
                              default: vue.withCtx(() => [
                                vue.renderSlot(_ctx.$slots, "default")
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, [
                              _ctx.$slots.footer ? {
                                name: "footer",
                                fn: vue.withCtx(() => [
                                  vue.renderSlot(_ctx.$slots, "footer")
                                ]),
                                key: "0"
                              } : void 0
                            ]), 1040, ["center", "align-center", "close-icon", "draggable", "overflow", "fullscreen", "header-class", "body-class", "footer-class", "show-close", "title", "aria-level", "onClose"])) : vue.createCommentVNode("v-if", true)
                          ]),
                          _: 3
                          /* FORWARDED */
                        }, 8, ["trapped", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusoutPrevented", "onReleaseRequested"])
                      ], 46, _hoisted_1)
                    ]),
                    _: 3
                    /* FORWARDED */
                  }, 8, ["mask", "overlay-class", "z-index"]), [
                    [vue.vShow, vue.unref(visible)]
                  ])
                ];
              }),
              _: 3
              /* FORWARDED */
            },
            16
            /* FULL_PROPS */
          )
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["to", "disabled"]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=dialog.vue2.js.map
