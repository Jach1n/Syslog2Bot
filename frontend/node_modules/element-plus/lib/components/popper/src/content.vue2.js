'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var content = require('./content.js');
var vue = require('vue');
var lodashUnified = require('lodash-unified');
var focusTrap = require('../../focus-trap/src/focus-trap.vue.js');
var constants$1 = require('./constants.js');
var useFocusTrap = require('./composables/use-focus-trap.js');
var useContent = require('./composables/use-content.js');
var useContentDom = require('./composables/use-content-dom.js');
var constants = require('../../form/src/constants.js');
var shared = require('@vue/shared');
var types = require('../../../utils/types.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElPopperContent"
  },
  __name: "content",
  props: content.popperContentProps,
  emits: content.popperContentEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const {
      focusStartRef,
      trapped,
      onFocusAfterReleased,
      onFocusAfterTrapped,
      onFocusInTrap,
      onFocusoutPrevented,
      onReleaseRequested
    } = useFocusTrap.usePopperContentFocusTrap(props, emit);
    const { attributes, arrowRef, contentRef, styles, instanceRef, role, update } = useContent.usePopperContent(props);
    const {
      ariaModal,
      arrowStyle,
      contentAttrs,
      contentClass,
      contentStyle,
      updateZIndex
    } = useContentDom.usePopperContentDOM(props, {
      styles,
      attributes,
      role
    });
    const formItemContext = vue.inject(constants.formItemContextKey, void 0);
    vue.provide(constants$1.POPPER_CONTENT_INJECTION_KEY, {
      arrowStyle,
      arrowRef
    });
    if (formItemContext) {
      vue.provide(constants.formItemContextKey, {
        ...formItemContext,
        addInputId: shared.NOOP,
        removeInputId: shared.NOOP
      });
    }
    let triggerTargetAriaStopWatch = void 0;
    const updatePopper = (shouldUpdateZIndex = true) => {
      update();
      shouldUpdateZIndex && updateZIndex();
    };
    const togglePopperAlive = () => {
      updatePopper(false);
      if (props.visible && props.focusOnShow) {
        trapped.value = true;
      } else if (props.visible === false) {
        trapped.value = false;
      }
    };
    vue.onMounted(() => {
      vue.watch(
        () => props.triggerTargetEl,
        (triggerTargetEl, prevTriggerTargetEl) => {
          triggerTargetAriaStopWatch == null ? void 0 : triggerTargetAriaStopWatch();
          triggerTargetAriaStopWatch = void 0;
          const el = vue.unref(triggerTargetEl || contentRef.value);
          const prevEl = vue.unref(prevTriggerTargetEl || contentRef.value);
          if (types.isElement(el)) {
            triggerTargetAriaStopWatch = vue.watch(
              [role, () => props.ariaLabel, ariaModal, () => props.id],
              (watches) => {
                ["role", "aria-label", "aria-modal", "id"].forEach((key, idx) => {
                  lodashUnified.isNil(watches[idx]) ? el.removeAttribute(key) : el.setAttribute(key, watches[idx]);
                });
              },
              { immediate: true }
            );
          }
          if (prevEl !== el && types.isElement(prevEl)) {
            ["role", "aria-label", "aria-modal", "id"].forEach((key) => {
              prevEl.removeAttribute(key);
            });
          }
        },
        { immediate: true }
      );
      vue.watch(() => props.visible, togglePopperAlive, { immediate: true });
    });
    vue.onBeforeUnmount(() => {
      triggerTargetAriaStopWatch == null ? void 0 : triggerTargetAriaStopWatch();
      triggerTargetAriaStopWatch = void 0;
      contentRef.value = void 0;
    });
    __expose({
      /**
       * @description popper content element
       */
      popperContentRef: contentRef,
      /**
       * @description popperjs instance
       */
      popperInstanceRef: instanceRef,
      /**
       * @description method for updating popper
       */
      updatePopper,
      /**
       * @description content style
       */
      contentStyle
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        vue.mergeProps({
          ref_key: "contentRef",
          ref: contentRef
        }, vue.unref(contentAttrs), {
          style: vue.unref(contentStyle),
          class: vue.unref(contentClass),
          tabindex: "-1",
          onMouseenter: _cache[0] || (_cache[0] = (e) => _ctx.$emit("mouseenter", e)),
          onMouseleave: _cache[1] || (_cache[1] = (e) => _ctx.$emit("mouseleave", e))
        }),
        [
          vue.createVNode(vue.unref(focusTrap.default), {
            loop: __props.loop,
            trapped: vue.unref(trapped),
            "trap-on-focus-in": true,
            "focus-trap-el": vue.unref(contentRef),
            "focus-start-el": vue.unref(focusStartRef),
            onFocusAfterTrapped: vue.unref(onFocusAfterTrapped),
            onFocusAfterReleased: vue.unref(onFocusAfterReleased),
            onFocusin: vue.unref(onFocusInTrap),
            onFocusoutPrevented: vue.unref(onFocusoutPrevented),
            onReleaseRequested: vue.unref(onReleaseRequested)
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["loop", "trapped", "focus-trap-el", "focus-start-el", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusin", "onFocusoutPrevented", "onReleaseRequested"])
        ],
        16
        /* FULL_PROPS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=content.vue2.js.map
