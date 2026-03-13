'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var empty = require('./empty.js');
var vue = require('vue');
var imgEmpty_vue_vue_type_script_setup_true_lang = require('./img-empty.vue2.js');
var index = require('../../../hooks/use-locale/index.js');
var index$1 = require('../../../hooks/use-namespace/index.js');
var style = require('../../../utils/dom/style.js');

const _hoisted_1 = ["src"];
const _hoisted_2 = { key: 1 };
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElEmpty"
  },
  __name: "empty",
  props: empty.emptyProps,
  setup(__props) {
    const props = __props;
    const { t } = index.useLocale();
    const ns = index$1.useNamespace("empty");
    const emptyDescription = vue.computed(
      () => props.description || t("el.table.emptyText")
    );
    const imageStyle = vue.computed(() => ({
      width: style.addUnit(props.imageSize)
    }));
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(vue.unref(ns).b())
        },
        [
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(vue.unref(ns).e("image")),
              style: vue.normalizeStyle(imageStyle.value)
            },
            [
              __props.image ? (vue.openBlock(), vue.createElementBlock("img", {
                key: 0,
                src: __props.image,
                ondragstart: "return false"
              }, null, 8, _hoisted_1)) : vue.renderSlot(_ctx.$slots, "image", { key: 1 }, () => [
                vue.createVNode(imgEmpty_vue_vue_type_script_setup_true_lang.default)
              ])
            ],
            6
            /* CLASS, STYLE */
          ),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(vue.unref(ns).e("description"))
            },
            [
              _ctx.$slots.description ? vue.renderSlot(_ctx.$slots, "description", { key: 0 }) : (vue.openBlock(), vue.createElementBlock(
                "p",
                _hoisted_2,
                vue.toDisplayString(emptyDescription.value),
                1
                /* TEXT */
              ))
            ],
            2
            /* CLASS */
          ),
          _ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(vue.unref(ns).e("bottom"))
            },
            [
              vue.renderSlot(_ctx.$slots, "default")
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
//# sourceMappingURL=empty.vue2.js.map
