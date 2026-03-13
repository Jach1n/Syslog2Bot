import _sfc_main from './option-item.vue2.mjs';
import { createElementBlock, openBlock, withModifiers, normalizeClass, normalizeStyle, renderSlot, createElementVNode, toDisplayString } from 'vue';
import _export_sfc from '../../../_virtual/_plugin-vue_export-helper.mjs';

const _hoisted_1 = ["id", "aria-selected", "aria-disabled"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", {
    id: `${_ctx.contentId}-${_ctx.index}`,
    role: "option",
    "aria-selected": _ctx.selected,
    "aria-disabled": _ctx.disabled || void 0,
    style: normalizeStyle(_ctx.style),
    class: normalizeClass([
      _ctx.ns.be("dropdown", "item"),
      _ctx.ns.is("selected", _ctx.selected),
      _ctx.ns.is("disabled", _ctx.disabled),
      _ctx.ns.is("created", _ctx.created),
      _ctx.ns.is("hovering", _ctx.hovering)
    ]),
    onMousemove: _cache[0] || (_cache[0] = (...args) => _ctx.hoverItem && _ctx.hoverItem(...args)),
    onClick: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.selectOptionClick && _ctx.selectOptionClick(...args), ["stop"]))
  }, [
    renderSlot(_ctx.$slots, "default", {
      item: _ctx.item,
      index: _ctx.index,
      disabled: _ctx.disabled
    }, () => [
      createElementVNode(
        "span",
        null,
        toDisplayString(_ctx.getLabel(_ctx.item)),
        1
        /* TEXT */
      )
    ])
  ], 46, _hoisted_1);
}
var OptionItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { OptionItem as default };
//# sourceMappingURL=option-item.vue.mjs.map
