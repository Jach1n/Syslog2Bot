'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var statistic = require('./statistic.js');
var vue = require('vue');
var index = require('../../../hooks/use-namespace/index.js');
var shared = require('@vue/shared');
var types = require('../../../utils/types.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElStatistic"
  },
  __name: "statistic",
  props: statistic.statisticProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = index.useNamespace("statistic");
    const displayValue = vue.computed(() => {
      const { value, formatter, precision, decimalSeparator, groupSeparator } = props;
      if (shared.isFunction(formatter)) return formatter(value);
      if (!types.isNumber(value) || Number.isNaN(value)) return value;
      let [integer, decimal = ""] = String(value).split(".");
      decimal = decimal.padEnd(precision, "0").slice(0, precision > 0 ? precision : 0);
      integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
      return [integer, decimal].join(decimal ? decimalSeparator : "");
    });
    __expose({
      /**
       * @description current display value
       */
      displayValue
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(vue.unref(ns).b())
        },
        [
          _ctx.$slots.title || __props.title ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(vue.unref(ns).e("head"))
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
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(vue.unref(ns).e("content"))
            },
            [
              _ctx.$slots.prefix || __props.prefix ? (vue.openBlock(), vue.createElementBlock(
                "div",
                {
                  key: 0,
                  class: vue.normalizeClass(vue.unref(ns).e("prefix"))
                },
                [
                  vue.renderSlot(_ctx.$slots, "prefix", {}, () => [
                    vue.createElementVNode(
                      "span",
                      null,
                      vue.toDisplayString(__props.prefix),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode(
                "span",
                {
                  class: vue.normalizeClass(vue.unref(ns).e("number")),
                  style: vue.normalizeStyle(__props.valueStyle)
                },
                vue.toDisplayString(displayValue.value),
                7
                /* TEXT, CLASS, STYLE */
              ),
              _ctx.$slots.suffix || __props.suffix ? (vue.openBlock(), vue.createElementBlock(
                "div",
                {
                  key: 1,
                  class: vue.normalizeClass(vue.unref(ns).e("suffix"))
                },
                [
                  vue.renderSlot(_ctx.$slots, "suffix", {}, () => [
                    vue.createElementVNode(
                      "span",
                      null,
                      vue.toDisplayString(__props.suffix),
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
          )
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=statistic.vue2.js.map
