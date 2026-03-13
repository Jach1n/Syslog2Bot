import { imageEmits, imageProps } from './image.mjs';
import { defineComponent, useAttrs, computed, ref, watch, onMounted, createElementBlock, openBlock, mergeProps, unref, renderSlot, createCommentVNode, createElementVNode, normalizeClass, toDisplayString, Fragment, createBlock, createSlots, withCtx, normalizeProps, guardReactiveProps, nextTick } from 'vue';
import { isClient, useThrottleFn, useIntersectionObserver } from '@vueuse/core';
import { fromPairs } from 'lodash-unified';
import { ElImageViewer } from '../../image-viewer/index.mjs';
import { isElement, isWindow } from '../../../utils/types.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useAttrs as useAttrs$1 } from '../../../hooks/use-attrs/index.mjs';
import { isArray, isString } from '@vue/shared';
import { getScrollContainer } from '../../../utils/dom/scroll.mjs';

const _hoisted_1 = ["src", "loading", "crossorigin"];
const _hoisted_2 = { key: 0 };
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElImage",
    inheritAttrs: false
  },
  __name: "image",
  props: imageProps,
  emits: imageEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useLocale();
    const ns = useNamespace("image");
    const rawAttrs = useAttrs();
    const containerAttrs = computed(() => {
      return fromPairs(
        Object.entries(rawAttrs).filter(
          ([key]) => /^(data-|on[A-Z])/i.test(key) || ["id", "style"].includes(key)
        )
      );
    });
    const imgAttrs = useAttrs$1({
      excludeListeners: true,
      excludeKeys: computed(() => {
        return Object.keys(containerAttrs.value);
      })
    });
    const imageSrc = ref();
    const hasLoadError = ref(false);
    const isLoading = ref(true);
    const showViewer = ref(false);
    const container = ref();
    const _scrollContainer = ref();
    const supportLoading = isClient && "loading" in HTMLImageElement.prototype;
    let stopScrollListener;
    const imageKls = computed(() => [
      ns.e("inner"),
      preview.value && ns.e("preview"),
      isLoading.value && ns.is("loading")
    ]);
    const imageStyle = computed(() => {
      const { fit } = props;
      if (isClient && fit) {
        return { objectFit: fit };
      }
      return {};
    });
    const preview = computed(() => {
      const { previewSrcList } = props;
      return isArray(previewSrcList) && previewSrcList.length > 0;
    });
    const imageIndex = computed(() => {
      const { previewSrcList, initialIndex } = props;
      let previewIndex = initialIndex;
      if (initialIndex > previewSrcList.length - 1) {
        previewIndex = 0;
      }
      return previewIndex;
    });
    const isManual = computed(() => {
      if (props.loading === "eager") return false;
      return !supportLoading && props.loading === "lazy" || props.lazy;
    });
    const loadImage = () => {
      if (!isClient) return;
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
    const lazyLoadHandler = useThrottleFn(handleLazyLoad, 200, true);
    async function addLazyLoadListener() {
      var _a;
      if (!isClient) return;
      await nextTick();
      const { scrollContainer } = props;
      if (isElement(scrollContainer)) {
        _scrollContainer.value = scrollContainer;
      } else if (isString(scrollContainer) && scrollContainer !== "") {
        _scrollContainer.value = (_a = document.querySelector(scrollContainer)) != null ? _a : void 0;
      } else if (container.value) {
        const scrollContainer2 = getScrollContainer(container.value);
        _scrollContainer.value = isWindow(scrollContainer2) ? void 0 : scrollContainer2;
      }
      const { stop } = useIntersectionObserver(
        container,
        ([entry]) => {
          lazyLoadHandler(entry.isIntersecting);
        },
        { root: _scrollContainer }
      );
      stopScrollListener = stop;
    }
    function removeLazyLoadListener() {
      if (!isClient || !lazyLoadHandler) return;
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
    watch(
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
    onMounted(() => {
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
      return openBlock(), createElementBlock(
        "div",
        mergeProps({
          ref_key: "container",
          ref: container
        }, containerAttrs.value, {
          class: [unref(ns).b(), _ctx.$attrs.class]
        }),
        [
          hasLoadError.value ? renderSlot(_ctx.$slots, "error", { key: 0 }, () => [
            createElementVNode(
              "div",
              {
                class: normalizeClass(unref(ns).e("error"))
              },
              toDisplayString(unref(t)("el.image.error")),
              3
              /* TEXT, CLASS */
            )
          ]) : (openBlock(), createElementBlock(
            Fragment,
            { key: 1 },
            [
              imageSrc.value !== void 0 ? (openBlock(), createElementBlock("img", mergeProps({ key: 0 }, unref(imgAttrs), {
                src: imageSrc.value,
                loading: __props.loading,
                style: imageStyle.value,
                class: imageKls.value,
                crossorigin: __props.crossorigin,
                onClick: clickHandler,
                onLoad: handleLoad,
                onError: handleError
              }), null, 16, _hoisted_1)) : createCommentVNode("v-if", true),
              isLoading.value ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 1,
                  class: normalizeClass(unref(ns).e("wrapper"))
                },
                [
                  renderSlot(_ctx.$slots, "placeholder", {}, () => [
                    createElementVNode(
                      "div",
                      {
                        class: normalizeClass(unref(ns).e("placeholder"))
                      },
                      null,
                      2
                      /* CLASS */
                    )
                  ])
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true)
            ],
            64
            /* STABLE_FRAGMENT */
          )),
          preview.value ? (openBlock(), createElementBlock(
            Fragment,
            { key: 2 },
            [
              showViewer.value ? (openBlock(), createBlock(unref(ElImageViewer), {
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
              }, createSlots({
                toolbar: withCtx((toolbar) => [
                  renderSlot(_ctx.$slots, "toolbar", normalizeProps(guardReactiveProps(toolbar)))
                ]),
                default: withCtx(() => [
                  _ctx.$slots.viewer ? (openBlock(), createElementBlock("div", _hoisted_2, [
                    renderSlot(_ctx.$slots, "viewer")
                  ])) : createCommentVNode("v-if", true)
                ]),
                _: 2
                /* DYNAMIC */
              }, [
                _ctx.$slots.progress ? {
                  name: "progress",
                  fn: withCtx((progress) => [
                    renderSlot(_ctx.$slots, "progress", normalizeProps(guardReactiveProps(progress)))
                  ]),
                  key: "0"
                } : void 0,
                _ctx.$slots["viewer-error"] ? {
                  name: "viewer-error",
                  fn: withCtx((viewerError) => [
                    renderSlot(_ctx.$slots, "viewer-error", normalizeProps(guardReactiveProps(viewerError)))
                  ]),
                  key: "1"
                } : void 0
              ]), 1032, ["z-index", "initial-index", "infinite", "zoom-rate", "min-scale", "max-scale", "show-progress", "url-list", "scale", "crossorigin", "hide-on-click-modal", "teleported", "close-on-press-escape"])) : createCommentVNode("v-if", true)
            ],
            64
            /* STABLE_FRAGMENT */
          )) : createCommentVNode("v-if", true)
        ],
        16
        /* FULL_PROPS */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=image.vue2.mjs.map
