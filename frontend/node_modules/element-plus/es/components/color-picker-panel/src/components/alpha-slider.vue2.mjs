import { alphaSliderProps } from '../props/slider.mjs';
import { defineComponent, computed, createElementBlock, openBlock, normalizeClass, unref, createElementVNode, normalizeStyle } from 'vue';
import { useSlider, useSliderDOM } from '../composables/use-slider.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';

const _hoisted_1 = ["aria-label", "aria-valuenow", "aria-valuetext", "aria-orientation", "tabindex", "aria-disabled"];
const minValue = 0;
const maxValue = 100;
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElColorAlphaSlider"
  },
  __name: "alpha-slider",
  props: alphaSliderProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { currentValue, bar, thumb, handleDrag, handleClick, handleKeydown } = useSlider(props, { key: "alpha", minValue, maxValue });
    const { rootKls, barKls, barStyle, thumbKls, thumbStyle, update } = useSliderDOM(props, {
      namespace: "color-alpha-slider",
      maxValue,
      currentValue,
      bar,
      thumb,
      handleDrag,
      getBackground
    });
    const { t } = useLocale();
    const ariaLabel = computed(() => t("el.colorpicker.alphaLabel"));
    const ariaValuetext = computed(() => {
      return t("el.colorpicker.alphaDescription", {
        alpha: currentValue.value,
        color: props.color.value
      });
    });
    function getBackground() {
      if (props.color && props.color.value) {
        const { r, g, b } = props.color.toRgb();
        return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`;
      }
      return "";
    }
    __expose({
      /**
       * @description update alpha slider manually
       * @type {Function}
       */
      update,
      /**
       * @description bar element ref
       * @type {HTMLElement}
       */
      bar,
      /**
       * @description thumb element ref
       * @type {HTMLElement}
       */
      thumb
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
              style: normalizeStyle(unref(barStyle)),
              onClick: _cache[0] || (_cache[0] = //@ts-ignore
              (...args) => unref(handleClick) && unref(handleClick)(...args))
            },
            null,
            6
            /* CLASS, STYLE */
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
//# sourceMappingURL=alpha-slider.vue2.mjs.map
