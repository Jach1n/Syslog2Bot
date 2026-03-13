'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var image = require('./image.js');
var vue = require('vue');
var core = require('@vueuse/core');
var lodashUnified = require('lodash-unified');
var index$3 = require('../../image-viewer/index.js');
var types = require('../../../utils/types.js');
var index = require('../../../hooks/use-locale/index.js');
var index$1 = require('../../../hooks/use-namespace/index.js');
var index$2 = require('../../../hooks/use-attrs/index.js');
var shared = require('@vue/shared');
var scroll = require('../../../utils/dom/scroll.js');

const _hoisted_1 = ["src", "loading", "crossorigin"];
const _hoisted_2 = { key: 0 };
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElImage",
    inheritAttrs: false
  },
  __name: "image",
  props: image.imageProps,
  emits: image.imageEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = index.useLocale();
    const ns = index$1.useNamespace("image");
    const rawAttrs = vue.useAttrs();
    const containerAttrs = vue.computed(() => {
      return lodashUnified.fromPairs(
        Object.entries(rawAttrs).filter(
          ([key]) => /^(data-|on[A-Z])/i.test(key) || ["id", "style"].includes(key)
        )
      );
    });
    const imgAttrs = index$2.useAttrs({
      excludeListeners: true,
      excludeKeys: vue.computed(() => {
        return Object.keys(containerAttrs.value);
      })
    });
    const imageSrc = vue.ref();
    const hasLoadError = vue.ref(false);
    const isLoading = vue.ref(true);
    const showViewer = vue.ref(false);
    const container = vue.ref();
    const _scrollContainer = vue.ref();
    const supportLoading = core.isClient && "loading" in HTMLImageElement.prototype;
    let stopScrollListener;
    const imageKls = vue.computed(() => [
      ns.e("inner"),
      preview.value && ns.e("preview"),
      isLoading.value && ns.is("loading")
    ]);
    const imageStyle = vue.computed(() => {
      const { fit } = props;
      if (core.isClient && fit) {
        return { objectFit: fit };
      }
      return {};
    });
    const preview = vue.computed(() => {
      const { previewSrcList } = props;
      return shared.isArray(previewSrcList) && previewSrcList.length > 0;
    });
    const imageIndex = vue.computed(() => {
      const { previewSrcList, initialIndex } = props;
      let previewIndex = initialIndex;
      if (initialIndex > previewSrcList.length - 1) {
        previewIndex = 0;
      }
      return previewIndex;
    });
    const isManual = vue.computed(() => {
      if (props.loading === "eager") return false;
      return !supportLoading && props.loading === "lazy" || props.lazy;
    });
    const loadImage = () => {
      if (!core.isClient) return;
      isLoading.value = true;
      hasLoadError.value = false;
      imageSrc.value = props.src;
    };
    function handleLoad(event) {
      isLoading.value = false;
      hasLoadError.value = false;
      emit("load", event);
    }
    function handleError(event) {
      isLoading.value = false;
      hasLoadError.value = true;
      emit("error", event);
    }
    function handleLazyLoad(isIntersecting) {
      if (isIntersecting) {
        loadImage();
        removeLazyLoadListener();
      }
    }
    const lazyLoadHandler = core.useThrottleFn(handleLazyLoad, 200, true);
    async function addLazyLoadListener() {
      var _a;
      if (!core.isClient) return;
      await vue.nextTick();
      const { scrollContainer } = props;
      if (types.isElement(scrollContainer)) {
        _scrollContainer.value = scrollContainer;
      } else if (shared.isString(scrollContainer) && scrollContainer !== "") {
        _scrollContainer.value = (_a = document.querySelector(scrollContainer)) != null ? _a : void 0;
      } else if (container.value) {
        const scrollContainer2 = scroll.getScrollContainer(container.value);
        _scrollContainer.value = types.isWindow(scrollContainer2) ? void 0 : scrollContainer2;
      }
      const { stop } = core.useIntersectionObserver(
        container,
        ([entry]) => {
          lazyLoadHandler(entry.isIntersecting);
        },
        { root: _scrollContainer }
      );
      stopScrollListener = stop;
    }
    function removeLazyLoadListener() {
      if (!core.isClient || !lazyLoadHandler) return;
      stopScrollListener == null ? void 0 : stopScrollListener();
      _scrollContainer.value = void 0;
      stopScrollListener = void 0;
    }
    function clickHandler() {
      if (!preview.value) return;
      showViewer.value = true;
      emit("show");
    }
    function closeViewer() {
      showViewer.value = false;
      emit("close");
    }
    function switchViewer(val) {
      emit("switch", val);
    }
    vue.watch(
      () => props.src,
      () => {
        if (isManual.value) {
          isLoading.value = true;
          hasLoadError.value = false;
          removeLazyLoadListener();
          addLazyLoadListener();
        } else {
          loadImage();
        }
      }
    );
    vue.onMounted(() => {
      if (isManual.value) {
        addLazyLoadListener();
      } else {
        loadImage();
      }
    });
    __expose({
      /** @description manually open preview */
      showPreview: clickHandler
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        vue.mergeProps({
          ref_key: "container",
          ref: container
        }, containerAttrs.value, {
          class: [vue.unref(ns).b(), _ctx.$attrs.class]
        }),
        [
          hasLoadError.value ? vue.renderSlot(_ctx.$slots, "error", { key: 0 }, () => [
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(vue.unref(ns).e("error"))
              },
              vue.toDisplayString(vue.unref(t)("el.image.error")),
              3
              /* TEXT, CLASS */
            )
          ]) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              imageSrc.value !== void 0 ? (vue.openBlock(), vue.createElementBlock("img", vue.mergeProps({ key: 0 }, vue.unref(imgAttrs), {
                src: imageSrc.value,
                loading: __props.loading,
                style: imageStyle.value,
                class: imageKls.value,
                crossorigin: __props.crossorigin,
                onClick: clickHandler,
                onLoad: handleLoad,
                onError: handleError
              }), null, 16, _hoisted_1)) : vue.createCommentVNode("v-if", true),
              isLoading.value ? (vue.openBlock(), vue.createElementBlock(
                "div",
                {
                  key: 1,
                  class: vue.normalizeClass(vue.unref(ns).e("wrapper"))
                },
                [
                  vue.renderSlot(_ctx.$slots, "placeholder", {}, () => [
                    vue.createElementVNode(
                      "div",
                      {
                        class: vue.normalizeClass(vue.unref(ns).e("placeholder"))
                      },
                      null,
                      2
                      /* CLASS */
                    )
                  ])
                ],
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true)
            ],
            64
            /* STABLE_FRAGMENT */
          )),
          preview.value ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 2 },
            [
              showViewer.value ? (vue.openBlock(), vue.createBlock(vue.unref(index$3.ElImageViewer), {
                key: 0,
                "z-index": __props.zIndex,
                "initial-index": imageIndex.value,
                infinite: __props.infinite,
                "zoom-rate": __props.zoomRate,
                "min-scale": __props.minScale,
                "max-scale": __props.maxScale,
                "show-progress": __props.showProgress,
                "url-list": __props.previewSrcList,
                scale: __props.scale,
                crossorigin: __props.crossorigin,
                "hide-on-click-modal": __props.hideOnClickModal,
                teleported: __props.previewTeleported,
                "close-on-press-escape": __props.closeOnPressEscape,
                onClose: closeViewer,
                onSwitch: switchViewer
              }, vue.createSlots({
                toolbar: vue.withCtx((toolbar) => [
                  vue.renderSlot(_ctx.$slots, "toolbar", vue.normalizeProps(vue.guardReactiveProps(toolbar)))
                ]),
                default: vue.withCtx(() => [
                  _ctx.$slots.viewer ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
                    vue.renderSlot(_ctx.$slots, "viewer")
                  ])) : vue.createCommentVNode("v-if", true)
                ]),
                _: 2
                /* DYNAMIC */
              }, [
                _ctx.$slots.progress ? {
                  name: "progress",
                  fn: vue.withCtx((progress) => [
                    vue.renderSlot(_ctx.$slots, "progress", vue.normalizeProps(vue.guardReactiveProps(progress)))
                  ]),
                  key: "0"
                } : void 0,
                _ctx.$slots["viewer-error"] ? {
                  name: "viewer-error",
                  fn: vue.withCtx((viewerError) => [
                    vue.renderSlot(_ctx.$slots, "viewer-error", vue.normalizeProps(vue.guardReactiveProps(viewerError)))
                  ]),
                  key: "1"
                } : void 0
              ]), 1032, ["z-index", "initial-index", "infinite", "zoom-rate", "min-scale", "max-scale", "show-progress", "url-list", "scale", "crossorigin", "hide-on-click-modal", "teleported", "close-on-press-escape"])) : vue.createCommentVNode("v-if", true)
            ],
            64
            /* STABLE_FRAGMENT */
          )) : vue.createCommentVNode("v-if", true)
        ],
        16
        /* FULL_PROPS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=image.vue2.js.map
