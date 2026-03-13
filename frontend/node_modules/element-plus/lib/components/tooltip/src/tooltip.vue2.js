'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tooltip = require('./tooltip.js');
var vue = require('vue');
var index$4 = require('../../popper/index.js');
var constants = require('./constants.js');
var trigger_vue_vue_type_script_setup_true_lang = require('./trigger.vue2.js');
var content_vue_vue_type_script_setup_true_lang = require('./content.vue2.js');
var index = require('../../../hooks/use-popper-container/index.js');
var index$3 = require('../../../hooks/use-delayed-toggle/index.js');
var arrow_vue_vue_type_script_setup_true_lang = require('../../popper/src/arrow.vue2.js');
var index$1 = require('../../../hooks/use-namespace/index.js');
var index$2 = require('../../../hooks/use-id/index.js');
var types = require('../../../utils/types.js');

const _hoisted_1 = ["innerHTML"];
const _hoisted_2 = { key: 1 };
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElTooltip"
  },
  __name: "tooltip",
  props: tooltip.useTooltipProps,
  emits: tooltip.tooltipEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    index.usePopperContainer();
    const ns = index$1.useNamespace("tooltip");
    const id = index$2.useId();
    const popperRef = vue.ref();
    const contentRef = vue.ref();
    const updatePopper = () => {
      var _a;
      const popperComponent = vue.unref(popperRef);
      if (popperComponent) {
        (_a = popperComponent.popperInstanceRef) == null ? void 0 : _a.update();
      }
    };
    const open = vue.ref(false);
    const toggleReason = vue.ref();
    const { show, hide, hasUpdateHandler } = tooltip.useTooltipModelToggle({
      indicator: open,
      toggleReason
    });
    const { onOpen, onClose } = index$3.useDelayedToggle({
      showAfter: vue.toRef(props, "showAfter"),
      hideAfter: vue.toRef(props, "hideAfter"),
      autoClose: vue.toRef(props, "autoClose"),
      open: show,
      close: hide
    });
    const controlled = vue.computed(
      () => types.isBoolean(props.visible) && !hasUpdateHandler.value
    );
    const kls = vue.computed(() => {
      return [ns.b(), props.popperClass];
    });
    vue.provide(constants.TOOLTIP_INJECTION_KEY, {
      controlled,
      id,
      open: vue.readonly(open),
      trigger: vue.toRef(props, "trigger"),
      onOpen,
      onClose,
      onToggle: (event) => {
        if (vue.unref(open)) {
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
    vue.watch(
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
    vue.onDeactivated(() => open.value && hide());
    vue.onBeforeUnmount(() => {
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
      return vue.openBlock(), vue.createBlock(vue.unref(index$4.ElPopper), {
        ref_key: "popperRef",
        ref: popperRef,
        role: __props.role
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(trigger_vue_vue_type_script_setup_true_lang.default, {
            disabled: __props.disabled,
            trigger: __props.trigger,
            "trigger-keys": __props.triggerKeys,
            "virtual-ref": __props.virtualRef,
            "virtual-triggering": __props.virtualTriggering,
            "focus-on-target": __props.focusOnTarget
          }, {
            default: vue.withCtx(() => [
              _ctx.$slots.default ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : vue.createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["disabled", "trigger", "trigger-keys", "virtual-ref", "virtual-triggering", "focus-on-target"]),
          vue.createVNode(content_vue_vue_type_script_setup_true_lang.default, {
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
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "content", {}, () => [
                __props.rawContent ? (vue.openBlock(), vue.createElementBlock("span", {
                  key: 0,
                  innerHTML: __props.content
                }, null, 8, _hoisted_1)) : (vue.openBlock(), vue.createElementBlock(
                  "span",
                  _hoisted_2,
                  vue.toDisplayString(__props.content),
                  1
                  /* TEXT */
                ))
              ]),
              __props.showArrow ? (vue.openBlock(), vue.createBlock(vue.unref(arrow_vue_vue_type_script_setup_true_lang.default), { key: 0 })) : vue.createCommentVNode("v-if", true)
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

exports.default = _sfc_main;
//# sourceMappingURL=tooltip.vue2.js.map
