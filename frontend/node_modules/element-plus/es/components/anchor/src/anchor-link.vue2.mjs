import { anchorLinkProps } from './anchor-link.mjs';
import { defineComponent, ref, inject, computed, watch, nextTick, onMounted, onBeforeUnmount, createElementBlock, openBlock, normalizeClass, unref, createElementVNode, createCommentVNode, renderSlot, createTextVNode, toDisplayString } from 'vue';
import { anchorKey } from './constants.mjs';

const _hoisted_1 = ["href"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElAnchorLink"
  },
  __name: "anchor-link",
  props: anchorLinkProps,
  setup(__props) {
    const props = __props;
    const linkRef = ref(null);
    const {
      ns,
      direction,
      currentAnchor,
      addLink,
      removeLink,
      handleClick: contextHandleClick
    } = inject(anchorKey);
    const cls = computed(() => [
      ns.e("link"),
      ns.is("active", currentAnchor.value === props.href)
    ]);
    const handleClick = (e) => {
      contextHandleClick(e, props.href);
    };
    watch(
      () => props.href,
      (val, oldVal) => {
        nextTick(() => {
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
    onMounted(() => {
      const { href } = props;
      if (href) {
        addLink({
          href,
          el: linkRef.value
        });
      }
    });
    onBeforeUnmount(() => {
      const { href } = props;
      if (href) {
        removeLink(href);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(ns).e("item"))
        },
        [
          createElementVNode("a", {
            ref_key: "linkRef",
            ref: linkRef,
            class: normalizeClass(cls.value),
            href: __props.href,
            onClick: handleClick
          }, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createTextVNode(
                toDisplayString(__props.title),
                1
                /* TEXT */
              )
            ])
          ], 10, _hoisted_1),
          _ctx.$slots["sub-link"] && unref(direction) === "vertical" ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(unref(ns).e("list"))
            },
            [
              renderSlot(_ctx.$slots, "sub-link")
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
//# sourceMappingURL=anchor-link.vue2.mjs.map
