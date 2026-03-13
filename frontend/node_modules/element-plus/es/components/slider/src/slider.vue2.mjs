import { defineComponent, reactive, computed, toRefs, provide, createElementBlock, openBlock, normalizeClass, unref, createElementVNode, createBlock, createCommentVNode, normalizeStyle, createVNode, Fragment, renderList, withModifiers } from 'vue';
import { useEventListener } from '@vueuse/core';
import { ElInputNumber } from '../../input-number/index.mjs';
import { sliderContextKey } from './constants.mjs';
import { sliderEmits, sliderProps } from './slider.mjs';
import _sfc_main$1 from './button.vue2.mjs';
import SliderMarker from './marker.mjs';
import { useSlide } from './composables/use-slide.mjs';
import { useStops } from './composables/use-stops.mjs';
import { useMarks } from './composables/use-marks.mjs';
import { useWatch } from './composables/use-watch.mjs';
import { useLifecycle } from './composables/use-lifecycle.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';
import { useFormItemInputId } from '../../form/src/hooks/use-form-item.mjs';
import { useFormSize } from '../../form/src/hooks/use-form-common-props.mjs';

const _hoisted_1 = ["id", "role", "aria-label", "aria-labelledby"];
const _hoisted_2 = { key: 1 };
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElSlider"
  },
  __name: "slider",
  props: sliderProps,
  emits: sliderEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("slider");
    const { t } = useLocale();
    const initData = reactive({
      firstValue: 0,
      secondValue: 0,
      oldValue: 0,
      dragging: false,
      sliderSize: 1
    });
    const {
      elFormItem,
      slider,
      firstButton,
      secondButton,
      sliderDisabled,
      minValue,
      maxValue,
      runwayStyle,
      barStyle,
      resetSize,
      emitChange,
      onSliderWrapperPrevent,
      onSliderClick,
      onSliderDown,
      onSliderMarkerDown,
      setFirstValue,
      setSecondValue
    } = useSlide(props, initData, emit);
    const { stops, getStopStyle } = useStops(props, initData, minValue, maxValue);
    const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
      formItemContext: elFormItem
    });
    const sliderWrapperSize = useFormSize();
    const sliderInputSize = computed(
      () => props.inputSize || sliderWrapperSize.value
    );
    const groupLabel = computed(() => {
      return props.ariaLabel || t("el.slider.defaultLabel", {
        min: props.min,
        max: props.max
      });
    });
    const firstButtonLabel = computed(() => {
      if (props.range) {
        return props.rangeStartLabel || t("el.slider.defaultRangeStartLabel");
      } else {
        return groupLabel.value;
      }
    });
    const firstValueText = computed(() => {
      return props.formatValueText ? props.formatValueText(firstValue.value) : `${firstValue.value}`;
    });
    const secondButtonLabel = computed(() => {
      return props.rangeEndLabel || t("el.slider.defaultRangeEndLabel");
    });
    const secondValueText = computed(() => {
      return props.formatValueText ? props.formatValueText(secondValue.value) : `${secondValue.value}`;
    });
    const sliderKls = computed(() => [
      ns.b(),
      ns.m(sliderWrapperSize.value),
      ns.is("vertical", props.vertical),
      { [ns.m("with-input")]: props.showInput }
    ]);
    const markList = useMarks(props);
    useWatch(props, initData, minValue, maxValue, emit, elFormItem);
    const precision = computed(() => {
      const precisions = [props.min, props.max, props.step].map((item) => {
        const decimal = `${item}`.split(".")[1];
        return decimal ? decimal.length : 0;
      });
      return Math.max.apply(null, precisions);
    });
    const { sliderWrapper } = useLifecycle(props, initData, resetSize);
    const { firstValue, secondValue, sliderSize } = toRefs(initData);
    const updateDragging = (val) => {
      initData.dragging = val;
    };
    useEventListener(sliderWrapper, "touchstart", onSliderWrapperPrevent, {
      passive: false
    });
    useEventListener(sliderWrapper, "touchmove", onSliderWrapperPrevent, {
      passive: false
    });
    provide(sliderContextKey, {
      ...toRefs(props),
      sliderSize,
      disabled: sliderDisabled,
      precision,
      emitChange,
      resetSize,
      updateDragging
    });
    __expose({
      onSliderClick
    });
    return (_ctx, _cache) => {
      var _a, _b;
      return openBlock(), createElementBlock("div", {
        id: _ctx.range ? unref(inputId) : void 0,
        ref_key: "sliderWrapper",
        ref: sliderWrapper,
        class: normalizeClass(sliderKls.value),
        role: _ctx.range ? "group" : void 0,
        "aria-label": _ctx.range && !unref(isLabeledByFormItem) ? groupLabel.value : void 0,
        "aria-labelledby": _ctx.range && unref(isLabeledByFormItem) ? (_a = unref(elFormItem)) == null ? void 0 : _a.labelId : void 0
      }, [
        createElementVNode(
          "div",
          {
            ref_key: "slider",
            ref: slider,
            class: normalizeClass([
              unref(ns).e("runway"),
              { "show-input": _ctx.showInput && !_ctx.range },
              unref(ns).is("disabled", unref(sliderDisabled))
            ]),
            style: normalizeStyle(unref(runwayStyle)),
            onMousedown: _cache[0] || (_cache[0] = //@ts-ignore
            (...args) => unref(onSliderDown) && unref(onSliderDown)(...args)),
            onTouchstartPassive: _cache[1] || (_cache[1] = //@ts-ignore
            (...args) => unref(onSliderDown) && unref(onSliderDown)(...args))
          },
          [
            createElementVNode(
              "div",
              {
                class: normalizeClass(unref(ns).e("bar")),
                style: normalizeStyle(unref(barStyle))
              },
              null,
              6
              /* CLASS, STYLE */
            ),
            createVNode(_sfc_main$1, {
              id: !_ctx.range ? unref(inputId) : void 0,
              ref_key: "firstButton",
              ref: firstButton,
              "model-value": unref(firstValue),
              vertical: _ctx.vertical,
              "tooltip-class": _ctx.tooltipClass,
              placement: _ctx.placement,
              role: "slider",
              "aria-label": _ctx.range || !unref(isLabeledByFormItem) ? firstButtonLabel.value : void 0,
              "aria-labelledby": !_ctx.range && unref(isLabeledByFormItem) ? (_b = unref(elFormItem)) == null ? void 0 : _b.labelId : void 0,
              "aria-valuemin": _ctx.min,
              "aria-valuemax": _ctx.range ? unref(secondValue) : _ctx.max,
              "aria-valuenow": unref(firstValue),
              "aria-valuetext": firstValueText.value,
              "aria-orientation": _ctx.vertical ? "vertical" : "horizontal",
              "aria-disabled": unref(sliderDisabled),
              "onUpdate:modelValue": unref(setFirstValue)
            }, null, 8, ["id", "model-value", "vertical", "tooltip-class", "placement", "aria-label", "aria-labelledby", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-orientation", "aria-disabled", "onUpdate:modelValue"]),
            _ctx.range ? (openBlock(), createBlock(_sfc_main$1, {
              key: 0,
              ref_key: "secondButton",
              ref: secondButton,
              "model-value": unref(secondValue),
              vertical: _ctx.vertical,
              "tooltip-class": _ctx.tooltipClass,
              placement: _ctx.placement,
              role: "slider",
              "aria-label": secondButtonLabel.value,
              "aria-valuemin": unref(firstValue),
              "aria-valuemax": _ctx.max,
              "aria-valuenow": unref(secondValue),
              "aria-valuetext": secondValueText.value,
              "aria-orientation": _ctx.vertical ? "vertical" : "horizontal",
              "aria-disabled": unref(sliderDisabled),
              "onUpdate:modelValue": unref(setSecondValue)
            }, null, 8, ["model-value", "vertical", "tooltip-class", "placement", "aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-orientation", "aria-disabled", "onUpdate:modelValue"])) : createCommentVNode("v-if", true),
            _ctx.showStops ? (openBlock(), createElementBlock("div", _hoisted_2, [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(unref(stops), (item, key) => {
                  return openBlock(), createElementBlock(
                    "div",
                    {
                      key,
                      class: normalizeClass(unref(ns).e("stop")),
                      style: normalizeStyle(unref(getStopStyle)(item))
                    },
                    null,
                    6
                    /* CLASS, STYLE */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : createCommentVNode("v-if", true),
            unref(markList).length > 0 ? (openBlock(), createElementBlock(
              Fragment,
              { key: 2 },
              [
                createElementVNode("div", null, [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(unref(markList), (item, key) => {
                      return openBlock(), createElementBlock(
                        "div",
                        {
                          key,
                          style: normalizeStyle(unref(getStopStyle)(item.position)),
                          class: normalizeClass([unref(ns).e("stop"), unref(ns).e("marks-stop")])
                        },
                        null,
                        6
                        /* CLASS, STYLE */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                createElementVNode(
                  "div",
                  {
                    class: normalizeClass(unref(ns).e("marks"))
                  },
                  [
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(unref(markList), (item, key) => {
                        return openBlock(), createBlock(unref(SliderMarker), {
                          key,
                          mark: item.mark,
                          style: normalizeStyle(unref(getStopStyle)(item.position)),
                          onMousedown: withModifiers(($event) => unref(onSliderMarkerDown)(item.position), ["stop"])
                        }, null, 8, ["mark", "style", "onMousedown"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ],
                  2
                  /* CLASS */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            )) : createCommentVNode("v-if", true)
          ],
          38
          /* CLASS, STYLE, NEED_HYDRATION */
        ),
        _ctx.showInput && !_ctx.range ? (openBlock(), createBlock(unref(ElInputNumber), {
          key: 0,
          ref: "input",
          "model-value": unref(firstValue),
          class: normalizeClass(unref(ns).e("input")),
          step: _ctx.step,
          disabled: unref(sliderDisabled),
          controls: _ctx.showInputControls,
          min: _ctx.min,
          max: _ctx.max,
          precision: precision.value,
          size: sliderInputSize.value,
          "onUpdate:modelValue": unref(setFirstValue),
          onChange: unref(emitChange)
        }, null, 8, ["model-value", "class", "step", "disabled", "controls", "min", "max", "precision", "size", "onUpdate:modelValue", "onChange"])) : createCommentVNode("v-if", true)
      ], 10, _hoisted_1);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=slider.vue2.mjs.map
