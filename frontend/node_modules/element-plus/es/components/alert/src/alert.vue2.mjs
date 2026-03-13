import { alertEmits, alertProps } from './alert.mjs';
import { defineComponent, useSlots, ref, computed, createBlock, openBlock, Transition, unref, withCtx, withDirectives, createElementVNode, normalizeClass, createCommentVNode, renderSlot, resolveDynamicComponent, createElementBlock, createTextVNode, toDisplayString, Fragment, createVNode, vShow } from 'vue';
import { ElIcon } from '../../icon/index.mjs';
import { flattedChildren, isComment } from '../../../utils/vue/vnode.mjs';
import { TypeComponentsMap, TypeComponents } from '../../../utils/vue/icon.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElAlert"
  },
  __name: "alert",
  props: alertProps,
  emits: alertEmits,
  setup(__props, { emit: __emit }) {
    const { Close } = TypeComponents;
    const props = __props;
    const emit = __emit;
    const slots = useSlots();
    const ns = useNamespace("alert");
    const visible = ref(true);
    const iconComponent = computed(() => TypeComponentsMap[props.type]);
    const hasDesc = computed(() => {
      var _a;
      if (props.description) return true;
      const slotContent = (_a = slots.default) == null ? void 0 : _a.call(slots);
      if (!slotContent) return false;
      const children = flattedChildren(slotContent);
      return children.some((child) => !isComment(child));
    });
    const close = (evt) => {
      visible.value = false;
      emit("close", evt);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: unref(ns).b("fade"),
        persisted: ""
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode(
            "div",
            {
              class: normalizeClass([unref(ns).b(), unref(ns).m(__props.type), unref(ns).is("center", __props.center), unref(ns).is(__props.effect)]),
              role: "alert"
            },
            [
              __props.showIcon && (_ctx.$slots.icon || iconComponent.value) ? (openBlock(), createBlock(unref(ElIcon), {
                key: 0,
                class: normalizeClass([unref(ns).e("icon"), unref(ns).is("big", hasDesc.value)])
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "icon", {}, () => [
                    (openBlock(), createBlock(resolveDynamicComponent(iconComponent.value)))
                  ])
                ]),
                _: 3
                /* FORWARDED */
              }, 8, ["class"])) : createCommentVNode("v-if", true),
              createElementVNode(
                "div",
                {
                  class: normalizeClass(unref(ns).e("content"))
                },
                [
                  __props.title || _ctx.$slots.title ? (openBlock(), createElementBlock(
                    "span",
                    {
                      key: 0,
                      class: normalizeClass([unref(ns).e("title"), { "with-description": hasDesc.value }])
                    },
                    [
                      renderSlot(_ctx.$slots, "title", {}, () => [
                        createTextVNode(
                          toDisplayString(__props.title),
                          1
                          /* TEXT */
                        )
                      ])
                    ],
                    2
                    /* CLASS */
                  )) : createCommentVNode("v-if", true),
                  hasDesc.value ? (openBlock(), createElementBlock(
                    "p",
                    {
                      key: 1,
                      class: normalizeClass(unref(ns).e("description"))
                    },
                    [
                      renderSlot(_ctx.$slots, "default", {}, () => [
                        createTextVNode(
                          toDisplayString(__props.description),
                          1
                          /* TEXT */
                        )
                      ])
                    ],
                    2
                    /* CLASS */
                  )) : createCommentVNode("v-if", true),
                  __props.closable ? (openBlock(), createElementBlock(
                    Fragment,
                    { key: 2 },
                    [
                      __props.closeText ? (openBlock(), createElementBlock(
                        "div",
                        {
                          key: 0,
                          class: normalizeClass([unref(ns).e("close-btn"), unref(ns).is("customed")]),
                          onClick: close
                        },
                        toDisplayString(__props.closeText),
                        3
                        /* TEXT, CLASS */
                      )) : (openBlock(), createBlock(unref(ElIcon), {
                        key: 1,
                        class: normalizeClass(unref(ns).e("close-btn")),
                        onClick: close
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Close))
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["class"]))
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ), [
            [vShow, visible.value]
          ])
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["name"]);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=alert.vue2.mjs.map
