import { timelineItemProps } from './timeline-item.mjs';
import { defineComponent, inject, computed, createElementBlock, openBlock, normalizeClass, createElementVNode, createCommentVNode, unref, normalizeStyle, createBlock, withCtx, resolveDynamicComponent, renderSlot, toDisplayString } from 'vue';
import { ElIcon } from '../../icon/index.mjs';
import { TIMELINE_INJECTION_KEY } from './tokens.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElTimelineItem"
  },
  __name: "timeline-item",
  props: timelineItemProps,
  setup(__props) {
    const props = __props;
    const { props: timelineProps } = inject(
      TIMELINE_INJECTION_KEY
    );
    const ns = useNamespace("timeline-item");
    const defaultNodeKls = computed(() => [
      ns.e("node"),
      ns.em("node", props.size || ""),
      ns.em("node", props.type || ""),
      ns.is("hollow", props.hollow)
    ]);
    const timelineItemKls = computed(() => [
      ns.b(),
      { [ns.e("center")]: props.center },
      ns.is(timelineProps.mode)
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "li",
        {
          class: normalizeClass(timelineItemKls.value)
        },
        [
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("tail"))
            },
            null,
            2
            /* CLASS */
          ),
          !_ctx.$slots.dot ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(defaultNodeKls.value),
              style: normalizeStyle({
                backgroundColor: __props.color
              })
            },
            [
              __props.icon ? (openBlock(), createBlock(unref(ElIcon), {
                key: 0,
                class: normalizeClass(unref(ns).e("icon"))
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(__props.icon)))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class"])) : createCommentVNode("v-if", true)
            ],
            6
            /* CLASS, STYLE */
          )) : createCommentVNode("v-if", true),
          _ctx.$slots.dot ? (openBlock(), createElementBlock(
            "div",
            {
              key: 1,
              class: normalizeClass(unref(ns).e("dot"))
            },
            [
              renderSlot(_ctx.$slots, "dot")
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true),
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("wrapper"))
            },
            [
              !__props.hideTimestamp && __props.placement === "top" ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  class: normalizeClass([unref(ns).e("timestamp"), unref(ns).is("top")])
                },
                toDisplayString(__props.timestamp),
                3
                /* TEXT, CLASS */
              )) : createCommentVNode("v-if", true),
              createElementVNode(
                "div",
                {
                  class: normalizeClass(unref(ns).e("content"))
                },
                [
                  renderSlot(_ctx.$slots, "default")
                ],
                2
                /* CLASS */
              ),
              !__props.hideTimestamp && __props.placement === "bottom" ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 1,
                  class: normalizeClass([unref(ns).e("timestamp"), unref(ns).is("bottom")])
                },
                toDisplayString(__props.timestamp),
                3
                /* TEXT, CLASS */
              )) : createCommentVNode("v-if", true)
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

export { _sfc_main as default };
//# sourceMappingURL=timeline-item.vue2.mjs.map
