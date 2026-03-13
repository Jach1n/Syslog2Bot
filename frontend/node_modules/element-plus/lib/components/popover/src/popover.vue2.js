'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var popover = require('./popover.js');
var vue = require('vue');
var index$1 = require('../../tooltip/index.js');
var index = require('../../../hooks/use-namespace/index.js');
var style = require('../../../utils/dom/style.js');

const updateEventKeyRaw = `onUpdate:visible`;
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElPopover"
  },
  __name: "popover",
  props: popover.popoverProps,
  emits: popover.popoverEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const onUpdateVisible = vue.computed(() => {
      return props[updateEventKeyRaw];
    });
    const ns = index.useNamespace("popover");
    const tooltipRef = vue.ref();
    const popperRef = vue.computed(() => {
      var _a;
      return (_a = vue.unref(tooltipRef)) == null ? void 0 : _a.popperRef;
    });
    const style$1 = vue.computed(() => {
      return [
        {
          width: style.addUnit(props.width)
        },
        props.popperStyle
      ];
    });
    const kls = vue.computed(() => {
      return [ns.b(), props.popperClass, { [ns.m("plain")]: !!props.content }];
    });
    const gpuAcceleration = vue.computed(() => {
      return props.transition === `${ns.namespace.value}-fade-in-linear`;
    });
    const hide = () => {
      var _a;
      (_a = tooltipRef.value) == null ? void 0 : _a.hide();
    };
    const beforeEnter = () => {
      emit("before-enter");
    };
    const beforeLeave = () => {
      emit("before-leave");
    };
    const afterEnter = () => {
      emit("after-enter");
    };
    const afterLeave = () => {
      emit("update:visible", false);
      emit("after-leave");
    };
    __expose({
      /** @description popper ref */
      popperRef,
      /** @description hide popover */
      hide
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(index$1.ElTooltip), vue.mergeProps({
        ref_key: "tooltipRef",
        ref: tooltipRef
      }, _ctx.$attrs, {
        trigger: __props.trigger,
        "trigger-keys": __props.triggerKeys,
        placement: __props.placement,
        disabled: __props.disabled,
        visible: __props.visible,
        transition: __props.transition,
        "popper-options": __props.popperOptions,
        tabindex: __props.tabindex,
        content: __props.content,
        offset: __props.offset,
        "show-after": __props.showAfter,
        "hide-after": __props.hideAfter,
        "auto-close": __props.autoClose,
        "show-arrow": __props.showArrow,
        "aria-label": __props.title,
        effect: __props.effect,
        enterable: __props.enterable,
        "popper-class": kls.value,
        "popper-style": style$1.value,
        teleported: __props.teleported,
        "append-to": __props.appendTo,
        persistent: __props.persistent,
        "gpu-acceleration": gpuAcceleration.value,
        "onUpdate:visible": onUpdateVisible.value,
        onBeforeShow: beforeEnter,
        onBeforeHide: beforeLeave,
        onShow: afterEnter,
        onHide: afterLeave
      }), {
        content: vue.withCtx(() => [
          __props.title ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(vue.unref(ns).e("title")),
              role: "title"
            },
            vue.toDisplayString(__props.title),
            3
            /* TEXT, CLASS */
          )) : vue.createCommentVNode("v-if", true),
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createTextVNode(
              vue.toDisplayString(__props.content),
              1
              /* TEXT */
            )
          ])
        ]),
        default: vue.withCtx(() => [
          _ctx.$slots.reference ? vue.renderSlot(_ctx.$slots, "reference", { key: 0 }) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["trigger", "trigger-keys", "placement", "disabled", "visible", "transition", "popper-options", "tabindex", "content", "offset", "show-after", "hide-after", "auto-close", "show-arrow", "aria-label", "effect", "enterable", "popper-class", "popper-style", "teleported", "append-to", "persistent", "gpu-acceleration", "onUpdate:visible"]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=popover.vue2.js.map
