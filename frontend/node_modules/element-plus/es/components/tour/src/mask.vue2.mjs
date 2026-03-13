import { maskProps } from './mask.mjs';
import { defineComponent, inject, computed, toRef, createElementBlock, createCommentVNode, openBlock, mergeProps, unref, createElementVNode, normalizeStyle, normalizeClass } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { tourKey } from './helper.mjs';
import { useLockscreen } from '../../../hooks/use-lockscreen/index.mjs';

const _hoisted_1 = { style: {
  width: "100%",
  height: "100%"
} };
const _hoisted_2 = ["d"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElTourMask",
    inheritAttrs: false
  },
  __name: "mask",
  props: maskProps,
  setup(__props) {
    const props = __props;
    const { ns } = inject(tourKey);
    const radius = computed(() => {
      var _a, _b;
      return (_b = (_a = props.pos) == null ? void 0 : _a.radius) != null ? _b : 2;
    });
    const roundInfo = computed(() => {
      const v = radius.value;
      const baseInfo = `a${v},${v} 0 0 1`;
      return {
        topRight: `${baseInfo} ${v},${v}`,
        bottomRight: `${baseInfo} ${-v},${v}`,
        bottomLeft: `${baseInfo} ${-v},${-v}`,
        topLeft: `${baseInfo} ${v},${-v}`
      };
    });
    const { width: windowWidth, height: windowHeight } = useWindowSize();
    const path = computed(() => {
      const width = windowWidth.value;
      const height = windowHeight.value;
      const info = roundInfo.value;
      const _path = `M${width},0 L0,0 L0,${height} L${width},${height} L${width},0 Z`;
      const _radius = radius.value;
      return props.pos ? `${_path} M${props.pos.left + _radius},${props.pos.top} h${props.pos.width - _radius * 2} ${info.topRight} v${props.pos.height - _radius * 2} ${info.bottomRight} h${-props.pos.width + _radius * 2} ${info.bottomLeft} v${-props.pos.height + _radius * 2} ${info.topLeft} z` : _path;
    });
    const maskStyle = computed(() => ({
      position: "fixed",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: props.zIndex,
      pointerEvents: props.pos && props.targetAreaClickable ? "none" : "auto"
    }));
    const pathStyle = computed(() => ({
      fill: props.fill,
      pointerEvents: "auto",
      cursor: "auto"
    }));
    useLockscreen(toRef(props, "visible"), {
      ns
    });
    return (_ctx, _cache) => {
      return __props.visible ? (openBlock(), createElementBlock(
        "div",
        mergeProps({
          key: 0,
          class: unref(ns).e("mask"),
          style: maskStyle.value
        }, _ctx.$attrs),
        [
          (openBlock(), createElementBlock("svg", _hoisted_1, [
            createElementVNode("path", {
              class: normalizeClass(unref(ns).e("hollow")),
              style: normalizeStyle(pathStyle.value),
              d: path.value
            }, null, 14, _hoisted_2)
          ]))
        ],
        16
        /* FULL_PROPS */
      )) : createCommentVNode("v-if", true);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=mask.vue2.mjs.map
