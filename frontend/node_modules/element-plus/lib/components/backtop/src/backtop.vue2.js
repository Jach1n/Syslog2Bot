'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var backtop = require('./backtop.js');
var vue = require('vue');
var index$1 = require('../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var useBacktop = require('./use-backtop.js');
var index = require('../../../hooks/use-namespace/index.js');

const COMPONENT_NAME = "ElBacktop";
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "backtop",
  props: backtop.backtopProps,
  emits: backtop.backtopEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = index.useNamespace("backtop");
    const { handleClick, visible } = useBacktop.useBackTop(props, emit, COMPONENT_NAME);
    const backTopStyle = vue.computed(() => ({
      right: `${props.right}px`,
      bottom: `${props.bottom}px`
    }));
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.Transition, {
        name: `${vue.unref(ns).namespace.value}-fade-in`
      }, {
        default: vue.withCtx(() => [
          vue.unref(visible) ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              style: vue.normalizeStyle(backTopStyle.value),
              class: vue.normalizeClass(vue.unref(ns).b()),
              onClick: _cache[0] || (_cache[0] = vue.withModifiers(
                //@ts-ignore
                (...args) => vue.unref(handleClick) && vue.unref(handleClick)(...args),
                ["stop"]
              ))
            },
            [
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                vue.createVNode(vue.unref(index$1.ElIcon), {
                  class: vue.normalizeClass(vue.unref(ns).e("icon"))
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(vue.unref(iconsVue.CaretTop))
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["class"])
              ])
            ],
            6
            /* CLASS, STYLE */
          )) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["name"]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=backtop.vue2.js.map
