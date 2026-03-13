'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pageHeader = require('./page-header.js');
var vue = require('vue');
var index$2 = require('../../icon/index.js');
var index$3 = require('../../divider/index.js');
var index = require('../../../hooks/use-locale/index.js');
var index$1 = require('../../../hooks/use-namespace/index.js');

const _hoisted_1 = ["aria-label"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElPageHeader"
  },
  __name: "page-header",
  props: pageHeader.pageHeaderProps,
  emits: pageHeader.pageHeaderEmits,
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { t } = index.useLocale();
    const ns = index$1.useNamespace("page-header");
    function handleClick() {
      emit("back");
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass([
            vue.unref(ns).b(),
            vue.unref(ns).is("contentful", !!_ctx.$slots.default),
            {
              [vue.unref(ns).m("has-breadcrumb")]: !!_ctx.$slots.breadcrumb,
              [vue.unref(ns).m("has-extra")]: !!_ctx.$slots.extra
            }
          ])
        },
        [
          _ctx.$slots.breadcrumb ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(vue.unref(ns).e("breadcrumb"))
            },
            [
              vue.renderSlot(_ctx.$slots, "breadcrumb")
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(vue.unref(ns).e("header"))
            },
            [
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(vue.unref(ns).e("left"))
                },
                [
                  vue.createElementVNode(
                    "div",
                    {
                      class: vue.normalizeClass(vue.unref(ns).e("back")),
                      role: "button",
                      tabindex: "0",
                      onClick: handleClick
                    },
                    [
                      __props.icon || _ctx.$slots.icon ? (vue.openBlock(), vue.createElementBlock("div", {
                        key: 0,
                        "aria-label": __props.title || vue.unref(t)("el.pageHeader.title"),
                        class: vue.normalizeClass(vue.unref(ns).e("icon"))
                      }, [
                        vue.renderSlot(_ctx.$slots, "icon", {}, () => [
                          __props.icon ? (vue.openBlock(), vue.createBlock(vue.unref(index$2.ElIcon), { key: 0 }, {
                            default: vue.withCtx(() => [
                              (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.icon)))
                            ]),
                            _: 1
                            /* STABLE */
                          })) : vue.createCommentVNode("v-if", true)
                        ])
                      ], 10, _hoisted_1)) : vue.createCommentVNode("v-if", true),
                      vue.createElementVNode(
                        "div",
                        {
                          class: vue.normalizeClass(vue.unref(ns).e("title"))
                        },
                        [
                          vue.renderSlot(_ctx.$slots, "title", {}, () => [
                            vue.createTextVNode(
                              vue.toDisplayString(__props.title || vue.unref(t)("el.pageHeader.title")),
                              1
                              /* TEXT */
                            )
                          ])
                        ],
                        2
                        /* CLASS */
                      )
                    ],
                    2
                    /* CLASS */
                  ),
                  vue.createVNode(vue.unref(index$3.ElDivider), { direction: "vertical" }),
                  vue.createElementVNode(
                    "div",
                    {
                      class: vue.normalizeClass(vue.unref(ns).e("content"))
                    },
                    [
                      vue.renderSlot(_ctx.$slots, "content", {}, () => [
                        vue.createTextVNode(
                          vue.toDisplayString(__props.content),
                          1
                          /* TEXT */
                        )
                      ])
                    ],
                    2
                    /* CLASS */
                  )
                ],
                2
                /* CLASS */
              ),
              _ctx.$slots.extra ? (vue.openBlock(), vue.createElementBlock(
                "div",
                {
                  key: 0,
                  class: vue.normalizeClass(vue.unref(ns).e("extra"))
                },
                [
                  vue.renderSlot(_ctx.$slots, "extra")
                ],
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          ),
          _ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 1,
              class: vue.normalizeClass(vue.unref(ns).e("main"))
            },
            [
              vue.renderSlot(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=page-header.vue2.js.map
