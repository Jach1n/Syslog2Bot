'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var collapseItem = require('./collapse-item.js');
var vue = require('vue');
var index$1 = require('../../collapse-transition/index.js');
var index = require('../../icon/index.js');
var useCollapseItem = require('./use-collapse-item.js');

const _hoisted_1 = ["id", "aria-expanded", "aria-controls", "aria-describedby", "tabindex", "aria-disabled"];
const _hoisted_2 = ["id", "aria-hidden", "aria-labelledby"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElCollapseItem"
  },
  __name: "collapse-item",
  props: collapseItem.collapseItemProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const {
      focusing,
      id,
      isActive,
      handleFocus,
      handleHeaderClick,
      handleEnterClick
    } = useCollapseItem.useCollapseItem(props);
    const {
      arrowKls,
      headKls,
      rootKls,
      itemTitleKls,
      itemWrapperKls,
      itemContentKls,
      scopedContentId,
      scopedHeadId
    } = useCollapseItem.useCollapseItemDOM(props, { focusing, isActive, id });
    __expose({
      /** @description current collapse-item whether active */
      isActive
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(vue.unref(rootKls))
        },
        [
          vue.createElementVNode("div", {
            id: vue.unref(scopedHeadId),
            class: vue.normalizeClass(vue.unref(headKls)),
            "aria-expanded": vue.unref(isActive),
            "aria-controls": vue.unref(scopedContentId),
            "aria-describedby": vue.unref(scopedContentId),
            tabindex: __props.disabled ? void 0 : 0,
            "aria-disabled": __props.disabled,
            role: "button",
            onClick: _cache[0] || (_cache[0] = //@ts-ignore
            (...args) => vue.unref(handleHeaderClick) && vue.unref(handleHeaderClick)(...args)),
            onKeydown: _cache[1] || (_cache[1] = vue.withKeys(vue.withModifiers(
              //@ts-ignore
              (...args) => vue.unref(handleEnterClick) && vue.unref(handleEnterClick)(...args),
              ["stop"]
            ), ["space", "enter"])),
            onFocus: _cache[2] || (_cache[2] = //@ts-ignore
            (...args) => vue.unref(handleFocus) && vue.unref(handleFocus)(...args)),
            onBlur: _cache[3] || (_cache[3] = ($event) => focusing.value = false)
          }, [
            vue.createElementVNode(
              "span",
              {
                class: vue.normalizeClass(vue.unref(itemTitleKls))
              },
              [
                vue.renderSlot(_ctx.$slots, "title", { isActive: vue.unref(isActive) }, () => [
                  vue.createTextVNode(
                    vue.toDisplayString(__props.title),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            ),
            vue.renderSlot(_ctx.$slots, "icon", { isActive: vue.unref(isActive) }, () => [
              vue.createVNode(vue.unref(index.ElIcon), {
                class: vue.normalizeClass(vue.unref(arrowKls))
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.icon)))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class"])
            ])
          ], 42, _hoisted_1),
          vue.createVNode(vue.unref(index$1.ElCollapseTransition), null, {
            default: vue.withCtx(() => [
              vue.withDirectives(vue.createElementVNode("div", {
                id: vue.unref(scopedContentId),
                role: "region",
                class: vue.normalizeClass(vue.unref(itemWrapperKls)),
                "aria-hidden": !vue.unref(isActive),
                "aria-labelledby": vue.unref(scopedHeadId)
              }, [
                vue.createElementVNode(
                  "div",
                  {
                    class: vue.normalizeClass(vue.unref(itemContentKls))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default")
                  ],
                  2
                  /* CLASS */
                )
              ], 10, _hoisted_2), [
                [vue.vShow, vue.unref(isActive)]
              ])
            ]),
            _: 3
            /* FORWARDED */
          })
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=collapse-item.vue2.js.map
