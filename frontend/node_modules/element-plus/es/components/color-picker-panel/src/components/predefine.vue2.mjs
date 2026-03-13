import { predefineProps } from '../props/predefine.mjs';
import { defineComponent, createElementBlock, openBlock, normalizeClass, unref, createElementVNode, Fragment, renderList, normalizeStyle } from 'vue';
import { usePredefine, usePredefineDOM } from '../composables/use-predefine.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';

const _hoisted_1 = ["disabled", "aria-label", "onClick"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElColorPredefine"
  },
  __name: "predefine",
  props: predefineProps,
  setup(__props) {
    const props = __props;
    const { rgbaColors, handleSelect } = usePredefine(props);
    const { rootKls, colorsKls, colorSelectorKls } = usePredefineDOM(props);
    const { t } = useLocale();
    const ariaLabel = (value) => {
      return t("el.colorpicker.predefineDescription", { value });
    };
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
              class: normalizeClass(unref(colorsKls))
            },
            [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(unref(rgbaColors), (item, index) => {
                  return openBlock(), createElementBlock("button", {
                    key: __props.colors[index],
                    type: "button",
                    disabled: __props.disabled,
                    "aria-label": ariaLabel(item.value),
                    class: normalizeClass(unref(colorSelectorKls)(item)),
                    onClick: ($event) => unref(handleSelect)(index)
                  }, [
                    createElementVNode(
                      "div",
                      {
                        style: normalizeStyle({ backgroundColor: item.value })
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

export { _sfc_main as default };
//# sourceMappingURL=predefine.vue2.mjs.map
