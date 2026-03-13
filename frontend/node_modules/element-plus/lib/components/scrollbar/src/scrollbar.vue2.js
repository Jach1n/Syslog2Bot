'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var scrollbar = require('./scrollbar.js');
var vue = require('vue');
var core = require('@vueuse/core');
var bar_vue_vue_type_script_setup_true_lang = require('./bar.vue2.js');
var constants = require('./constants.js');
var index = require('../../../hooks/use-namespace/index.js');
var style = require('../../../utils/dom/style.js');
var shared = require('@vue/shared');
var types = require('../../../utils/types.js');
var error = require('../../../utils/error.js');

const _hoisted_1 = ["tabindex"];
const COMPONENT_NAME = "ElScrollbar";
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "scrollbar",
  props: scrollbar.scrollbarProps,
  emits: scrollbar.scrollbarEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = index.useNamespace("scrollbar");
    let stopResizeObserver = void 0;
    let stopWrapResizeObserver = void 0;
    let stopResizeListener = void 0;
    let wrapScrollTop = 0;
    let wrapScrollLeft = 0;
    let direction = "";
    const distanceScrollState = {
      bottom: false,
      top: false,
      right: false,
      left: false
    };
    const scrollbarRef = vue.ref();
    const wrapRef = vue.ref();
    const resizeRef = vue.ref();
    const barRef = vue.ref();
    const wrapStyle = vue.computed(() => {
      const style$1 = {};
      const height = style.addUnit(props.height);
      const maxHeight = style.addUnit(props.maxHeight);
      if (height) style$1.height = height;
      if (maxHeight) style$1.maxHeight = maxHeight;
      return [props.wrapStyle, style$1];
    });
    const wrapKls = vue.computed(() => {
      return [
        props.wrapClass,
        ns.e("wrap"),
        { [ns.em("wrap", "hidden-default")]: !props.native }
      ];
    });
    const resizeKls = vue.computed(() => {
      return [ns.e("view"), props.viewClass];
    });
    const shouldSkipDirection = (direction2) => {
      var _a;
      return (_a = distanceScrollState[direction2]) != null ? _a : false;
    };
    const DIRECTION_PAIRS = {
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    };
    const updateTriggerStatus = (arrivedStates) => {
      const oppositeDirection = DIRECTION_PAIRS[direction];
      if (!oppositeDirection) return;
      const arrived = arrivedStates[direction];
      const oppositeArrived = arrivedStates[oppositeDirection];
      if (arrived && !distanceScrollState[direction]) {
        distanceScrollState[direction] = true;
      }
      if (!oppositeArrived && distanceScrollState[oppositeDirection]) {
        distanceScrollState[oppositeDirection] = false;
      }
    };
    const handleScroll = () => {
      var _a;
      if (wrapRef.value) {
        (_a = barRef.value) == null ? void 0 : _a.handleScroll(wrapRef.value);
        const prevTop = wrapScrollTop;
        const prevLeft = wrapScrollLeft;
        wrapScrollTop = wrapRef.value.scrollTop;
        wrapScrollLeft = wrapRef.value.scrollLeft;
        const arrivedStates = {
          bottom: wrapScrollTop + wrapRef.value.clientHeight >= wrapRef.value.scrollHeight - props.distance,
          top: wrapScrollTop <= props.distance && prevTop !== 0,
          right: wrapScrollLeft + wrapRef.value.clientWidth >= wrapRef.value.scrollWidth - props.distance && prevLeft !== wrapScrollLeft,
          left: wrapScrollLeft <= props.distance && prevLeft !== 0
        };
        emit("scroll", {
          scrollTop: wrapScrollTop,
          scrollLeft: wrapScrollLeft
        });
        if (prevTop !== wrapScrollTop) {
          direction = wrapScrollTop > prevTop ? "bottom" : "top";
        }
        if (prevLeft !== wrapScrollLeft) {
          direction = wrapScrollLeft > prevLeft ? "right" : "left";
        }
        if (props.distance > 0) {
          if (shouldSkipDirection(direction)) {
            return;
          }
          updateTriggerStatus(arrivedStates);
        }
        if (arrivedStates[direction]) emit("end-reached", direction);
      }
    };
    function scrollTo(arg1, arg2) {
      if (shared.isObject(arg1)) {
        wrapRef.value.scrollTo(arg1);
      } else if (types.isNumber(arg1) && types.isNumber(arg2)) {
        wrapRef.value.scrollTo(arg1, arg2);
      }
    }
    const setScrollTop = (value) => {
      if (!types.isNumber(value)) {
        error.debugWarn(COMPONENT_NAME, "value must be a number");
        return;
      }
      wrapRef.value.scrollTop = value;
    };
    const setScrollLeft = (value) => {
      if (!types.isNumber(value)) {
        error.debugWarn(COMPONENT_NAME, "value must be a number");
        return;
      }
      wrapRef.value.scrollLeft = value;
    };
    const update = () => {
      var _a;
      (_a = barRef.value) == null ? void 0 : _a.update();
      distanceScrollState[direction] = false;
    };
    vue.watch(
      () => props.noresize,
      (noresize) => {
        if (noresize) {
          stopResizeObserver == null ? void 0 : stopResizeObserver();
          stopWrapResizeObserver == null ? void 0 : stopWrapResizeObserver();
          stopResizeListener == null ? void 0 : stopResizeListener();
        } else {
          ({ stop: stopResizeObserver } = core.useResizeObserver(resizeRef, update));
          ({ stop: stopWrapResizeObserver } = core.useResizeObserver(wrapRef, update));
          stopResizeListener = core.useEventListener("resize", update);
        }
      },
      { immediate: true }
    );
    vue.watch(
      () => [props.maxHeight, props.height],
      () => {
        if (!props.native)
          vue.nextTick(() => {
            var _a;
            update();
            if (wrapRef.value) {
              (_a = barRef.value) == null ? void 0 : _a.handleScroll(wrapRef.value);
            }
          });
      }
    );
    vue.provide(
      constants.scrollbarContextKey,
      vue.reactive({
        scrollbarElement: scrollbarRef,
        wrapElement: wrapRef
      })
    );
    vue.onActivated(() => {
      if (wrapRef.value) {
        wrapRef.value.scrollTop = wrapScrollTop;
        wrapRef.value.scrollLeft = wrapScrollLeft;
      }
    });
    vue.onMounted(() => {
      if (!props.native)
        vue.nextTick(() => {
          update();
        });
    });
    vue.onUpdated(() => update());
    __expose({
      /** @description scrollbar wrap ref */
      wrapRef,
      /** @description update scrollbar state manually */
      update,
      /** @description scrolls to a particular set of coordinates */
      scrollTo,
      /** @description set distance to scroll top */
      setScrollTop,
      /** @description set distance to scroll left */
      setScrollLeft,
      /** @description handle scroll event */
      handleScroll
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          ref_key: "scrollbarRef",
          ref: scrollbarRef,
          class: vue.normalizeClass(vue.unref(ns).b())
        },
        [
          vue.createElementVNode("div", {
            ref_key: "wrapRef",
            ref: wrapRef,
            class: vue.normalizeClass(wrapKls.value),
            style: vue.normalizeStyle(wrapStyle.value),
            tabindex: __props.tabindex,
            onScroll: handleScroll
          }, [
            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.tag), {
              id: __props.id,
              ref_key: "resizeRef",
              ref: resizeRef,
              class: vue.normalizeClass(resizeKls.value),
              style: vue.normalizeStyle(__props.viewStyle),
              role: __props.role,
              "aria-label": __props.ariaLabel,
              "aria-orientation": __props.ariaOrientation
            }, {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["id", "class", "style", "role", "aria-label", "aria-orientation"]))
          ], 46, _hoisted_1),
          !__props.native ? (vue.openBlock(), vue.createBlock(bar_vue_vue_type_script_setup_true_lang.default, {
            key: 0,
            ref_key: "barRef",
            ref: barRef,
            always: __props.always,
            "min-size": __props.minSize
          }, null, 8, ["always", "min-size"])) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=scrollbar.vue2.js.map
