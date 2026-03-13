'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var card = require('./card.js');
var vue = require('vue');
var useGlobalConfig = require('../../config-provider/src/hooks/use-global-config.js');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElCard"
  },
  __name: "card",
  props: card.cardProps,
  setup(__props) {
    const globalConfig = useGlobalConfig.useGlobalConfig("card");
    const ns = index.useNamespace("card");
    return (_ctx, _cache) => {
      var _a;
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass([
            vue.unref(ns).b(),
            vue.unref(ns).is(`${__props.shadow || ((_a = vue.unref(globalConfig)) == null ? void 0 : _a.shadow) || "always"}-shadow`)
          ])
        },
        [
          _ctx.$slots.header || __props.header ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass([vue.unref(ns).e("header"), __props.headerClass])
            },
            [
              vue.renderSlot(_ctx.$slots, "header", {}, () => [
                vue.createTextVNode(
                  vue.toDisplayString(__props.header),
                  1
                  /* TEXT */
                )
              ])
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass([vue.unref(ns).e("body"), __props.bodyClass]),
              style: vue.normalizeStyle(__props.bodyStyle)
            },
            [
              vue.renderSlot(_ctx.$slots, "default")
            ],
            6
            /* CLASS, STYLE */
          ),
          _ctx.$slots.footer || __props.footer ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 1,
              class: vue.normalizeClass([vue.unref(ns).e("footer"), __props.footerClass])
            },
            [
              vue.renderSlot(_ctx.$slots, "footer", {}, () => [
                vue.createTextVNode(
                  vue.toDisplayString(__props.footer),
                  1
                  /* TEXT */
                )
              ])
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
//# sourceMappingURL=card.vue2.js.map
