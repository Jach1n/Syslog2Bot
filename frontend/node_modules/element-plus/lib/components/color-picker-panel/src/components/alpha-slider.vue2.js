'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var slider = require('../props/slider.js');
var vue = require('vue');
var useSlider = require('../composables/use-slider.js');
var index = require('../../../../hooks/use-locale/index.js');

const _hoisted_1 = ["aria-label", "aria-valuenow", "aria-valuetext", "aria-orientation", "tabindex", "aria-disabled"];
const minValue = 0;
const maxValue = 100;
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElColorAlphaSlider"
  },
  __name: "alpha-slider",
  props: slider.alphaSliderProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { currentValue, bar, thumb, handleDrag, handleClick, handleKeydown } = useSlider.useSlider(props, { key: "alpha", minValue, maxValue });
    const { rootKls, barKls, barStyle, thumbKls, thumbStyle, update } = useSlider.useSliderDOM(props, {
      namespace: "color-alpha-slider",
      maxValue,
      currentValue,
      bar,
      thumb,
      handleDrag,
      getBackground
    });
    const { t } = index.useLocale();
    const ariaLabel = vue.computed(() => t("el.colorpicker.alphaLabel"));
    const ariaValuetext = vue.computed(() => {
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
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(vue.unref(rootKls))
        },
        [
          vue.createElementVNode(
            "div",
            {
              ref_key: "bar",
              ref: bar,
              class: vue.normalizeClass(vue.unref(barKls)),
              style: vue.normalizeStyle(vue.unref(barStyle)),
              onClick: _cache[0] || (_cache[0] = //@ts-ignore
              (...args) => vue.unref(handleClick) && vue.unref(handleClick)(...args))
            },
            null,
            6
            /* CLASS, STYLE */
          ),
          vue.createElementVNode("div", {
            ref_key: "thumb",
            ref: thumb,
            class: vue.normalizeClass(vue.unref(thumbKls)),
            style: vue.normalizeStyle(vue.unref(thumbStyle)),
            "aria-label": ariaLabel.value,
            "aria-valuenow": vue.unref(currentValue),
            "aria-valuetext": ariaValuetext.value,
            "aria-orientation": __props.vertical ? "vertical" : "horizontal",
            "aria-valuemin": minValue,
            "aria-valuemax": maxValue,
            role: "slider",
            tabindex: __props.disabled ? void 0 : 0,
            "aria-disabled": __props.disabled,
            onKeydown: _cache[1] || (_cache[1] = //@ts-ignore
            (...args) => vue.unref(handleKeydown) && vue.unref(handleKeydown)(...args))
          }, null, 46, _hoisted_1)
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=alpha-slider.vue2.js.map
