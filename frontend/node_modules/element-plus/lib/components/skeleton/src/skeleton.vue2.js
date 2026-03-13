'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var skeleton = require('./skeleton.js');
var vue = require('vue');
var skeletonItem_vue_vue_type_script_setup_true_lang = require('./skeleton-item.vue2.js');
var index$1 = require('../../../hooks/use-throttle-render/index.js');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElSkeleton"
  },
  __name: "skeleton",
  props: skeleton.skeletonProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = index.useNamespace("skeleton");
    const uiLoading = index$1.useThrottleRender(vue.toRef(props, "loading"), props.throttle);
    __expose({
      /** @description loading state */
      uiLoading
    });
    return (_ctx, _cache) => {
      return vue.unref(uiLoading) ? (vue.openBlock(), vue.createElementBlock(
        "div",
        vue.mergeProps({
          key: 0,
          class: [vue.unref(ns).b(), vue.unref(ns).is("animated", __props.animated)]
        }, _ctx.$attrs),
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(__props.count, (i) => {
              return vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: i },
                [
                  vue.unref(uiLoading) ? vue.renderSlot(_ctx.$slots, "template", { key: i }, () => [
                    vue.createVNode(skeletonItem_vue_vue_type_script_setup_true_lang.default, {
                      class: vue.normalizeClass(vue.unref(ns).is("first")),
                      variant: "p"
                    }, null, 8, ["class"]),
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(__props.rows, (item) => {
                        return vue.openBlock(), vue.createBlock(skeletonItem_vue_vue_type_script_setup_true_lang.default, {
                          key: item,
                          class: vue.normalizeClass([
                            vue.unref(ns).e("paragraph"),
                            vue.unref(ns).is("last", item === __props.rows && __props.rows > 1)
                          ]),
                          variant: "p"
                        }, null, 8, ["class"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]) : vue.createCommentVNode("v-if", true)
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
      )) : vue.renderSlot(_ctx.$slots, "default", vue.normalizeProps(vue.mergeProps({ key: 1 }, _ctx.$attrs)));
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=skeleton.vue2.js.map
