import { skeletonProps } from './skeleton.mjs';
import { defineComponent, toRef, createElementBlock, renderSlot, unref, openBlock, mergeProps, Fragment, renderList, createCommentVNode, createVNode, normalizeClass, createBlock, normalizeProps } from 'vue';
import _sfc_main$1 from './skeleton-item.vue2.mjs';
import { useThrottleRender } from '../../../hooks/use-throttle-render/index.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElSkeleton"
  },
  __name: "skeleton",
  props: skeletonProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = useNamespace("skeleton");
    const uiLoading = useThrottleRender(toRef(props, "loading"), props.throttle);
    __expose({
      /** @description loading state */
      uiLoading
    });
    return (_ctx, _cache) => {
      return unref(uiLoading) ? (openBlock(), createElementBlock(
        "div",
        mergeProps({
          key: 0,
          class: [unref(ns).b(), unref(ns).is("animated", __props.animated)]
        }, _ctx.$attrs),
        [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(__props.count, (i) => {
              return openBlock(), createElementBlock(
                Fragment,
                { key: i },
                [
                  unref(uiLoading) ? renderSlot(_ctx.$slots, "template", { key: i }, () => [
                    createVNode(_sfc_main$1, {
                      class: normalizeClass(unref(ns).is("first")),
                      variant: "p"
                    }, null, 8, ["class"]),
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(__props.rows, (item) => {
                        return openBlock(), createBlock(_sfc_main$1, {
                          key: item,
                          class: normalizeClass([
                            unref(ns).e("paragraph"),
                            unref(ns).is("last", item === __props.rows && __props.rows > 1)
                          ]),
                          variant: "p"
                        }, null, 8, ["class"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]) : createCommentVNode("v-if", true)
                ],
                64
                /* STABLE_FRAGMENT */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        16
        /* FULL_PROPS */
      )) : renderSlot(_ctx.$slots, "default", normalizeProps(mergeProps({ key: 1 }, _ctx.$attrs)));
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=skeleton.vue2.mjs.map
