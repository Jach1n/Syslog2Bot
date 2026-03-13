'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var imageViewer = require('./image-viewer.js');
var vue = require('vue');
var core = require('@vueuse/core');
var lodashUnified = require('lodash-unified');
var focusTrap = require('../../focus-trap/src/focus-trap.vue.js');
var index$4 = require('../../teleport/index.js');
var index$5 = require('../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var index = require('../../../hooks/use-locale/index.js');
var index$1 = require('../../../hooks/use-namespace/index.js');
var index$2 = require('../../../hooks/use-z-index/index.js');
var index$3 = require('../../../hooks/use-lockscreen/index.js');
var event = require('../../../utils/dom/event.js');
var aria = require('../../../constants/aria.js');
var objects = require('../../../utils/objects.js');

const _hoisted_1 = ["src", "crossorigin"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElImageViewer"
  },
  __name: "image-viewer",
  props: imageViewer.imageViewerProps,
  emits: imageViewer.imageViewerEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    var _a;
    const modes = {
      CONTAIN: {
        name: "contain",
        icon: vue.markRaw(iconsVue.FullScreen)
      },
      ORIGINAL: {
        name: "original",
        icon: vue.markRaw(iconsVue.ScaleToOriginal)
      }
    };
    const props = __props;
    const emit = __emit;
    let stopWheelListener;
    const { t } = index.useLocale();
    const ns = index$1.useNamespace("image-viewer");
    const { nextZIndex } = index$2.useZIndex();
    const wrapper = vue.ref();
    const imgRef = vue.ref();
    const scopeEventListener = vue.effectScope();
    const scaleClamped = vue.computed(() => {
      const { scale, minScale, maxScale } = props;
      return core.clamp(scale, minScale, maxScale);
    });
    const loading = vue.ref(true);
    const loadError = vue.ref(false);
    const visible = vue.ref(false);
    const activeIndex = vue.ref(props.initialIndex);
    const mode = vue.shallowRef(modes.CONTAIN);
    const transform = vue.ref({
      scale: scaleClamped.value,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      enableTransition: false
    });
    const zIndex = vue.ref((_a = props.zIndex) != null ? _a : nextZIndex());
    index$3.useLockscreen(visible, { ns });
    const isSingle = vue.computed(() => {
      const { urlList } = props;
      return urlList.length <= 1;
    });
    const isFirst = vue.computed(() => activeIndex.value === 0);
    const isLast = vue.computed(() => activeIndex.value === props.urlList.length - 1);
    const currentImg = vue.computed(() => props.urlList[activeIndex.value]);
    const arrowPrevKls = vue.computed(() => [
      ns.e("btn"),
      ns.e("prev"),
      ns.is("disabled", !props.infinite && isFirst.value)
    ]);
    const arrowNextKls = vue.computed(() => [
      ns.e("btn"),
      ns.e("next"),
      ns.is("disabled", !props.infinite && isLast.value)
    ]);
    const imgStyle = vue.computed(() => {
      const { scale, deg, offsetX, offsetY, enableTransition } = transform.value;
      let translateX = offsetX / scale;
      let translateY = offsetY / scale;
      const radian = deg * Math.PI / 180;
      const cosRadian = Math.cos(radian);
      const sinRadian = Math.sin(radian);
      translateX = translateX * cosRadian + translateY * sinRadian;
      translateY = translateY * cosRadian - offsetX / scale * sinRadian;
      const style = {
        transform: `scale(${scale}) rotate(${deg}deg) translate(${translateX}px, ${translateY}px)`,
        transition: enableTransition ? "transform .3s" : ""
      };
      if (mode.value.name === modes.CONTAIN.name) {
        style.maxWidth = style.maxHeight = "100%";
      }
      return style;
    });
    const progress = vue.computed(
      () => `${activeIndex.value + 1} / ${props.urlList.length}`
    );
    function hide() {
      unregisterEventListener();
      stopWheelListener == null ? void 0 : stopWheelListener();
      visible.value = false;
      emit("close");
    }
    function registerEventListener() {
      const keydownHandler = lodashUnified.throttle((e) => {
        const code = event.getEventCode(e);
        switch (code) {
          // ESC
          case aria.EVENT_CODE.esc:
            props.closeOnPressEscape && hide();
            break;
          // SPACE
          case aria.EVENT_CODE.space:
            toggleMode();
            break;
          // LEFT_ARROW
          case aria.EVENT_CODE.left:
            prev();
            break;
          // UP_ARROW
          case aria.EVENT_CODE.up:
            handleActions("zoomIn");
            break;
          // RIGHT_ARROW
          case aria.EVENT_CODE.right:
            next();
            break;
          // DOWN_ARROW
          case aria.EVENT_CODE.down:
            handleActions("zoomOut");
            break;
        }
      });
      const mousewheelHandler = lodashUnified.throttle((e) => {
        const delta = e.deltaY || e.deltaX;
        handleActions(delta < 0 ? "zoomIn" : "zoomOut", {
          zoomRate: props.zoomRate,
          enableTransition: false
        });
      });
      scopeEventListener.run(() => {
        core.useEventListener(document, "keydown", keydownHandler);
        core.useEventListener(wrapper, "wheel", mousewheelHandler);
      });
    }
    function unregisterEventListener() {
      scopeEventListener.stop();
    }
    function handleImgLoad() {
      loading.value = false;
    }
    function handleImgError(e) {
      loadError.value = true;
      loading.value = false;
      emit("error", e);
      e.target.alt = t("el.image.error");
    }
    function handleMouseDown(e) {
      if (loading.value || e.button !== 0 || !wrapper.value) return;
      transform.value.enableTransition = false;
      const { offsetX, offsetY } = transform.value;
      const startX = e.pageX;
      const startY = e.pageY;
      const dragHandler = lodashUnified.throttle((ev) => {
        transform.value = {
          ...transform.value,
          offsetX: offsetX + ev.pageX - startX,
          offsetY: offsetY + ev.pageY - startY
        };
      });
      const removeMousemove = core.useEventListener(document, "mousemove", dragHandler);
      const removeMouseup = core.useEventListener(document, "mouseup", () => {
        removeMousemove();
        removeMouseup();
      });
      e.preventDefault();
    }
    function handleTouchStart(e) {
      if (loading.value || !wrapper.value || e.touches.length !== 1) return;
      transform.value.enableTransition = false;
      const { offsetX, offsetY } = transform.value;
      const { pageX: startX, pageY: startY } = e.touches[0];
      const dragHandler = lodashUnified.throttle((ev) => {
        const targetTouch = ev.touches[0];
        transform.value = {
          ...transform.value,
          offsetX: offsetX + targetTouch.pageX - startX,
          offsetY: offsetY + targetTouch.pageY - startY
        };
      });
      const removeTouchmove = core.useEventListener(document, "touchmove", dragHandler);
      const removeTouchend = core.useEventListener(document, "touchend", () => {
        removeTouchmove();
        removeTouchend();
      });
      e.preventDefault();
    }
    function reset() {
      transform.value = {
        scale: scaleClamped.value,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      };
    }
    function toggleMode() {
      if (loading.value || loadError.value) return;
      const modeNames = objects.keysOf(modes);
      const modeValues = Object.values(modes);
      const currentMode = mode.value.name;
      const index = modeValues.findIndex((i) => i.name === currentMode);
      const nextIndex = (index + 1) % modeNames.length;
      mode.value = modes[modeNames[nextIndex]];
      reset();
    }
    function setActiveItem(index) {
      loadError.value = false;
      const len = props.urlList.length;
      activeIndex.value = (index + len) % len;
    }
    function prev() {
      if (isFirst.value && !props.infinite) return;
      setActiveItem(activeIndex.value - 1);
    }
    function next() {
      if (isLast.value && !props.infinite) return;
      setActiveItem(activeIndex.value + 1);
    }
    function handleActions(action, options = {}) {
      if (loading.value || loadError.value) return;
      const { minScale, maxScale } = props;
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: props.zoomRate,
        rotateDeg: 90,
        enableTransition: true,
        ...options
      };
      switch (action) {
        case "zoomOut":
          if (transform.value.scale > minScale) {
            transform.value.scale = Number.parseFloat(
              (transform.value.scale / zoomRate).toFixed(3)
            );
          }
          break;
        case "zoomIn":
          if (transform.value.scale < maxScale) {
            transform.value.scale = Number.parseFloat(
              (transform.value.scale * zoomRate).toFixed(3)
            );
          }
          break;
        case "clockwise":
          transform.value.deg += rotateDeg;
          emit("rotate", transform.value.deg);
          break;
        case "anticlockwise":
          transform.value.deg -= rotateDeg;
          emit("rotate", transform.value.deg);
          break;
      }
      transform.value.enableTransition = enableTransition;
    }
    function onFocusoutPrevented(event) {
      var _a2;
      if (((_a2 = event.detail) == null ? void 0 : _a2.focusReason) === "pointer") {
        event.preventDefault();
      }
    }
    function onCloseRequested() {
      if (props.closeOnPressEscape) {
        hide();
      }
    }
    function wheelHandler(e) {
      if (!e.ctrlKey) return;
      if (e.deltaY < 0) {
        e.preventDefault();
        return false;
      } else if (e.deltaY > 0) {
        e.preventDefault();
        return false;
      }
    }
    vue.watch(
      () => scaleClamped.value,
      (val) => {
        transform.value.scale = val;
      }
    );
    vue.watch(currentImg, () => {
      vue.nextTick(() => {
        const $img = imgRef.value;
        if (!($img == null ? void 0 : $img.complete)) {
          loading.value = true;
        }
      });
    });
    vue.watch(activeIndex, (val) => {
      reset();
      emit("switch", val);
    });
    vue.onMounted(() => {
      visible.value = true;
      registerEventListener();
      stopWheelListener = core.useEventListener("wheel", wheelHandler, {
        passive: false
      });
    });
    __expose({
      /**
       * @description manually switch image
       */
      setActiveItem
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(index$4.ElTeleport), {
        to: "body",
        disabled: !__props.teleported
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.Transition, {
            name: "viewer-fade",
            appear: ""
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "div",
                {
                  ref_key: "wrapper",
                  ref: wrapper,
                  tabindex: -1,
                  class: vue.normalizeClass(vue.unref(ns).e("wrapper")),
                  style: vue.normalizeStyle({ zIndex: zIndex.value })
                },
                [
                  vue.createVNode(vue.unref(focusTrap.default), {
                    loop: "",
                    trapped: "",
                    "focus-trap-el": wrapper.value,
                    "focus-start-el": "container",
                    onFocusoutPrevented,
                    onReleaseRequested: onCloseRequested
                  }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode(
                        "div",
                        {
                          class: vue.normalizeClass(vue.unref(ns).e("mask")),
                          onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => __props.hideOnClickModal && hide(), ["self"]))
                        },
                        null,
                        2
                        /* CLASS */
                      ),
                      vue.createCommentVNode(" CLOSE "),
                      vue.createElementVNode(
                        "span",
                        {
                          class: vue.normalizeClass([vue.unref(ns).e("btn"), vue.unref(ns).e("close")]),
                          onClick: hide
                        },
                        [
                          vue.createVNode(vue.unref(index$5.ElIcon), null, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(iconsVue.Close))
                            ]),
                            _: 1
                            /* STABLE */
                          })
                        ],
                        2
                        /* CLASS */
                      ),
                      vue.createCommentVNode(" ARROW "),
                      !isSingle.value ? (vue.openBlock(), vue.createElementBlock(
                        vue.Fragment,
                        { key: 0 },
                        [
                          vue.createElementVNode(
                            "span",
                            {
                              class: vue.normalizeClass(arrowPrevKls.value),
                              onClick: prev
                            },
                            [
                              vue.createVNode(vue.unref(index$5.ElIcon), null, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(iconsVue.ArrowLeft))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ],
                            2
                            /* CLASS */
                          ),
                          vue.createElementVNode(
                            "span",
                            {
                              class: vue.normalizeClass(arrowNextKls.value),
                              onClick: next
                            },
                            [
                              vue.createVNode(vue.unref(index$5.ElIcon), null, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(iconsVue.ArrowRight))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ],
                            2
                            /* CLASS */
                          )
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      )) : vue.createCommentVNode("v-if", true),
                      _ctx.$slots.progress || __props.showProgress ? (vue.openBlock(), vue.createElementBlock(
                        "div",
                        {
                          key: 1,
                          class: vue.normalizeClass([vue.unref(ns).e("btn"), vue.unref(ns).e("progress")])
                        },
                        [
                          vue.renderSlot(_ctx.$slots, "progress", {
                            activeIndex: activeIndex.value,
                            total: __props.urlList.length
                          }, () => [
                            vue.createTextVNode(
                              vue.toDisplayString(progress.value),
                              1
                              /* TEXT */
                            )
                          ])
                        ],
                        2
                        /* CLASS */
                      )) : vue.createCommentVNode("v-if", true),
                      vue.createCommentVNode(" ACTIONS "),
                      vue.createElementVNode(
                        "div",
                        {
                          class: vue.normalizeClass([vue.unref(ns).e("btn"), vue.unref(ns).e("actions")])
                        },
                        [
                          vue.createElementVNode(
                            "div",
                            {
                              class: vue.normalizeClass(vue.unref(ns).e("actions__inner"))
                            },
                            [
                              vue.renderSlot(_ctx.$slots, "toolbar", {
                                actions: handleActions,
                                prev,
                                next,
                                reset: toggleMode,
                                activeIndex: activeIndex.value,
                                setActiveItem
                              }, () => [
                                vue.createVNode(vue.unref(index$5.ElIcon), {
                                  onClick: _cache[1] || (_cache[1] = ($event) => handleActions("zoomOut"))
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createVNode(vue.unref(iconsVue.ZoomOut))
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }),
                                vue.createVNode(vue.unref(index$5.ElIcon), {
                                  onClick: _cache[2] || (_cache[2] = ($event) => handleActions("zoomIn"))
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createVNode(vue.unref(iconsVue.ZoomIn))
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }),
                                vue.createElementVNode(
                                  "i",
                                  {
                                    class: vue.normalizeClass(vue.unref(ns).e("actions__divider"))
                                  },
                                  null,
                                  2
                                  /* CLASS */
                                ),
                                vue.createVNode(vue.unref(index$5.ElIcon), { onClick: toggleMode }, {
                                  default: vue.withCtx(() => [
                                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(mode.value.icon)))
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }),
                                vue.createElementVNode(
                                  "i",
                                  {
                                    class: vue.normalizeClass(vue.unref(ns).e("actions__divider"))
                                  },
                                  null,
                                  2
                                  /* CLASS */
                                ),
                                vue.createVNode(vue.unref(index$5.ElIcon), {
                                  onClick: _cache[3] || (_cache[3] = ($event) => handleActions("anticlockwise"))
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createVNode(vue.unref(iconsVue.RefreshLeft))
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }),
                                vue.createVNode(vue.unref(index$5.ElIcon), {
                                  onClick: _cache[4] || (_cache[4] = ($event) => handleActions("clockwise"))
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createVNode(vue.unref(iconsVue.RefreshRight))
                                  ]),
                                  _: 1
                                  /* STABLE */
                                })
                              ])
                            ],
                            2
                            /* CLASS */
                          )
                        ],
                        2
                        /* CLASS */
                      ),
                      vue.createCommentVNode(" CANVAS "),
                      vue.createElementVNode(
                        "div",
                        {
                          class: vue.normalizeClass(vue.unref(ns).e("canvas"))
                        },
                        [
                          loadError.value && _ctx.$slots["viewer-error"] ? vue.renderSlot(_ctx.$slots, "viewer-error", {
                            key: 0,
                            activeIndex: activeIndex.value,
                            src: currentImg.value
                          }) : (vue.openBlock(), vue.createElementBlock("img", {
                            ref_key: "imgRef",
                            ref: imgRef,
                            key: currentImg.value,
                            src: currentImg.value,
                            style: vue.normalizeStyle(imgStyle.value),
                            class: vue.normalizeClass(vue.unref(ns).e("img")),
                            crossorigin: __props.crossorigin,
                            onLoad: handleImgLoad,
                            onError: handleImgError,
                            onMousedown: handleMouseDown,
                            onTouchstart: handleTouchStart
                          }, null, 46, _hoisted_1))
                        ],
                        2
                        /* CLASS */
                      ),
                      vue.renderSlot(_ctx.$slots, "default")
                    ]),
                    _: 3
                    /* FORWARDED */
                  }, 8, ["focus-trap-el"])
                ],
                6
                /* CLASS, STYLE */
              )
            ]),
            _: 3
            /* FORWARDED */
          })
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["disabled"]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=image-viewer.vue2.js.map
