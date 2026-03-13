'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var timelineItem = require('./timeline-item.js');
var vue = require('vue');
var index$1 = require('../../icon/index.js');
var tokens = require('./tokens.js');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElTimelineItem"
  },
  __name: "timeline-item",
  props: timelineItem.timelineItemProps,
  setup(__props) {
    const props = __props;
    const { props: timelineProps } = vue.inject(
      tokens.TIMELINE_INJECTION_KEY
    );
    const ns = index.useNamespace("timeline-item");
    const defaultNodeKls = vue.computed(() => [
      ns.e("node"),
      ns.em("node", props.size || ""),
      ns.em("node", props.type || ""),
      ns.is("hollow", props.hollow)
    ]);
    const timelineItemKls = vue.computed(() => [
      ns.b(),
      { [ns.e("center")]: props.center },
      ns.is(timelineProps.mode)
    ]);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "li",
        {
          class: vue.normalizeClass(timelineItemKls.value)
        },
        [
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(vue.unref(ns).e("tail"))
            },
            null,
            2
            /* CLASS */
          ),
          !_ctx.$slots.dot ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(defaultNodeKls.value),
              style: vue.normalizeStyle({
                backgroundColor: __props.color
              })
            },
            [
              __props.icon ? (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElIcon), {
                key: 0,
                class: vue.normalizeClass(vue.unref(ns).e("icon"))
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.icon)))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
            ],
            6
            /* CLASS, STYLE */
          )) : vue.createCommentVNode("v-if", true),
          _ctx.$slots.dot ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 1,
              class: vue.normalizeClass(vue.unref(ns).e("dot"))
            },
            [
              vue.renderSlot(_ctx.$slots, "dot")
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(vue.unref(ns).e("wrapper"))
            },
            [
              !__props.hideTimestamp && __props.placement === "top" ? (vue.openBlock(), vue.createElementBlock(
                "div",
                {
                  key: 0,
                  class: vue.normalizeClass([vue.unref(ns).e("timestamp"), vue.unref(ns).is("top")])
                },
                vue.toDisplayString(__props.timestamp),
                3
                /* TEXT, CLASS */
              )) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(vue.unref(ns).e("content"))
                },
                [
                  vue.renderSlot(_ctx.$slots, "default")
                ],
                2
                /* CLASS */
              ),
              !__props.hideTimestamp && __props.placement === "bottom" ? (vue.openBlock(), vue.createElementBlock(
                "div",
                {
                  key: 1,
                  class: vue.normalizeClass([vue.unref(ns).e("timestamp"), vue.unref(ns).is("bottom")])
                },
                vue.toDisplayString(__props.timestamp),
                3
                /* TEXT, CLASS */
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
//# sourceMappingURL=timeline-item.vue2.js.map
