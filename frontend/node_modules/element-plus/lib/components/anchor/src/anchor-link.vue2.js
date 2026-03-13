'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var anchorLink = require('./anchor-link.js');
var vue = require('vue');
var constants = require('./constants.js');

const _hoisted_1 = ["href"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElAnchorLink"
  },
  __name: "anchor-link",
  props: anchorLink.anchorLinkProps,
  setup(__props) {
    const props = __props;
    const linkRef = vue.ref(null);
    const {
      ns,
      direction,
      currentAnchor,
      addLink,
      removeLink,
      handleClick: contextHandleClick
    } = vue.inject(constants.anchorKey);
    const cls = vue.computed(() => [
      ns.e("link"),
      ns.is("active", currentAnchor.value === props.href)
    ]);
    const handleClick = (e) => {
      contextHandleClick(e, props.href);
    };
    vue.watch(
      () => props.href,
      (val, oldVal) => {
        vue.nextTick(() => {
          if (oldVal) removeLink(oldVal);
          if (val) {
            addLink({
              href: val,
              el: linkRef.value
            });
          }
        });
      }
    );
    vue.onMounted(() => {
      const { href } = props;
      if (href) {
        addLink({
          href,
          el: linkRef.value
        });
      }
    });
    vue.onBeforeUnmount(() => {
      const { href } = props;
      if (href) {
        removeLink(href);
      }
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(vue.unref(ns).e("item"))
        },
        [
          vue.createElementVNode("a", {
            ref_key: "linkRef",
            ref: linkRef,
            class: vue.normalizeClass(cls.value),
            href: __props.href,
            onClick: handleClick
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              vue.createTextVNode(
                vue.toDisplayString(__props.title),
                1
                /* TEXT */
              )
            ])
          ], 10, _hoisted_1),
          _ctx.$slots["sub-link"] && vue.unref(direction) === "vertical" ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(vue.unref(ns).e("list"))
            },
            [
              vue.renderSlot(_ctx.$slots, "sub-link")
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
//# sourceMappingURL=anchor-link.vue2.js.map
