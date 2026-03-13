import { skeletonItemProps } from './skeleton-item.mjs';
import { defineComponent, createElementBlock, openBlock, normalizeClass, unref, createBlock, createCommentVNode } from 'vue';
import { PictureFilled } from '@element-plus/icons-vue';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElSkeletonItem"
  },
  __name: "skeleton-item",
  props: skeletonItemProps,
  setup(__props) {
    const ns = useNamespace("skeleton");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([unref(ns).e("item"), unref(ns).e(__props.variant)])
        },
        [
          __props.variant === "image" ? (openBlock(), createBlock(unref(PictureFilled), { key: 0 })) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=skeleton-item.vue2.mjs.map
