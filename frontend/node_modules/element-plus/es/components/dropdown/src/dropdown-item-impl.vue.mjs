import _sfc_main from './dropdown-item-impl.vue2.mjs';
import { resolveComponent, createElementBlock, openBlock, Fragment, createCommentVNode, createElementVNode, normalizeClass, mergeProps, withModifiers, createBlock, renderSlot, withCtx, resolveDynamicComponent } from 'vue';
import _export_sfc from '../../../_virtual/_plugin-vue_export-helper.mjs';

const _hoisted_1 = ["aria-disabled", "tabindex", "role"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = resolveComponent("el-icon");
  return openBlock(), createElementBlock(
    Fragment,
    null,
    [
      _ctx.divided ? (openBlock(), createElementBlock(
        "li",
        {
          key: 0,
          role: "separator",
          class: normalizeClass(_ctx.ns.bem("menu", "item", "divided"))
        },
        null,
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true),
      createElementVNode("li", mergeProps({ ref: _ctx.itemRef }, { ..._ctx.dataset, ..._ctx.$attrs }, {
        "aria-disabled": _ctx.disabled,
        class: [_ctx.ns.be("menu", "item"), _ctx.ns.is("disabled", _ctx.disabled)],
        tabindex: _ctx.tabIndex,
        role: _ctx.role,
        onClick: _cache[0] || (_cache[0] = (e) => _ctx.$emit("clickimpl", e)),
        onFocus: _cache[1] || (_cache[1] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
        onKeydown: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args), ["self"])),
        onMousedown: _cache[3] || (_cache[3] = (...args) => _ctx.handleMousedown && _ctx.handleMousedown(...args)),
        onPointermove: _cache[4] || (_cache[4] = (e) => _ctx.$emit("pointermove", e)),
        onPointerleave: _cache[5] || (_cache[5] = (e) => _ctx.$emit("pointerleave", e))
      }), [
        _ctx.icon || _ctx.$slots.icon ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "icon", {}, () => [
              (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon)))
            ])
          ]),
          _: 3
          /* FORWARDED */
        })) : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "default")
      ], 16, _hoisted_1)
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
var ElDropdownItemImpl = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { ElDropdownItemImpl as default };
//# sourceMappingURL=dropdown-item-impl.vue.mjs.map
