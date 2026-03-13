'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dropdown_vue_vue_type_script_lang = require('./dropdown.vue2.js');
var vue = require('vue');
var _pluginVue_exportHelper = require('../../../_virtual/_plugin-vue_export-helper.js');

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_el_roving_focus_group = vue.resolveComponent("el-roving-focus-group");
  const _component_el_scrollbar = vue.resolveComponent("el-scrollbar");
  const _component_el_only_child = vue.resolveComponent("el-only-child");
  const _component_el_tooltip = vue.resolveComponent("el-tooltip");
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_arrow_down = vue.resolveComponent("arrow-down");
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_el_button_group = vue.resolveComponent("el-button-group");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass([_ctx.ns.b(), _ctx.ns.is("disabled", _ctx.disabled)])
    },
    [
      vue.createVNode(_component_el_tooltip, {
        ref: "popperRef",
        role: _ctx.role,
        effect: _ctx.effect,
        "fallback-placements": ["bottom", "top"],
        "popper-options": _ctx.popperOptions,
        "gpu-acceleration": false,
        placement: _ctx.placement,
        "popper-class": [_ctx.ns.e("popper"), _ctx.popperClass],
        "popper-style": _ctx.popperStyle,
        trigger: _ctx.trigger,
        "trigger-keys": _ctx.triggerKeys,
        "trigger-target-el": _ctx.contentRef,
        "show-arrow": _ctx.showArrow,
        "show-after": _ctx.trigger === "hover" ? _ctx.showTimeout : 0,
        "hide-after": _ctx.trigger === "hover" ? _ctx.hideTimeout : 0,
        "virtual-ref": (_a = _ctx.virtualRef) != null ? _a : _ctx.triggeringElementRef,
        "virtual-triggering": _ctx.virtualTriggering || _ctx.splitButton,
        disabled: _ctx.disabled,
        transition: `${_ctx.ns.namespace.value}-zoom-in-top`,
        teleported: _ctx.teleported,
        "append-to": _ctx.appendTo,
        pure: "",
        "focus-on-target": "",
        persistent: _ctx.persistent,
        onBeforeShow: _ctx.handleBeforeShowTooltip,
        onShow: _ctx.handleShowTooltip,
        onBeforeHide: _ctx.handleBeforeHideTooltip
      }, vue.createSlots({
        content: vue.withCtx(() => [
          vue.createVNode(_component_el_scrollbar, {
            ref: "scrollbar",
            "wrap-style": _ctx.wrapStyle,
            tag: "div",
            "view-class": _ctx.ns.e("list")
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_roving_focus_group, {
                loop: _ctx.loop,
                "current-tab-id": _ctx.currentTabId,
                orientation: "horizontal",
                onCurrentTabIdChange: _ctx.handleCurrentTabIdChange
              }, {
                default: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "dropdown")
                ]),
                _: 3
                /* FORWARDED */
              }, 8, ["loop", "current-tab-id", "onCurrentTabIdChange"])
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["wrap-style", "view-class"])
        ]),
        _: 2
        /* DYNAMIC */
      }, [
        !_ctx.splitButton ? {
          name: "default",
          fn: vue.withCtx(() => [
            vue.createVNode(_component_el_only_child, {
              id: _ctx.triggerId,
              ref: "triggeringElementRef",
              role: "button",
              tabindex: _ctx.tabindex
            }, {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["id", "tabindex"])
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["role", "effect", "popper-options", "placement", "popper-class", "popper-style", "trigger", "trigger-keys", "trigger-target-el", "show-arrow", "show-after", "hide-after", "virtual-ref", "virtual-triggering", "disabled", "transition", "teleported", "append-to", "persistent", "onBeforeShow", "onShow", "onBeforeHide"]),
      _ctx.splitButton ? (vue.openBlock(), vue.createBlock(_component_el_button_group, { key: 0 }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_el_button, vue.mergeProps({ ref: "referenceElementRef" }, _ctx.buttonProps, {
            size: _ctx.dropdownSize,
            type: _ctx.type,
            disabled: _ctx.disabled,
            tabindex: _ctx.tabindex,
            onClick: _ctx.handlerMainButtonClick
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
            /* FORWARDED */
          }, 16, ["size", "type", "disabled", "tabindex", "onClick"]),
          vue.createVNode(_component_el_button, vue.mergeProps({
            id: _ctx.triggerId,
            ref: "triggeringElementRef"
          }, _ctx.buttonProps, {
            role: "button",
            size: _ctx.dropdownSize,
            type: _ctx.type,
            class: _ctx.ns.e("caret-button"),
            disabled: _ctx.disabled,
            tabindex: _ctx.tabindex,
            "aria-label": _ctx.t("el.dropdown.toggleDropdown")
          }), {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_icon, {
                class: vue.normalizeClass(_ctx.ns.e("icon"))
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_arrow_down)
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class"])
            ]),
            _: 1
            /* STABLE */
          }, 16, ["id", "size", "type", "class", "disabled", "tabindex", "aria-label"])
        ]),
        _: 3
        /* FORWARDED */
      })) : vue.createCommentVNode("v-if", true)
    ],
    2
    /* CLASS */
  );
}
var Dropdown = /* @__PURE__ */ _pluginVue_exportHelper.default(dropdown_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

exports.default = Dropdown;
//# sourceMappingURL=dropdown.vue.js.map
