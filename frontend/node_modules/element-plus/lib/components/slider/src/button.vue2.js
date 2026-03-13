'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$1 = require('../../tooltip/index.js');
var button = require('./button.js');
var useSliderButton = require('./composables/use-slider-button.js');
var index = require('../../../hooks/use-namespace/index.js');

const _hoisted_1 = ["tabindex"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElSliderButton"
  },
  __name: "button",
  props: button.sliderButtonProps,
  emits: button.sliderButtonEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = index.useNamespace("slider");
    const initData = vue.reactive({
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
    const tooltipPersistent = vue.computed(
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
    } = useSliderButton.useSliderButton(props, initData, emit);
    const { hovering, dragging } = vue.toRefs(initData);
    __expose({
      onButtonDown,
      onKeyDown,
      setPosition,
      hovering,
      dragging
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", {
        ref_key: "button",
        ref: button,
        class: vue.normalizeClass([vue.unref(ns).e("button-wrapper"), { hover: vue.unref(hovering), dragging: vue.unref(dragging) }]),
        style: vue.normalizeStyle(vue.unref(wrapperStyle)),
        tabindex: vue.unref(disabled) ? void 0 : 0,
        onMouseenter: _cache[0] || (_cache[0] = //@ts-ignore
        (...args) => vue.unref(handleMouseEnter) && vue.unref(handleMouseEnter)(...args)),
        onMouseleave: _cache[1] || (_cache[1] = //@ts-ignore
        (...args) => vue.unref(handleMouseLeave) && vue.unref(handleMouseLeave)(...args)),
        onMousedown: _cache[2] || (_cache[2] = //@ts-ignore
        (...args) => vue.unref(onButtonDown) && vue.unref(onButtonDown)(...args)),
        onFocus: _cache[3] || (_cache[3] = //@ts-ignore
        (...args) => vue.unref(handleMouseEnter) && vue.unref(handleMouseEnter)(...args)),
        onBlur: _cache[4] || (_cache[4] = //@ts-ignore
        (...args) => vue.unref(handleMouseLeave) && vue.unref(handleMouseLeave)(...args)),
        onKeydown: _cache[5] || (_cache[5] = //@ts-ignore
        (...args) => vue.unref(onKeyDown) && vue.unref(onKeyDown)(...args))
      }, [
        vue.createVNode(vue.unref(index$1.ElTooltip), {
          ref_key: "tooltip",
          ref: tooltip,
          visible: vue.unref(tooltipVisible),
          placement: _ctx.placement,
          "fallback-placements": ["top", "bottom", "right", "left"],
          "stop-popper-mouse-event": false,
          "popper-class": _ctx.tooltipClass,
          disabled: !vue.unref(showTooltip),
          persistent: tooltipPersistent.value
        }, {
          content: vue.withCtx(() => [
            vue.createElementVNode(
              "span",
              null,
              vue.toDisplayString(vue.unref(formatValue)),
              1
              /* TEXT */
            )
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass([vue.unref(ns).e("button"), { hover: vue.unref(hovering), dragging: vue.unref(dragging) }])
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

exports.default = _sfc_main;
//# sourceMappingURL=button.vue2.js.map
