import { hueSliderProps } from '../props/slider.mjs';
import { defineComponent, computed, createElementBlock, openBlock, normalizeClass, unref, createElementVNode, normalizeStyle } from 'vue';
import { useSlider, useSliderDOM } from '../composables/use-slider.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';

const _hoisted_1 = ["aria-label", "aria-valuenow", "aria-valuetext", "aria-orientation", "tabindex", "aria-disabled"];
const minValue = 0;
const maxValue = 360;
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElColorHueSlider"
  },
  __name: "hue-slider",
  props: hueSliderProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { currentValue, bar, thumb, handleDrag, handleClick, handleKeydown } = useSlider(props, { key: "hue", minValue, maxValue });
    const { rootKls, barKls, thumbKls, thumbStyle, thumbTop, update } = useSliderDOM(props, {
      namespace: "color-hue-slider",
      maxValue,
      currentValue,
      bar,
      thumb,
      handleDrag
    });
    const { t } = useLocale();
    const ariaLabel = computed(() => t("el.colorpicker.hueLabel"));
    const ariaValuetext = computed(() => {
      return t("el.colorpicker.hueDescription", {
        hue: currentValue.value,
        color: props.color.value
      });
    });
    __expose({
      /**
       * @description bar element ref
       */
      bar,
      /**
       * @description thumb element ref
       */
      thumb,
      /**
       * @description thumb top position, only for vertical slider
       */
      thumbTop,
      /**
       * @description update hue slider manually
       */
      update
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(rootKls))
        },
        [
          createElementVNode(
            "div",
            {
              ref_key: "bar",
              ref: bar,
              class: normalizeClass(unref(barKls)),
              onClick: _cache[0] || (_cache[0] = //@ts-ignore
              (...args) => unref(handleClick) && unref(handleClick)(...args))
            },
            null,
            2
            /* CLASS */
          ),
          createElementVNode("div", {
            ref_key: "thumb",
            ref: thumb,
            class: normalizeClass(unref(thumbKls)),
            style: normalizeStyle(unref(thumbStyle)),
            "aria-label": ariaLabel.value,
            "aria-valuenow": unref(currentValue),
            "aria-valuetext": ariaValuetext.value,
            "aria-orientation": __props.vertical ? "vertical" : "horizontal",
            "aria-valuemin": minValue,
            "aria-valuemax": maxValue,
            role: "slider",
            tabindex: __props.disabled ? void 0 : 0,
            "aria-disabled": __props.disabled,
            onKeydown: _cache[1] || (_cache[1] = //@ts-ignore
            (...args) => unref(handleKeydown) && unref(handleKeydown)(...args))
          }, null, 46, _hoisted_1)
        ],
        2
        /* CLASS */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=hue-slider.vue2.mjs.map
