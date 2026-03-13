'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var content = require('./content.js');
var vue = require('vue');
var core = require('@vueuse/core');
require('../../popper/index.js');
var index$2 = require('../../teleport/index.js');
var constants = require('./constants.js');
var utils = require('./utils.js');
var index = require('../../../hooks/use-popper-container/index.js');
var arrays = require('../../../utils/arrays.js');
var content_vue_vue_type_script_setup_true_lang = require('../../popper/src/content.vue2.js');
var index$1 = require('../../../hooks/use-namespace/index.js');
var event = require('../../../utils/dom/event.js');
var aria = require('../../../utils/dom/aria.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElTooltipContent",
    inheritAttrs: false
  },
  __name: "content",
  props: content.useTooltipContentProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { selector } = index.usePopperContainerId();
    const ns = index$1.useNamespace("tooltip");
    const contentRef = vue.ref();
    const popperContentRef = core.computedEager(() => {
      var _a;
      return (_a = contentRef.value) == null ? void 0 : _a.popperContentRef;
    });
    let stopHandle;
    const {
      controlled,
      id,
      open,
      trigger,
      onClose,
      onOpen,
      onShow,
      onHide,
      onBeforeShow,
      onBeforeHide
    } = vue.inject(constants.TOOLTIP_INJECTION_KEY, void 0);
    const transitionClass = vue.computed(() => {
      return props.transition || `${ns.namespace.value}-fade-in-linear`;
    });
    const persistentRef = vue.computed(() => {
      if (process.env.NODE_ENV === "test") {
        if (!process.env.RUN_TEST_WITH_PERSISTENT) {
          return true;
        }
      }
      return props.persistent;
    });
    vue.onBeforeUnmount(() => {
      stopHandle == null ? void 0 : stopHandle();
    });
    const shouldRender = vue.computed(() => {
      return vue.unref(persistentRef) ? true : vue.unref(open);
    });
    const shouldShow = vue.computed(() => {
      return props.disabled ? false : vue.unref(open);
    });
    const appendTo = vue.computed(() => {
      return props.appendTo || selector.value;
    });
    const contentStyle = vue.computed(() => {
      var _a;
      return (_a = props.style) != null ? _a : {};
    });
    const ariaHidden = vue.ref(true);
    const onTransitionLeave = () => {
      onHide();
      isFocusInsideContent() && aria.focusElement(document.body, { preventScroll: true });
      ariaHidden.value = true;
    };
    const stopWhenControlled = () => {
      if (vue.unref(controlled)) return true;
    };
    const onContentEnter = event.composeEventHandlers(stopWhenControlled, () => {
      if (props.enterable && utils.isTriggerType(vue.unref(trigger), "hover")) {
        onOpen();
      }
    });
    const onContentLeave = event.composeEventHandlers(stopWhenControlled, () => {
      if (utils.isTriggerType(vue.unref(trigger), "hover")) {
        onClose();
      }
    });
    const onBeforeEnter = () => {
      var _a, _b;
      (_b = (_a = contentRef.value) == null ? void 0 : _a.updatePopper) == null ? void 0 : _b.call(_a);
      onBeforeShow == null ? void 0 : onBeforeShow();
    };
    const onBeforeLeave = () => {
      onBeforeHide == null ? void 0 : onBeforeHide();
    };
    const onAfterShow = () => {
      onShow();
    };
    const onBlur = () => {
      if (!props.virtualTriggering) {
        onClose();
      }
    };
    const isFocusInsideContent = (event) => {
      var _a;
      const popperContent = (_a = contentRef.value) == null ? void 0 : _a.popperContentRef;
      const activeElement = (event == null ? void 0 : event.relatedTarget) || document.activeElement;
      return popperContent == null ? void 0 : popperContent.contains(activeElement);
    };
    vue.watch(
      () => vue.unref(open),
      (val) => {
        if (!val) {
          stopHandle == null ? void 0 : stopHandle();
        } else {
          ariaHidden.value = false;
          stopHandle = core.onClickOutside(
            popperContentRef,
            () => {
              if (vue.unref(controlled)) return;
              const needClose = arrays.castArray(vue.unref(trigger)).every((item) => {
                return item !== "hover" && item !== "focus";
              });
              if (needClose) {
                onClose();
              }
            },
            { detectIframe: true }
          );
        }
      },
      {
        flush: "post"
      }
    );
    vue.watch(
      () => props.content,
      () => {
        var _a, _b;
        (_b = (_a = contentRef.value) == null ? void 0 : _a.updatePopper) == null ? void 0 : _b.call(_a);
      }
    );
    __expose({
      /**
       * @description el-popper-content component instance
       */
      contentRef,
      /**
       * @description validate current focus event is trigger inside el-popper-content
       */
      isFocusInsideContent
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(index$2.ElTeleport), {
        disabled: !__props.teleported,
        to: appendTo.value
      }, {
        default: vue.withCtx(() => [
          shouldRender.value || !ariaHidden.value ? (vue.openBlock(), vue.createBlock(vue.Transition, {
            key: 0,
            name: transitionClass.value,
            appear: !persistentRef.value,
            onAfterLeave: onTransitionLeave,
            onBeforeEnter,
            onAfterEnter: onAfterShow,
            onBeforeLeave,
            persisted: ""
          }, {
            default: vue.withCtx(() => [
              vue.withDirectives(vue.createVNode(vue.unref(content_vue_vue_type_script_setup_true_lang.default), vue.mergeProps({
                id: vue.unref(id),
                ref_key: "contentRef",
                ref: contentRef
              }, _ctx.$attrs, {
                "aria-label": __props.ariaLabel,
                "aria-hidden": ariaHidden.value,
                "boundaries-padding": __props.boundariesPadding,
                "fallback-placements": __props.fallbackPlacements,
                "gpu-acceleration": __props.gpuAcceleration,
                offset: __props.offset,
                placement: __props.placement,
                "popper-options": __props.popperOptions,
                "arrow-offset": __props.arrowOffset,
                strategy: __props.strategy,
                effect: __props.effect,
                enterable: __props.enterable,
                pure: __props.pure,
                "popper-class": __props.popperClass,
                "popper-style": [__props.popperStyle, contentStyle.value],
                "reference-el": __props.referenceEl,
                "trigger-target-el": __props.triggerTargetEl,
                visible: shouldShow.value,
                "z-index": __props.zIndex,
                loop: __props.loop,
                onMouseenter: vue.unref(onContentEnter),
                onMouseleave: vue.unref(onContentLeave),
                onBlur,
                onClose: vue.unref(onClose)
              }), {
                default: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
                /* FORWARDED */
              }, 16, ["id", "aria-label", "aria-hidden", "boundaries-padding", "fallback-placements", "gpu-acceleration", "offset", "placement", "popper-options", "arrow-offset", "strategy", "effect", "enterable", "pure", "popper-class", "popper-style", "reference-el", "trigger-target-el", "visible", "z-index", "loop", "onMouseenter", "onMouseleave", "onClose"]), [
                [vue.vShow, shouldShow.value]
              ])
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["name", "appear"])) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["disabled", "to"]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=content.vue2.js.map
