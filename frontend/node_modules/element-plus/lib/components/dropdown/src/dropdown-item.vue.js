'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dropdownItem_vue_vue_type_script_lang = require('./dropdown-item.vue2.js');
var vue = require('vue');
var _pluginVue_exportHelper = require('../../../_virtual/_plugin-vue_export-helper.js');

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_dropdown_item_impl = vue.resolveComponent("el-dropdown-item-impl");
  const _component_el_roving_focus_item = vue.resolveComponent("el-roving-focus-item");
  return vue.openBlock(), vue.createBlock(_component_el_roving_focus_item, {
    focusable: !_ctx.disabled
  }, {
    default: vue.withCtx(() => [
      vue.createVNode(_component_el_dropdown_item_impl, vue.mergeProps(_ctx.propsAndAttrs, {
        onPointerleave: _ctx.handlePointerLeave,
        onPointermove: _ctx.handlePointerMove,
        onClickimpl: _ctx.handleClick
      }), vue.createSlots({
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 2
        /* DYNAMIC */
      }, [
        _ctx.$slots.icon ? {
          name: "icon",
          fn: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "icon")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["onPointerleave", "onPointermove", "onClickimpl"])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["focusable"]);
}
var DropdownItem = /* @__PURE__ */ _pluginVue_exportHelper.default(dropdownItem_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

exports.default = DropdownItem;
//# sourceMappingURL=dropdown-item.vue.js.map
