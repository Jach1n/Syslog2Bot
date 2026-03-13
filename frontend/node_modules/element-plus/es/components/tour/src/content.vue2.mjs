import { tourContentEmits, tourContentProps } from './content.mjs';
import { defineComponent, ref, watch, toRef, computed, inject, createElementBlock, openBlock, normalizeClass, normalizeStyle, unref, createVNode, createCommentVNode, withCtx, renderSlot } from 'vue';
import ElFocusTrap from '../../focus-trap/src/focus-trap.vue.mjs';
import { useFloating, tourKey } from './helper.mjs';

const _hoisted_1 = ["data-side"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElTourContent"
  },
  __name: "content",
  props: tourContentProps,
  emits: tourContentEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const placement = ref(props.placement);
    const strategy = ref(props.strategy);
    const contentRef = ref(null);
    const arrowRef = ref(null);
    watch(
      () => props.placement,
      () => {
        placement.value = props.placement;
      }
    );
    const { contentStyle, arrowStyle } = useFloating(
      toRef(props, "reference"),
      contentRef,
      arrowRef,
      placement,
      strategy,
      toRef(props, "offset"),
      toRef(props, "zIndex"),
      toRef(props, "showArrow")
    );
    const side = computed(() => {
      return placement.value.split("-")[0];
    });
    const { ns } = inject(tourKey);
    const onCloseRequested = () => {
      emit("close");
    };
    const onFocusoutPrevented = (event) => {
      if (event.detail.focusReason === "pointer") {
        event.preventDefault();
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "contentRef",
        ref: contentRef,
        style: normalizeStyle(unref(contentStyle)),
        class: normalizeClass(unref(ns).e("content")),
        "data-side": side.value,
        tabindex: "-1"
      }, [
        createVNode(unref(ElFocusTrap), {
          loop: "",
          trapped: "",
          "focus-start-el": "container",
          "focus-trap-el": contentRef.value || void 0,
          onReleaseRequested: onCloseRequested,
          onFocusoutPrevented
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["focus-trap-el"]),
        __props.showArrow ? (openBlock(), createElementBlock(
          "span",
          {
            key: 0,
            ref_key: "arrowRef",
            ref: arrowRef,
            style: normalizeStyle(unref(arrowStyle)),
            class: normalizeClass(unref(ns).e("arrow"))
          },
          null,
          6
          /* CLASS, STYLE */
        )) : createCommentVNode("v-if", true)
      ], 14, _hoisted_1);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=content.vue2.mjs.map
