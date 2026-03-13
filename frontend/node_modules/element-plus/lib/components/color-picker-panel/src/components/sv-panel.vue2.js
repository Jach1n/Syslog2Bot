'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var svPanel = require('../props/sv-panel.js');
var vue = require('vue');
var index = require('../../../../hooks/use-locale/index.js');
var useSvPanel = require('../composables/use-sv-panel.js');

const _hoisted_1 = ["tabindex", "aria-disabled", "aria-label", "aria-valuenow", "aria-valuetext"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElSvPanel"
  },
  __name: "sv-panel",
  props: svPanel.svPanelProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const {
      cursorRef,
      cursorTop,
      cursorLeft,
      background,
      saturation,
      brightness,
      handleClick,
      handleDrag,
      handleKeydown
    } = useSvPanel.useSvPanel(props);
    const { rootKls, cursorKls, rootStyle, cursorStyle, update } = useSvPanel.useSvPanelDOM(
      props,
      {
        cursorTop,
        cursorLeft,
        background,
        handleDrag
      }
    );
    const { t } = index.useLocale();
    const ariaLabel = vue.computed(() => t("el.colorpicker.svLabel"));
    const ariaValuetext = vue.computed(() => {
      return t("el.colorpicker.svDescription", {
        saturation: saturation.value,
        brightness: brightness.value,
        color: props.color.value
      });
    });
    __expose({
      /**
       * @description update sv panel manually
       */
      update
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(vue.unref(rootKls)),
          style: vue.normalizeStyle(vue.unref(rootStyle)),
          onClick: _cache[1] || (_cache[1] = //@ts-ignore
          (...args) => vue.unref(handleClick) && vue.unref(handleClick)(...args))
        },
        [
          vue.createElementVNode("div", {
            ref_key: "cursorRef",
            ref: cursorRef,
            class: vue.normalizeClass(vue.unref(cursorKls)),
            style: vue.normalizeStyle(vue.unref(cursorStyle)),
            tabindex: __props.disabled ? void 0 : 0,
            "aria-disabled": __props.disabled,
            role: "slider",
            "aria-valuemin": "0,0",
            "aria-valuemax": "100,100",
            "aria-label": ariaLabel.value,
            "aria-valuenow": `${vue.unref(saturation)},${vue.unref(brightness)}`,
            "aria-valuetext": ariaValuetext.value,
            onKeydown: _cache[0] || (_cache[0] = //@ts-ignore
            (...args) => vue.unref(handleKeydown) && vue.unref(handleKeydown)(...args))
          }, null, 46, _hoisted_1)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=sv-panel.vue2.js.map
