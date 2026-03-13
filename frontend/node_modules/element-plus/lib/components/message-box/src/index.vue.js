'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index_vue_vue_type_script_lang = require('./index.vue2.js');
var vue = require('vue');
var _pluginVue_exportHelper = require('../../../_virtual/_plugin-vue_export-helper.js');

const _hoisted_1 = ["aria-label", "aria-describedby"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = ["id"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_el_input = vue.resolveComponent("el-input");
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_el_focus_trap = vue.resolveComponent("el-focus-trap");
  const _component_el_overlay = vue.resolveComponent("el-overlay");
  return vue.openBlock(), vue.createBlock(vue.Transition, {
    name: "fade-in-linear",
    onAfterLeave: _cache[11] || (_cache[11] = ($event) => _ctx.$emit("vanish")),
    persisted: ""
  }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createVNode(_component_el_overlay, {
        "z-index": _ctx.zIndex,
        "overlay-class": [_ctx.ns.is("message-box"), _ctx.modalClass],
        mask: _ctx.modal
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("div", {
            role: "dialog",
            "aria-label": _ctx.title,
            "aria-modal": "true",
            "aria-describedby": !_ctx.showInput ? _ctx.contentId : void 0,
            class: vue.normalizeClass(`${_ctx.ns.namespace.value}-overlay-message-box`),
            onClick: _cache[8] || (_cache[8] = (...args) => _ctx.overlayEvent.onClick && _ctx.overlayEvent.onClick(...args)),
            onMousedown: _cache[9] || (_cache[9] = (...args) => _ctx.overlayEvent.onMousedown && _ctx.overlayEvent.onMousedown(...args)),
            onMouseup: _cache[10] || (_cache[10] = (...args) => _ctx.overlayEvent.onMouseup && _ctx.overlayEvent.onMouseup(...args))
          }, [
            vue.createVNode(_component_el_focus_trap, {
              loop: "",
              trapped: _ctx.visible,
              "focus-trap-el": _ctx.rootRef,
              "focus-start-el": _ctx.focusStartRef,
              onReleaseRequested: _ctx.onCloseRequested
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "div",
                  {
                    ref: "rootRef",
                    class: vue.normalizeClass([
                      _ctx.ns.b(),
                      _ctx.customClass,
                      _ctx.ns.is("draggable", _ctx.draggable),
                      _ctx.ns.is("dragging", _ctx.isDragging),
                      { [_ctx.ns.m("center")]: _ctx.center }
                    ]),
                    style: vue.normalizeStyle(_ctx.customStyle),
                    tabindex: "-1",
                    onClick: _cache[7] || (_cache[7] = vue.withModifiers(() => {
                    }, ["stop"]))
                  },
                  [
                    _ctx.title !== null && _ctx.title !== void 0 ? (vue.openBlock(), vue.createElementBlock(
                      "div",
                      {
                        key: 0,
                        ref: "headerRef",
                        class: vue.normalizeClass([_ctx.ns.e("header"), { "show-close": _ctx.showClose }])
                      },
                      [
                        vue.createElementVNode(
                          "div",
                          {
                            class: vue.normalizeClass(_ctx.ns.e("title"))
                          },
                          [
                            _ctx.iconComponent && _ctx.center ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                              key: 0,
                              class: vue.normalizeClass([_ctx.ns.e("status"), _ctx.typeClass])
                            }, {
                              default: vue.withCtx(() => [
                                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.iconComponent)))
                              ]),
                              _: 1
                              /* STABLE */
                            }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
                            vue.createElementVNode(
                              "span",
                              null,
                              vue.toDisplayString(_ctx.title),
                              1
                              /* TEXT */
                            )
                          ],
                          2
                          /* CLASS */
                        ),
                        _ctx.showClose ? (vue.openBlock(), vue.createElementBlock("button", {
                          key: 0,
                          type: "button",
                          class: vue.normalizeClass(_ctx.ns.e("headerbtn")),
                          "aria-label": _ctx.t("el.messagebox.close"),
                          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.handleAction(_ctx.distinguishCancelAndClose ? "close" : "cancel")),
                          onKeydown: _cache[1] || (_cache[1] = vue.withKeys(vue.withModifiers(($event) => _ctx.handleAction(_ctx.distinguishCancelAndClose ? "close" : "cancel"), ["prevent"]), ["enter"]))
                        }, [
                          vue.createVNode(_component_el_icon, {
                            class: vue.normalizeClass(_ctx.ns.e("close"))
                          }, {
                            default: vue.withCtx(() => [
                              (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.closeIcon || "close")))
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["class"])
                        ], 42, _hoisted_2)) : vue.createCommentVNode("v-if", true)
                      ],
                      2
                      /* CLASS */
                    )) : vue.createCommentVNode("v-if", true),
                    vue.createElementVNode("div", {
                      id: _ctx.contentId,
                      class: vue.normalizeClass(_ctx.ns.e("content"))
                    }, [
                      vue.createElementVNode(
                        "div",
                        {
                          class: vue.normalizeClass(_ctx.ns.e("container"))
                        },
                        [
                          _ctx.iconComponent && !_ctx.center && _ctx.hasMessage ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                            key: 0,
                            class: vue.normalizeClass([_ctx.ns.e("status"), _ctx.typeClass])
                          }, {
                            default: vue.withCtx(() => [
                              (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.iconComponent)))
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
                          _ctx.hasMessage ? (vue.openBlock(), vue.createElementBlock(
                            "div",
                            {
                              key: 1,
                              class: vue.normalizeClass(_ctx.ns.e("message"))
                            },
                            [
                              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                                !_ctx.dangerouslyUseHTMLString ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.showInput ? "label" : "p"), {
                                  key: 0,
                                  for: _ctx.showInput ? _ctx.inputId : void 0,
                                  textContent: vue.toDisplayString(_ctx.message)
                                }, null, 8, ["for", "textContent"])) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.showInput ? "label" : "p"), {
                                  key: 1,
                                  for: _ctx.showInput ? _ctx.inputId : void 0,
                                  innerHTML: _ctx.message
                                }, null, 8, ["for", "innerHTML"]))
                              ])
                            ],
                            2
                            /* CLASS */
                          )) : vue.createCommentVNode("v-if", true)
                        ],
                        2
                        /* CLASS */
                      ),
                      vue.withDirectives(vue.createElementVNode(
                        "div",
                        {
                          class: vue.normalizeClass(_ctx.ns.e("input"))
                        },
                        [
                          vue.createVNode(_component_el_input, {
                            id: _ctx.inputId,
                            ref: "inputRef",
                            modelValue: _ctx.inputValue,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.inputValue = $event),
                            type: _ctx.inputType,
                            placeholder: _ctx.inputPlaceholder,
                            "aria-invalid": _ctx.validateError,
                            class: vue.normalizeClass({ invalid: _ctx.validateError }),
                            onKeydown: vue.withKeys(_ctx.handleInputEnter, ["enter"])
                          }, null, 8, ["id", "modelValue", "type", "placeholder", "aria-invalid", "class", "onKeydown"]),
                          vue.createElementVNode(
                            "div",
                            {
                              class: vue.normalizeClass(_ctx.ns.e("errormsg")),
                              style: vue.normalizeStyle({
                                visibility: !!_ctx.editorErrorMessage ? "visible" : "hidden"
                              })
                            },
                            vue.toDisplayString(_ctx.editorErrorMessage),
                            7
                            /* TEXT, CLASS, STYLE */
                          )
                        ],
                        2
                        /* CLASS */
                      ), [
                        [vue.vShow, _ctx.showInput]
                      ])
                    ], 10, _hoisted_3),
                    vue.createElementVNode(
                      "div",
                      {
                        class: vue.normalizeClass(_ctx.ns.e("btns"))
                      },
                      [
                        _ctx.showCancelButton ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                          key: 0,
                          type: _ctx.cancelButtonType === "text" ? "" : _ctx.cancelButtonType,
                          text: _ctx.cancelButtonType === "text",
                          loading: _ctx.cancelButtonLoading,
                          "loading-icon": _ctx.cancelButtonLoadingIcon,
                          class: vue.normalizeClass([_ctx.cancelButtonClass]),
                          round: _ctx.roundButton,
                          size: _ctx.btnSize,
                          onClick: _cache[3] || (_cache[3] = ($event) => _ctx.handleAction("cancel")),
                          onKeydown: _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers(($event) => _ctx.handleAction("cancel"), ["prevent"]), ["enter"]))
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(
                              vue.toDisplayString(_ctx.cancelButtonText || _ctx.t("el.messagebox.cancel")),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 1
                          /* STABLE */
                        }, 8, ["type", "text", "loading", "loading-icon", "class", "round", "size"])) : vue.createCommentVNode("v-if", true),
                        vue.withDirectives(vue.createVNode(_component_el_button, {
                          ref: "confirmRef",
                          type: _ctx.confirmButtonType === "text" ? "" : _ctx.confirmButtonType,
                          text: _ctx.confirmButtonType === "text",
                          loading: _ctx.confirmButtonLoading,
                          "loading-icon": _ctx.confirmButtonLoadingIcon,
                          class: vue.normalizeClass([_ctx.confirmButtonClasses]),
                          round: _ctx.roundButton,
                          disabled: _ctx.confirmButtonDisabled,
                          size: _ctx.btnSize,
                          onClick: _cache[5] || (_cache[5] = ($event) => _ctx.handleAction("confirm")),
                          onKeydown: _cache[6] || (_cache[6] = vue.withKeys(vue.withModifiers(($event) => _ctx.handleAction("confirm"), ["prevent"]), ["enter"]))
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(
                              vue.toDisplayString(_ctx.confirmButtonText || _ctx.t("el.messagebox.confirm")),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 1
                          /* STABLE */
                        }, 8, ["type", "text", "loading", "loading-icon", "class", "round", "disabled", "size"]), [
                          [vue.vShow, _ctx.showConfirmButton]
                        ])
                      ],
                      2
                      /* CLASS */
                    )
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["trapped", "focus-trap-el", "focus-start-el", "onReleaseRequested"])
          ], 42, _hoisted_1)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["z-index", "overlay-class", "mask"]), [
        [vue.vShow, _ctx.visible]
      ])
    ]),
    _: 3
    /* FORWARDED */
  });
}
var MessageBoxConstructor = /* @__PURE__ */ _pluginVue_exportHelper.default(index_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

exports.default = MessageBoxConstructor;
//# sourceMappingURL=index.vue.js.map
