'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var alert = require('./alert.js');
var vue = require('vue');
var index$1 = require('../../icon/index.js');
var vnode = require('../../../utils/vue/vnode.js');
var icon = require('../../../utils/vue/icon.js');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElAlert"
  },
  __name: "alert",
  props: alert.alertProps,
  emits: alert.alertEmits,
  setup(__props, { emit: __emit }) {
    const { Close } = icon.TypeComponents;
    const props = __props;
    const emit = __emit;
    const slots = vue.useSlots();
    const ns = index.useNamespace("alert");
    const visible = vue.ref(true);
    const iconComponent = vue.computed(() => icon.TypeComponentsMap[props.type]);
    const hasDesc = vue.computed(() => {
      var _a;
      if (props.description) return true;
      const slotContent = (_a = slots.default) == null ? void 0 : _a.call(slots);
      if (!slotContent) return false;
      const children = vnode.flattedChildren(slotContent);
      return children.some((child) => !vnode.isComment(child));
    });
    const close = (evt) => {
      visible.value = false;
      emit("close", evt);
    };
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.Transition, {
        name: vue.unref(ns).b("fade"),
        persisted: ""
      }, {
        default: vue.withCtx(() => [
          vue.withDirectives(vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass([vue.unref(ns).b(), vue.unref(ns).m(__props.type), vue.unref(ns).is("center", __props.center), vue.unref(ns).is(__props.effect)]),
              role: "alert"
            },
            [
              __props.showIcon && (_ctx.$slots.icon || iconComponent.value) ? (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElIcon), {
                key: 0,
                class: vue.normalizeClass([vue.unref(ns).e("icon"), vue.unref(ns).is("big", hasDesc.value)])
              }, {
                default: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "icon", {}, () => [
                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(iconComponent.value)))
                  ])
                ]),
                _: 3
                /* FORWARDED */
              }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(vue.unref(ns).e("content"))
                },
                [
                  __props.title || _ctx.$slots.title ? (vue.openBlock(), vue.createElementBlock(
                    "span",
                    {
                      key: 0,
                      class: vue.normalizeClass([vue.unref(ns).e("title"), { "with-description": hasDesc.value }])
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
                  )) : vue.createCommentVNode("v-if", true),
                  hasDesc.value ? (vue.openBlock(), vue.createElementBlock(
                    "p",
                    {
                      key: 1,
                      class: vue.normalizeClass(vue.unref(ns).e("description"))
                    },
                    [
                      vue.renderSlot(_ctx.$slots, "default", {}, () => [
                        vue.createTextVNode(
                          vue.toDisplayString(__props.description),
                          1
                          /* TEXT */
                        )
                      ])
                    ],
                    2
                    /* CLASS */
                  )) : vue.createCommentVNode("v-if", true),
                  __props.closable ? (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    { key: 2 },
                    [
                      __props.closeText ? (vue.openBlock(), vue.createElementBlock(
                        "div",
                        {
                          key: 0,
                          class: vue.normalizeClass([vue.unref(ns).e("close-btn"), vue.unref(ns).is("customed")]),
                          onClick: close
                        },
                        vue.toDisplayString(__props.closeText),
                        3
                        /* TEXT, CLASS */
                      )) : (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElIcon), {
                        key: 1,
                        class: vue.normalizeClass(vue.unref(ns).e("close-btn")),
                        onClick: close
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(Close))
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["class"]))
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : vue.createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ), [
            [vue.vShow, visible.value]
          ])
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["name"]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=alert.vue2.js.map
