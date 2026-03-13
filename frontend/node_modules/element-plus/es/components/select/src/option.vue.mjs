import _sfc_main from './option.vue2.mjs';
import { withDirectives, createElementBlock, openBlock, withModifiers, normalizeClass, renderSlot, createElementVNode, toDisplayString, vShow } from 'vue';
import _export_sfc from '../../../_virtual/_plugin-vue_export-helper.mjs';

const _hoisted_1 = ["id", "aria-disabled", "aria-selected"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("li", {
    id: _ctx.id,
    class: normalizeClass(_ctx.containerKls),
    role: "option",
    "aria-disabled": _ctx.isDisabled || void 0,
    "aria-selected": _ctx.itemSelected,
    onMousemove: _cache[0] || (_cache[0] = (...args) => _ctx.hoverItem && _ctx.hoverItem(...args)),
    onClick: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.selectOptionClick && _ctx.selectOptionClick(...args), ["stop"]))
  }, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      createElementVNode(
        "span",
        null,
        toDisplayString(_ctx.currentLabel),
        1
        /* TEXT */
      )
    ])
  ], 42, _hoisted_1)), [
    [vShow, _ctx.visible]
  ]);
}
var Option = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { Option as default };
//# sourceMappingURL=option.vue.mjs.map
