import { resultProps, IconComponentMap, IconMap } from './result.mjs';
import { defineComponent, computed, createElementBlock, openBlock, normalizeClass, unref, createElementVNode, createCommentVNode, renderSlot, createBlock, resolveDynamicComponent, toDisplayString } from 'vue';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElResult"
  },
  __name: "result",
  props: resultProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("result");
    const resultIcon = computed(() => {
      const icon = props.icon;
      const iconClass = icon && IconMap[icon] ? IconMap[icon] : "icon-info";
      const iconComponent = IconComponentMap[iconClass] || IconComponentMap["icon-info"];
      return {
        class: iconClass,
        component: iconComponent
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(ns).b())
        },
        [
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("icon"))
            },
            [
              renderSlot(_ctx.$slots, "icon", {}, () => [
                resultIcon.value.component ? (openBlock(), createBlock(resolveDynamicComponent(resultIcon.value.component), {
                  key: 0,
                  class: normalizeClass(resultIcon.value.class)
                }, null, 8, ["class"])) : createCommentVNode("v-if", true)
              ])
            ],
            2
            /* CLASS */
          ),
          __props.title || _ctx.$slots.title ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(unref(ns).e("title"))
            },
            [
              renderSlot(_ctx.$slots, "title", {}, () => [
                createElementVNode(
                  "p",
                  null,
                  toDisplayString(__props.title),
                  1
                  /* TEXT */
                )
              ])
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true),
          __props.subTitle || _ctx.$slots["sub-title"] ? (openBlock(), createElementBlock(
            "div",
            {
              key: 1,
              class: normalizeClass(unref(ns).e("subtitle"))
            },
            [
              renderSlot(_ctx.$slots, "sub-title", {}, () => [
                createElementVNode(
                  "p",
                  null,
                  toDisplayString(__props.subTitle),
                  1
                  /* TEXT */
                )
              ])
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true),
          _ctx.$slots.extra ? (openBlock(), createElementBlock(
            "div",
            {
              key: 2,
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
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=result.vue2.mjs.map
