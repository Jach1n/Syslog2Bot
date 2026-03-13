import _sfc_main from './dropdown-item.vue2.mjs';
import { resolveComponent, createBlock, openBlock, withCtx, createVNode, mergeProps, createSlots, renderSlot } from 'vue';
import _export_sfc from '../../../_virtual/_plugin-vue_export-helper.mjs';

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_dropdown_item_impl = resolveComponent("el-dropdown-item-impl");
  const _component_el_roving_focus_item = resolveComponent("el-roving-focus-item");
  return openBlock(), createBlock(_component_el_roving_focus_item, {
    focusable: !_ctx.disabled
  }, {
    default: withCtx(() => [
      createVNode(_component_el_dropdown_item_impl, mergeProps(_ctx.propsAndAttrs, {
        onPointerleave: _ctx.handlePointerLeave,
        onPointermove: _ctx.handlePointerMove,
        onClickimpl: _ctx.handleClick
      }), createSlots({
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 2
        /* DYNAMIC */
      }, [
        _ctx.$slots.icon ? {
          name: "icon",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "icon")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["onPointerleave", "onPointermove", "onClickimpl"])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["focusable"]);
}
var DropdownItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { DropdownItem as default };
//# sourceMappingURL=dropdown-item.vue.mjs.map
