'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var thumb = require('./thumb.js');
var vue = require('vue');
var core = require('@vueuse/core');
var constants = require('./constants.js');
var util = require('./util.js');
var index = require('../../../hooks/use-namespace/index.js');
var error = require('../../../utils/error.js');

const COMPONENT_NAME = "Thumb";
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "thumb",
  props: thumb.thumbProps,
  setup(__props) {
    const props = __props;
    const scrollbar = vue.inject(constants.scrollbarContextKey);
    const ns = index.useNamespace("scrollbar");
    if (!scrollbar) error.throwError(COMPONENT_NAME, "can not inject scrollbar context");
    const instance = vue.ref();
    const thumb = vue.ref();
    const thumbState = vue.ref({});
    const visible = vue.ref(false);
    let cursorDown = false;
    let cursorLeave = false;
    let baseScrollHeight = 0;
    let baseScrollWidth = 0;
    let originalOnSelectStart = core.isClient ? document.onselectstart : null;
    const bar = vue.computed(() => util.BAR_MAP[props.vertical ? "vertical" : "horizontal"]);
    const thumbStyle = vue.computed(
      () => util.renderThumbStyle({
        size: props.size,
        move: props.move,
        bar: bar.value
      })
    );
    const offsetRatio = vue.computed(
      () => (
        // offsetRatioX = original width of thumb / current width of thumb / ratioX
        // offsetRatioY = original height of thumb / current height of thumb / ratioY
        // instance height = wrap height - GAP
        instance.value[bar.value.offset] ** 2 / scrollbar.wrapElement[bar.value.scrollSize] / props.ratio / thumb.value[bar.value.offset]
      )
    );
    const clickThumbHandler = (e) => {
      var _a;
      e.stopPropagation();
      if (e.ctrlKey || [1, 2].includes(e.button)) return;
      (_a = window.getSelection()) == null ? void 0 : _a.removeAllRanges();
      startDrag(e);
      const el = e.currentTarget;
      if (!el) return;
      thumbState.value[bar.value.axis] = el[bar.value.offset] - (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction]);
    };
    const clickTrackHandler = (e) => {
      if (!thumb.value || !instance.value || !scrollbar.wrapElement) return;
      const offset = Math.abs(
        e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]
      );
      const thumbHalf = thumb.value[bar.value.offset] / 2;
      const thumbPositionPercentage = (offset - thumbHalf) * 100 * offsetRatio.value / instance.value[bar.value.offset];
      scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize] / 100;
    };
    const startDrag = (e) => {
      e.stopImmediatePropagation();
      cursorDown = true;
      baseScrollHeight = scrollbar.wrapElement.scrollHeight;
      baseScrollWidth = scrollbar.wrapElement.scrollWidth;
      document.addEventListener("mousemove", mouseMoveDocumentHandler);
      document.addEventListener("mouseup", mouseUpDocumentHandler);
      originalOnSelectStart = document.onselectstart;
      document.onselectstart = () => false;
    };
    const mouseMoveDocumentHandler = (e) => {
      if (!instance.value || !thumb.value) return;
      if (cursorDown === false) return;
      const prevPage = thumbState.value[bar.value.axis];
      if (!prevPage) return;
      const offset = (instance.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1;
      const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
      const thumbPositionPercentage = (offset - thumbClickPosition) * 100 * offsetRatio.value / instance.value[bar.value.offset];
      if (bar.value.scroll === "scrollLeft") {
        scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * baseScrollWidth / 100;
      } else {
        scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * baseScrollHeight / 100;
      }
    };
    const mouseUpDocumentHandler = () => {
      cursorDown = false;
      thumbState.value[bar.value.axis] = 0;
      document.removeEventListener("mousemove", mouseMoveDocumentHandler);
      document.removeEventListener("mouseup", mouseUpDocumentHandler);
      restoreOnselectstart();
      if (cursorLeave) visible.value = false;
    };
    const mouseMoveScrollbarHandler = () => {
      cursorLeave = false;
      visible.value = !!props.size;
    };
    const mouseLeaveScrollbarHandler = () => {
      cursorLeave = true;
      visible.value = cursorDown;
    };
    vue.onBeforeUnmount(() => {
      restoreOnselectstart();
      document.removeEventListener("mouseup", mouseUpDocumentHandler);
    });
    const restoreOnselectstart = () => {
      if (document.onselectstart !== originalOnSelectStart)
        document.onselectstart = originalOnSelectStart;
    };
    core.useEventListener(
      vue.toRef(scrollbar, "scrollbarElement"),
      "mousemove",
      mouseMoveScrollbarHandler
    );
    core.useEventListener(
      vue.toRef(scrollbar, "scrollbarElement"),
      "mouseleave",
      mouseLeaveScrollbarHandler
    );
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.Transition, {
        name: vue.unref(ns).b("fade"),
        persisted: ""
      }, {
        default: vue.withCtx(() => [
          vue.withDirectives(vue.createElementVNode(
            "div",
            {
              ref_key: "instance",
              ref: instance,
              class: vue.normalizeClass([vue.unref(ns).e("bar"), vue.unref(ns).is(bar.value.key)]),
              onMousedown: clickTrackHandler,
              onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
              }, ["stop"]))
            },
            [
              vue.createElementVNode(
                "div",
                {
                  ref_key: "thumb",
                  ref: thumb,
                  class: vue.normalizeClass(vue.unref(ns).e("thumb")),
                  style: vue.normalizeStyle(thumbStyle.value),
                  onMousedown: clickThumbHandler
                },
                null,
                38
                /* CLASS, STYLE, NEED_HYDRATION */
              )
            ],
            34
            /* CLASS, NEED_HYDRATION */
          ), [
            [vue.vShow, __props.always || visible.value]
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["name"]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=thumb.vue2.js.map
