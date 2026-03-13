import { cardProps } from './card.mjs';
import { defineComponent, createElementBlock, openBlock, normalizeClass, unref, createCommentVNode, createElementVNode, renderSlot, createTextVNode, toDisplayString, normalizeStyle } from 'vue';
import { useGlobalConfig } from '../../config-provider/src/hooks/use-global-config.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElCard"
  },
  __name: "card",
  props: cardProps,
  setup(__props) {
    const globalConfig = useGlobalConfig("card");
    const ns = useNamespace("card");
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([
            unref(ns).b(),
            unref(ns).is(`${__props.shadow || ((_a = unref(globalConfig)) == null ? void 0 : _a.shadow) || "always"}-shadow`)
          ])
        },
        [
          _ctx.$slots.header || __props.header ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass([unref(ns).e("header"), __props.headerClass])
            },
            [
              renderSlot(_ctx.$slots, "header", {}, () => [
                createTextVNode(
                  toDisplayString(__props.header),
                  1
                  /* TEXT */
                )
              ])
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true),
          createElementVNode(
            "div",
            {
              class: normalizeClass([unref(ns).e("body"), __props.bodyClass]),
              style: normalizeStyle(__props.bodyStyle)
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            6
            /* CLASS, STYLE */
          ),
          _ctx.$slots.footer || __props.footer ? (openBlock(), createElementBlock(
            "div",
            {
              key: 1,
              class: normalizeClass([unref(ns).e("footer"), __props.footerClass])
            },
            [
              renderSlot(_ctx.$slots, "footer", {}, () => [
                createTextVNode(
                  toDisplayString(__props.footer),
                  1
                  /* TEXT */
                )
              ])
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
//# sourceMappingURL=card.vue2.mjs.map
