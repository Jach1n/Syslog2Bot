import { popoverEmits, popoverProps } from './popover.mjs';
import { defineComponent, computed, ref, unref, createBlock, openBlock, mergeProps, withCtx, renderSlot, createCommentVNode, createElementBlock, normalizeClass, toDisplayString, createTextVNode } from 'vue';
import { ElTooltip } from '../../tooltip/index.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { addUnit } from '../../../utils/dom/style.mjs';

const updateEventKeyRaw = `onUpdate:visible`;
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElPopover"
  },
  __name: "popover",
  props: popoverProps,
  emits: popoverEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const onUpdateVisible = computed(() => {
      return props[updateEventKeyRaw];
    });
    const ns = useNamespace("popover");
    const tooltipRef = ref();
    const popperRef = computed(() => {
      var _a;
      return (_a = unref(tooltipRef)) == null ? void 0 : _a.popperRef;
    });
    const style = computed(() => {
      return [
        {
          width: addUnit(props.width)
        },
        props.popperStyle
      ];
    });
    const kls = computed(() => {
      return [ns.b(), props.popperClass, { [ns.m("plain")]: !!props.content }];
    });
    const gpuAcceleration = computed(() => {
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
      return openBlock(), createBlock(unref(ElTooltip), mergeProps({
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
        "popper-style": style.value,
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
        content: withCtx(() => [
          __props.title ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(unref(ns).e("title")),
              role: "title"
            },
            toDisplayString(__props.title),
            3
            /* TEXT, CLASS */
          )) : createCommentVNode("v-if", true),
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(
              toDisplayString(__props.content),
              1
              /* TEXT */
            )
          ])
        ]),
        default: withCtx(() => [
          _ctx.$slots.reference ? renderSlot(_ctx.$slots, "reference", { key: 0 }) : createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["trigger", "trigger-keys", "placement", "disabled", "visible", "transition", "popper-options", "tabindex", "content", "offset", "show-after", "hide-after", "auto-close", "show-arrow", "aria-label", "effect", "enterable", "popper-class", "popper-style", "teleported", "append-to", "persistent", "gpu-acceleration", "onUpdate:visible"]);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=popover.vue2.mjs.map
