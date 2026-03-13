'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var skeletonItem = require('./skeleton-item.js');
var vue = require('vue');
var iconsVue = require('@element-plus/icons-vue');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElSkeletonItem"
  },
  __name: "skeleton-item",
  props: skeletonItem.skeletonItemProps,
  setup(__props) {
    const ns = index.useNamespace("skeleton");
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass([vue.unref(ns).e("item"), vue.unref(ns).e(__props.variant)])
        },
        [
          __props.variant === "image" ? (vue.openBlock(), vue.createBlock(vue.unref(iconsVue.PictureFilled), { key: 0 })) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=skeleton-item.vue2.js.map
