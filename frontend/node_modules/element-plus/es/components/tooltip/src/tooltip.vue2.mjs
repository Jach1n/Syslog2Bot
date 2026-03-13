import { tooltipEmits, useTooltipProps, useTooltipModelToggle } from './tooltip.mjs';
import { defineComponent, ref, toRef, computed, provide, readonly, unref, watch, onDeactivated, onBeforeUnmount, createBlock, openBlock, withCtx, createVNode, renderSlot, createCommentVNode, createElementBlock, toDisplayString } from 'vue';
import { ElPopper } from '../../popper/index.mjs';
import { TOOLTIP_INJECTION_KEY } from './constants.mjs';
import _sfc_main$1 from './trigger.vue2.mjs';
import _sfc_main$2 from './content.vue2.mjs';
import { usePopperContainer } from '../../../hooks/use-popper-container/index.mjs';
import { useDelayedToggle } from '../../../hooks/use-delayed-toggle/index.mjs';
import _sfc_main$3 from '../../popper/src/arrow.vue2.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useId } from '../../../hooks/use-id/index.mjs';
import { isBoolean } from '../../../utils/types.mjs';

const _hoisted_1 = ["innerHTML"];
const _hoisted_2 = { key: 1 };
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElTooltip"
  },
  __name: "tooltip",
  props: useTooltipProps,
  emits: tooltipEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    usePopperContainer();
    const ns = useNamespace("tooltip");
    const id = useId();
    const popperRef = ref();
    const contentRef = ref();
    const updatePopper = () => {
      var _a;
      const popperComponent = unref(popperRef);
      if (popperComponent) {
        (_a = popperComponent.popperInstanceRef) == null ? void 0 : _a.update();
      }
    };
    const open = ref(false);
    const toggleReason = ref();
    const { show, hide, hasUpdateHandler } = useTooltipModelToggle({
      indicator: open,
      toggleReason
    });
    const { onOpen, onClose } = useDelayedToggle({
      showAfter: toRef(props, "showAfter"),
      hideAfter: toRef(props, "hideAfter"),
      autoClose: toRef(props, "autoClose"),
      open: show,
      close: hide
    });
    const controlled = computed(
      () => isBoolean(props.visible) && !hasUpdateHandler.value
    );
    const kls = computed(() => {
      return [ns.b(), props.popperClass];
    });
    provide(TOOLTIP_INJECTION_KEY, {
      controlled,
      id,
      open: readonly(open),
      trigger: toRef(props, "trigger"),
      onOpen,
      onClose,
      onToggle: (event) => {
        if (unref(open)) {
          onClose(event);
        } else {
          onOpen(event);
        }
      },
      onShow: () => {
        emit("show", toggleReason.value);
      },
      onHide: () => {
        emit("hide", toggleReason.value);
      },
      onBeforeShow: () => {
        emit("before-show", toggleReason.value);
      },
      onBeforeHide: () => {
        emit("before-hide", toggleReason.value);
      },
      updatePopper
    });
    watch(
      () => props.disabled,
      (disabled) => {
        if (disabled && open.value) {
          open.value = false;
        }
      }
    );
    const isFocusInsideContent = (event) => {
      var _a;
      return (_a = contentRef.value) == null ? void 0 : _a.isFocusInsideContent(event);
    };
    onDeactivated(() => open.value && hide());
    onBeforeUnmount(() => {
      toggleReason.value = void 0;
    });
    __expose({
      /**
       * @description el-popper component instance
       */
      popperRef,
      /**
       * @description el-tooltip-content component instance
       */
      contentRef,
      /**
       * @description validate current focus event is trigger inside el-tooltip-content
       */
      isFocusInsideContent,
      /**
       * @description update el-popper component instance
       */
      updatePopper,
      /**
       * @description expose onOpen function to mange el-tooltip open state
       */
      onOpen,
      /**
       * @description expose onClose function to manage el-tooltip close state
       */
      onClose,
      /**
       * @description expose hide function
       */
      hide
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElPopper), {
        ref_key: "popperRef",
        ref: popperRef,
        role: __props.role
      }, {
        default: withCtx(() => [
          createVNode(_sfc_main$1, {
            disabled: __props.disabled,
            trigger: __props.trigger,
            "trigger-keys": __props.triggerKeys,
            "virtual-ref": __props.virtualRef,
            "virtual-triggering": __props.virtualTriggering,
            "focus-on-target": __props.focusOnTarget
          }, {
            default: withCtx(() => [
              _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["disabled", "trigger", "trigger-keys", "virtual-ref", "virtual-triggering", "focus-on-target"]),
          createVNode(_sfc_main$2, {
            ref_key: "contentRef",
            ref: contentRef,
            "aria-label": __props.ariaLabel,
            "boundaries-padding": __props.boundariesPadding,
            content: __props.content,
            disabled: __props.disabled,
            effect: __props.effect,
            enterable: __props.enterable,
            "fallback-placements": __props.fallbackPlacements,
            "hide-after": __props.hideAfter,
            "gpu-acceleration": __props.gpuAcceleration,
            offset: __props.offset,
            persistent: __props.persistent,
            "popper-class": kls.value,
            "popper-style": __props.popperStyle,
            placement: __props.placement,
            "popper-options": __props.popperOptions,
            "arrow-offset": __props.arrowOffset,
            pure: __props.pure,
            "raw-content": __props.rawContent,
            "reference-el": __props.referenceEl,
            "trigger-target-el": __props.triggerTargetEl,
            "show-after": __props.showAfter,
            strategy: __props.strategy,
            teleported: __props.teleported,
            transition: __props.transition,
            "virtual-triggering": __props.virtualTriggering,
            "z-index": __props.zIndex,
            "append-to": __props.appendTo,
            loop: __props.loop
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "content", {}, () => [
                __props.rawContent ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  innerHTML: __props.content
                }, null, 8, _hoisted_1)) : (openBlock(), createElementBlock(
                  "span",
                  _hoisted_2,
                  toDisplayString(__props.content),
                  1
                  /* TEXT */
                ))
              ]),
              __props.showArrow ? (openBlock(), createBlock(unref(_sfc_main$3), { key: 0 })) : createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["aria-label", "boundaries-padding", "content", "disabled", "effect", "enterable", "fallback-placements", "hide-after", "gpu-acceleration", "offset", "persistent", "popper-class", "popper-style", "placement", "popper-options", "arrow-offset", "pure", "raw-content", "reference-el", "trigger-target-el", "show-after", "strategy", "teleported", "transition", "virtual-triggering", "z-index", "append-to", "loop"])
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["role"]);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=tooltip.vue2.mjs.map
