import { carouselItemProps } from './carousel-item.mjs';
import { defineComponent, computed, unref, withDirectives, createElementBlock, openBlock, normalizeStyle, normalizeClass, createCommentVNode, renderSlot, vShow } from 'vue';
import { useCarouselItem } from './use-carousel-item.mjs';
import { CAROUSEL_ITEM_NAME } from './constants.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: CAROUSEL_ITEM_NAME
  },
  __name: "carousel-item",
  props: carouselItemProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("carousel");
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
    } = useCarouselItem(props);
    const itemKls = computed(() => [
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
    const itemStyle = computed(() => {
      const translateType = `translate${unref(isVertical) ? "Y" : "X"}`;
      const _translate = `${translateType}(${unref(translate)}px)`;
      const _scale = `scale(${unref(scale)})`;
      const transform = [_translate, _scale].join(" ");
      return {
        transform
      };
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock(
        "div",
        {
          ref_key: "carouselItemRef",
          ref: carouselItemRef,
          class: normalizeClass(itemKls.value),
          style: normalizeStyle(itemStyle.value),
          onClick: _cache[0] || (_cache[0] = //@ts-ignore
          (...args) => unref(handleItemClick) && unref(handleItemClick)(...args))
        },
        [
          unref(isCardType) ? withDirectives((openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(unref(ns).e("mask"))
            },
            null,
            2
            /* CLASS */
          )), [
            [vShow, !unref(active)]
          ]) : createCommentVNode("v-if", true),
          renderSlot(_ctx.$slots, "default")
        ],
        6
        /* CLASS, STYLE */
      )), [
        [vShow, unref(ready)]
      ]);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=carousel-item.vue2.mjs.map
