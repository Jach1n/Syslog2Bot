'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var predefine = require('../props/predefine.js');
var vue = require('vue');
var usePredefine = require('../composables/use-predefine.js');
var index = require('../../../../hooks/use-locale/index.js');

const _hoisted_1 = ["disabled", "aria-label", "onClick"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElColorPredefine"
  },
  __name: "predefine",
  props: predefine.predefineProps,
  setup(__props) {
    const props = __props;
    const { rgbaColors, handleSelect } = usePredefine.usePredefine(props);
    const { rootKls, colorsKls, colorSelectorKls } = usePredefine.usePredefineDOM(props);
    const { t } = index.useLocale();
    const ariaLabel = (value) => {
      return t("el.colorpicker.predefineDescription", { value });
    };
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
              class: vue.normalizeClass(vue.unref(colorsKls))
            },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(vue.unref(rgbaColors), (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("button", {
                    key: __props.colors[index],
                    type: "button",
                    disabled: __props.disabled,
                    "aria-label": ariaLabel(item.value),
                    class: vue.normalizeClass(vue.unref(colorSelectorKls)(item)),
                    onClick: ($event) => vue.unref(handleSelect)(index)
                  }, [
                    vue.createElementVNode(
                      "div",
                      {
                        style: vue.normalizeStyle({ backgroundColor: item.value })
                      },
                      null,
                      4
                      /* STYLE */
                    )
                  ], 10, _hoisted_1);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=predefine.vue2.js.map
