'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var slider = require('../props/slider.js');
var vue = require('vue');
var useSlider = require('../composables/use-slider.js');
var index = require('../../../../hooks/use-locale/index.js');

const _hoisted_1 = ["aria-label", "aria-valuenow", "aria-valuetext", "aria-orientation", "tabindex", "aria-disabled"];
const minValue = 0;
const maxValue = 360;
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElColorHueSlider"
  },
  __name: "hue-slider",
  props: slider.hueSliderProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { currentValue, bar, thumb, handleDrag, handleClick, handleKeydown } = useSlider.useSlider(props, { key: "hue", minValue, maxValue });
    const { rootKls, barKls, thumbKls, thumbStyle, thumbTop, update } = useSlider.useSliderDOM(props, {
      namespace: "color-hue-slider",
      maxValue,
      currentValue,
      bar,
      thumb,
      handleDrag
    });
    const { t } = index.useLocale();
    const ariaLabel = vue.computed(() => t("el.colorpicker.hueLabel"));
    const ariaValuetext = vue.computed(() => {
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
              onClick: _cache[0] || (_cache[0] = //@ts-ignore
              (...args) => vue.unref(handleClick) && vue.unref(handleClick)(...args))
            },
            null,
            2
            /* CLASS */
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
//# sourceMappingURL=hue-slider.vue2.js.map
