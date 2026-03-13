import { defineComponent, reactive, computed, toRefs, createElementBlock, openBlock, unref, normalizeStyle, normalizeClass, createVNode, withCtx, createElementVNode, toDisplayString } from 'vue';
import { ElTooltip } from '../../tooltip/index.mjs';
import { sliderButtonEmits, sliderButtonProps } from './button.mjs';
import { useSliderButton } from './composables/use-slider-button.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _hoisted_1 = ["tabindex"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElSliderButton"
  },
  __name: "button",
  props: sliderButtonProps,
  emits: sliderButtonEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("slider");
    const initData = reactive({
      hovering: false,
      dragging: false,
      isClick: false,
      startX: 0,
      currentX: 0,
      startY: 0,
      currentY: 0,
      startPosition: 0,
      newPosition: 0,
      oldValue: props.modelValue
    });
    const tooltipPersistent = computed(
      () => !showTooltip.value ? false : persistent.value
    );
    const {
      disabled,
      button,
      tooltip,
      showTooltip,
      persistent,
      tooltipVisible,
      wrapperStyle,
      formatValue,
      handleMouseEnter,
      handleMouseLeave,
      onButtonDown,
      onKeyDown,
      setPosition
    } = useSliderButton(props, initData, emit);
    const { hovering, dragging } = toRefs(initData);
    __expose({
      onButtonDown,
      onKeyDown,
      setPosition,
      hovering,
      dragging
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "button",
        ref: button,
        class: normalizeClass([unref(ns).e("button-wrapper"), { hover: unref(hovering), dragging: unref(dragging) }]),
        style: normalizeStyle(unref(wrapperStyle)),
        tabindex: unref(disabled) ? void 0 : 0,
        onMouseenter: _cache[0] || (_cache[0] = //@ts-ignore
        (...args) => unref(handleMouseEnter) && unref(handleMouseEnter)(...args)),
        onMouseleave: _cache[1] || (_cache[1] = //@ts-ignore
        (...args) => unref(handleMouseLeave) && unref(handleMouseLeave)(...args)),
        onMousedown: _cache[2] || (_cache[2] = //@ts-ignore
        (...args) => unref(onButtonDown) && unref(onButtonDown)(...args)),
        onFocus: _cache[3] || (_cache[3] = //@ts-ignore
        (...args) => unref(handleMouseEnter) && unref(handleMouseEnter)(...args)),
        onBlur: _cache[4] || (_cache[4] = //@ts-ignore
        (...args) => unref(handleMouseLeave) && unref(handleMouseLeave)(...args)),
        onKeydown: _cache[5] || (_cache[5] = //@ts-ignore
        (...args) => unref(onKeyDown) && unref(onKeyDown)(...args))
      }, [
        createVNode(unref(ElTooltip), {
          ref_key: "tooltip",
          ref: tooltip,
          visible: unref(tooltipVisible),
          placement: _ctx.placement,
          "fallback-placements": ["top", "bottom", "right", "left"],
          "stop-popper-mouse-event": false,
          "popper-class": _ctx.tooltipClass,
          disabled: !unref(showTooltip),
          persistent: tooltipPersistent.value
        }, {
          content: withCtx(() => [
            createElementVNode(
              "span",
              null,
              toDisplayString(unref(formatValue)),
              1
              /* TEXT */
            )
          ]),
          default: withCtx(() => [
            createElementVNode(
              "div",
              {
                class: normalizeClass([unref(ns).e("button"), { hover: unref(hovering), dragging: unref(dragging) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["visible", "placement", "popper-class", "disabled", "persistent"])
      ], 46, _hoisted_1);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=button.vue2.mjs.map
