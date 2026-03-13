'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var carouselItem = require('./carousel-item.js');
var vue = require('vue');
var useCarouselItem = require('./use-carousel-item.js');
var constants = require('./constants.js');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: constants.CAROUSEL_ITEM_NAME
  },
  __name: "carousel-item",
  props: carouselItem.carouselItemProps,
  setup(__props) {
    const props = __props;
    const ns = index.useNamespace("carousel");
    const {
      carouselItemRef,
      active,
      animating,
      hover,
      inStage,
      isVertical,
      translate,
      isCardType,
      scale,
      ready,
      handleItemClick
    } = useCarouselItem.useCarouselItem(props);
    const itemKls = vue.computed(() => [
      ns.e("item"),
      ns.is("active", active.value),
      ns.is("in-stage", inStage.value),
      ns.is("hover", hover.value),
      ns.is("animating", animating.value),
      {
        [ns.em("item", "card")]: isCardType.value,
        [ns.em("item", "card-vertical")]: isCardType.value && isVertical.value
      }
    ]);
    const itemStyle = vue.computed(() => {
      const translateType = `translate${vue.unref(isVertical) ? "Y" : "X"}`;
      const _translate = `${translateType}(${vue.unref(translate)}px)`;
      const _scale = `scale(${vue.unref(scale)})`;
      const transform = [_translate, _scale].join(" ");
      return {
        transform
      };
    });
    return (_ctx, _cache) => {
      return vue.withDirectives((vue.openBlock(), vue.createElementBlock(
        "div",
        {
          ref_key: "carouselItemRef",
          ref: carouselItemRef,
          class: vue.normalizeClass(itemKls.value),
          style: vue.normalizeStyle(itemStyle.value),
          onClick: _cache[0] || (_cache[0] = //@ts-ignore
          (...args) => vue.unref(handleItemClick) && vue.unref(handleItemClick)(...args))
        },
        [
          vue.unref(isCardType) ? vue.withDirectives((vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(vue.unref(ns).e("mask"))
            },
            null,
            2
            /* CLASS */
          )), [
            [vue.vShow, !vue.unref(active)]
          ]) : vue.createCommentVNode("v-if", true),
          vue.renderSlot(_ctx.$slots, "default")
        ],
        6
        /* CLASS, STYLE */
      )), [
        [vue.vShow, vue.unref(ready)]
      ]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=carousel-item.vue2.js.map
