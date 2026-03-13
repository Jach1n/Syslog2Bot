'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var result = require('./result.js');
var vue = require('vue');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElResult"
  },
  __name: "result",
  props: result.resultProps,
  setup(__props) {
    const props = __props;
    const ns = index.useNamespace("result");
    const resultIcon = vue.computed(() => {
      const icon = props.icon;
      const iconClass = icon && result.IconMap[icon] ? result.IconMap[icon] : "icon-info";
      const iconComponent = result.IconComponentMap[iconClass] || result.IconComponentMap["icon-info"];
      return {
        class: iconClass,
        component: iconComponent
      };
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(vue.unref(ns).b())
        },
        [
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(vue.unref(ns).e("icon"))
            },
            [
              vue.renderSlot(_ctx.$slots, "icon", {}, () => [
                resultIcon.value.component ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(resultIcon.value.component), {
                  key: 0,
                  class: vue.normalizeClass(resultIcon.value.class)
                }, null, 8, ["class"])) : vue.createCommentVNode("v-if", true)
              ])
            ],
            2
            /* CLASS */
          ),
          __props.title || _ctx.$slots.title ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(vue.unref(ns).e("title"))
            },
            [
              vue.renderSlot(_ctx.$slots, "title", {}, () => [
                vue.createElementVNode(
                  "p",
                  null,
                  vue.toDisplayString(__props.title),
                  1
                  /* TEXT */
                )
              ])
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true),
          __props.subTitle || _ctx.$slots["sub-title"] ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 1,
              class: vue.normalizeClass(vue.unref(ns).e("subtitle"))
            },
            [
              vue.renderSlot(_ctx.$slots, "sub-title", {}, () => [
                vue.createElementVNode(
                  "p",
                  null,
                  vue.toDisplayString(__props.subTitle),
                  1
                  /* TEXT */
                )
              ])
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true),
          _ctx.$slots.extra ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 2,
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
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=result.vue2.js.map
