'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mask = require('./mask.js');
var vue = require('vue');
var core = require('@vueuse/core');
var helper = require('./helper.js');
var index = require('../../../hooks/use-lockscreen/index.js');

const _hoisted_1 = { style: {
  width: "100%",
  height: "100%"
} };
const _hoisted_2 = ["d"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElTourMask",
    inheritAttrs: false
  },
  __name: "mask",
  props: mask.maskProps,
  setup(__props) {
    const props = __props;
    const { ns } = vue.inject(helper.tourKey);
    const radius = vue.computed(() => {
      var _a, _b;
      return (_b = (_a = props.pos) == null ? void 0 : _a.radius) != null ? _b : 2;
    });
    const roundInfo = vue.computed(() => {
      const v = radius.value;
      const baseInfo = `a${v},${v} 0 0 1`;
      return {
        topRight: `${baseInfo} ${v},${v}`,
        bottomRight: `${baseInfo} ${-v},${v}`,
        bottomLeft: `${baseInfo} ${-v},${-v}`,
        topLeft: `${baseInfo} ${v},${-v}`
      };
    });
    const { width: windowWidth, height: windowHeight } = core.useWindowSize();
    const path = vue.computed(() => {
      const width = windowWidth.value;
      const height = windowHeight.value;
      const info = roundInfo.value;
      const _path = `M${width},0 L0,0 L0,${height} L${width},${height} L${width},0 Z`;
      const _radius = radius.value;
      return props.pos ? `${_path} M${props.pos.left + _radius},${props.pos.top} h${props.pos.width - _radius * 2} ${info.topRight} v${props.pos.height - _radius * 2} ${info.bottomRight} h${-props.pos.width + _radius * 2} ${info.bottomLeft} v${-props.pos.height + _radius * 2} ${info.topLeft} z` : _path;
    });
    const maskStyle = vue.computed(() => ({
      position: "fixed",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: props.zIndex,
      pointerEvents: props.pos && props.targetAreaClickable ? "none" : "auto"
    }));
    const pathStyle = vue.computed(() => ({
      fill: props.fill,
      pointerEvents: "auto",
      cursor: "auto"
    }));
    index.useLockscreen(vue.toRef(props, "visible"), {
      ns
    });
    return (_ctx, _cache) => {
      return __props.visible ? (vue.openBlock(), vue.createElementBlock(
        "div",
        vue.mergeProps({
          key: 0,
          class: vue.unref(ns).e("mask"),
          style: maskStyle.value
        }, _ctx.$attrs),
        [
          (vue.openBlock(), vue.createElementBlock("svg", _hoisted_1, [
            vue.createElementVNode("path", {
              class: vue.normalizeClass(vue.unref(ns).e("hollow")),
              style: vue.normalizeStyle(pathStyle.value),
              d: path.value
            }, null, 14, _hoisted_2)
          ]))
        ],
        16
        /* FULL_PROPS */
      )) : vue.createCommentVNode("v-if", true);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=mask.vue2.js.map
