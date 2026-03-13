import { pageHeaderEmits, pageHeaderProps } from './page-header.mjs';
import { defineComponent, createElementBlock, openBlock, normalizeClass, unref, createCommentVNode, createElementVNode, renderSlot, createVNode, createBlock, withCtx, resolveDynamicComponent, createTextVNode, toDisplayString } from 'vue';
import { ElIcon } from '../../icon/index.mjs';
import { ElDivider } from '../../divider/index.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _hoisted_1 = ["aria-label"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElPageHeader"
  },
  __name: "page-header",
  props: pageHeaderProps,
  emits: pageHeaderEmits,
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { t } = useLocale();
    const ns = useNamespace("page-header");
    function handleClick() {
      emit("back");
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([
            unref(ns).b(),
            unref(ns).is("contentful", !!_ctx.$slots.default),
            {
              [unref(ns).m("has-breadcrumb")]: !!_ctx.$slots.breadcrumb,
              [unref(ns).m("has-extra")]: !!_ctx.$slots.extra
            }
          ])
        },
        [
          _ctx.$slots.breadcrumb ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(unref(ns).e("breadcrumb"))
            },
            [
              renderSlot(_ctx.$slots, "breadcrumb")
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true),
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("header"))
            },
            [
              createElementVNode(
                "div",
                {
                  class: normalizeClass(unref(ns).e("left"))
                },
                [
                  createElementVNode(
                    "div",
                    {
                      class: normalizeClass(unref(ns).e("back")),
                      role: "button",
                      tabindex: "0",
                      onClick: handleClick
                    },
                    [
                      __props.icon || _ctx.$slots.icon ? (openBlock(), createElementBlock("div", {
                        key: 0,
                        "aria-label": __props.title || unref(t)("el.pageHeader.title"),
                        class: normalizeClass(unref(ns).e("icon"))
                      }, [
                        renderSlot(_ctx.$slots, "icon", {}, () => [
                          __props.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(__props.icon)))
                            ]),
                            _: 1
                            /* STABLE */
                          })) : createCommentVNode("v-if", true)
                        ])
                      ], 10, _hoisted_1)) : createCommentVNode("v-if", true),
                      createElementVNode(
                        "div",
                        {
                          class: normalizeClass(unref(ns).e("title"))
                        },
                        [
                          renderSlot(_ctx.$slots, "title", {}, () => [
                            createTextVNode(
                              toDisplayString(__props.title || unref(t)("el.pageHeader.title")),
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
                  createVNode(unref(ElDivider), { direction: "vertical" }),
                  createElementVNode(
                    "div",
                    {
                      class: normalizeClass(unref(ns).e("content"))
                    },
                    [
                      renderSlot(_ctx.$slots, "content", {}, () => [
                        createTextVNode(
                          toDisplayString(__props.content),
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
              _ctx.$slots.extra ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  class: normalizeClass(unref(ns).e("extra"))
                },
                [
                  renderSlot(_ctx.$slots, "extra")
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          ),
          _ctx.$slots.default ? (openBlock(), createElementBlock(
            "div",
            {
              key: 1,
              class: normalizeClass(unref(ns).e("main"))
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=page-header.vue2.mjs.map
