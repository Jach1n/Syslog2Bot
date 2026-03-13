'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var menuItemGroup = require('./menu-item-group.js');
var vue = require('vue');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElMenuItemGroup"
  },
  __name: "menu-item-group",
  props: menuItemGroup.menuItemGroupProps,
  setup(__props) {
    const ns = index.useNamespace("menu-item-group");
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "li",
        {
          class: vue.normalizeClass(vue.unref(ns).b())
        },
        [
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(vue.unref(ns).e("title"))
            },
            [
              !_ctx.$slots.title ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                [
                  vue.createTextVNode(
                    vue.toDisplayString(__props.title),
                    1
                    /* TEXT */
                  )
                ],
                64
                /* STABLE_FRAGMENT */
              )) : vue.renderSlot(_ctx.$slots, "title", { key: 1 })
            ],
            2
            /* CLASS */
          ),
          vue.createElementVNode("ul", null, [
            vue.renderSlot(_ctx.$slots, "default")
          ])
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=menu-item-group.vue2.js.map
