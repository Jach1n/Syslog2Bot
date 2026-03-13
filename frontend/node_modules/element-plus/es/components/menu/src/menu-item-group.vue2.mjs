import { menuItemGroupProps } from './menu-item-group.mjs';
import { defineComponent, createElementBlock, openBlock, normalizeClass, unref, createElementVNode, renderSlot, Fragment, createTextVNode, toDisplayString } from 'vue';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElMenuItemGroup"
  },
  __name: "menu-item-group",
  props: menuItemGroupProps,
  setup(__props) {
    const ns = useNamespace("menu-item-group");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "li",
        {
          class: normalizeClass(unref(ns).b())
        },
        [
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("title"))
            },
            [
              !_ctx.$slots.title ? (openBlock(), createElementBlock(
                Fragment,
                { key: 0 },
                [
                  createTextVNode(
                    toDisplayString(__props.title),
                    1
                    /* TEXT */
                  )
                ],
                64
                /* STABLE_FRAGMENT */
              )) : renderSlot(_ctx.$slots, "title", { key: 1 })
            ],
            2
            /* CLASS */
          ),
          createElementVNode("ul", null, [
            renderSlot(_ctx.$slots, "default")
          ])
        ],
        2
        /* CLASS */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=menu-item-group.vue2.mjs.map
