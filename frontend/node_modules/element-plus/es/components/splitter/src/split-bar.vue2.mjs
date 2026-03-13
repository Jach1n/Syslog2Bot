import { defineComponent, computed, ref, createElementBlock, openBlock, normalizeStyle, normalizeClass, unref, createCommentVNode, createElementVNode, renderSlot, createBlock, resolveDynamicComponent } from 'vue';
import { ArrowLeft, ArrowUp, ArrowRight, ArrowDown } from '@element-plus/icons-vue';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElSplitterBar"
  },
  __name: "split-bar",
  props: {
    index: {
      type: Number,
      required: true
    },
    layout: {
      type: String,
      values: ["horizontal", "vertical"],
      default: "horizontal"
    },
    resizable: {
      type: Boolean,
      default: true
    },
    lazy: Boolean,
    startCollapsible: Boolean,
    endCollapsible: Boolean
  },
  emits: ["moveStart", "moving", "moveEnd", "collapse"],
  setup(__props, { emit: __emit }) {
    const ns = useNamespace("splitter-bar");
    const props = __props;
    const emit = __emit;
    const isHorizontal = computed(() => props.layout === "horizontal");
    const barWrapStyles = computed(() => {
      if (isHorizontal.value) {
        return { width: 0 };
      }
      return { height: 0 };
    });
    const draggerStyles = computed(() => {
      return {
        width: isHorizontal.value ? "16px" : "100%",
        height: isHorizontal.value ? "100%" : "16px",
        cursor: !props.resizable ? "auto" : isHorizontal.value ? "ew-resize" : "ns-resize",
        touchAction: "none"
      };
    });
    const draggerPseudoClass = computed(() => {
      const prefix = ns.e("dragger");
      return {
        [`${prefix}-horizontal`]: isHorizontal.value,
        [`${prefix}-vertical`]: !isHorizontal.value,
        [`${prefix}-active`]: !!startPos.value
      };
    });
    const startPos = ref(null);
    const onMousedown = (e) => {
      if (!props.resizable) return;
      startPos.value = [e.pageX, e.pageY];
      emit("moveStart", props.index);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("mousemove", onMouseMove);
    };
    const onTouchStart = (e) => {
      if (props.resizable && e.touches.length === 1) {
        e.preventDefault();
        const touch = e.touches[0];
        startPos.value = [touch.pageX, touch.pageY];
        emit("moveStart", props.index);
        window.addEventListener("touchend", onTouchEnd);
        window.addEventListener("touchmove", onTouchMove);
      }
    };
    const onMouseMove = (e) => {
      const { pageX, pageY } = e;
      const offsetX = pageX - startPos.value[0];
      const offsetY = pageY - startPos.value[1];
      const offset = isHorizontal.value ? offsetX : offsetY;
      emit("moving", props.index, offset);
    };
    const onTouchMove = (e) => {
      if (e.touches.length === 1) {
        e.preventDefault();
        const touch = e.touches[0];
        const offsetX = touch.pageX - startPos.value[0];
        const offsetY = touch.pageY - startPos.value[1];
        const offset = isHorizontal.value ? offsetX : offsetY;
        emit("moving", props.index, offset);
      }
    };
    const onMouseUp = () => {
      startPos.value = null;
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      emit("moveEnd", props.index);
    };
    const onTouchEnd = () => {
      startPos.value = null;
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchmove", onTouchMove);
      emit("moveEnd", props.index);
    };
    const StartIcon = computed(() => isHorizontal.value ? ArrowLeft : ArrowUp);
    const EndIcon = computed(() => isHorizontal.value ? ArrowRight : ArrowDown);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([unref(ns).b()]),
          style: normalizeStyle(barWrapStyles.value)
        },
        [
          __props.startCollapsible ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass([unref(ns).e("collapse-icon"), unref(ns).e(`${__props.layout}-collapse-icon-start`)]),
              onClick: _cache[0] || (_cache[0] = ($event) => emit("collapse", __props.index, "start"))
            },
            [
              renderSlot(_ctx.$slots, "start-collapsible", {}, () => [
                (openBlock(), createBlock(resolveDynamicComponent(StartIcon.value), { style: { "width": "12px", "height": "12px" } }))
              ])
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true),
          createElementVNode(
            "div",
            {
              class: normalizeClass([
                unref(ns).e("dragger"),
                draggerPseudoClass.value,
                unref(ns).is("disabled", !__props.resizable),
                unref(ns).is("lazy", __props.resizable && __props.lazy)
              ]),
              style: normalizeStyle(draggerStyles.value),
              onMousedown,
              onTouchstart: onTouchStart
            },
            null,
            38
            /* CLASS, STYLE, NEED_HYDRATION */
          ),
          __props.endCollapsible ? (openBlock(), createElementBlock(
            "div",
            {
              key: 1,
              class: normalizeClass([unref(ns).e("collapse-icon"), unref(ns).e(`${__props.layout}-collapse-icon-end`)]),
              onClick: _cache[1] || (_cache[1] = ($event) => emit("collapse", __props.index, "end"))
            },
            [
              renderSlot(_ctx.$slots, "end-collapsible", {}, () => [
                (openBlock(), createBlock(resolveDynamicComponent(EndIcon.value), { style: { "width": "12px", "height": "12px" } }))
              ])
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=split-bar.vue2.mjs.map
