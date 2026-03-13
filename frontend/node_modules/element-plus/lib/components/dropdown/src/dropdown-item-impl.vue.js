'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dropdownItemImpl_vue_vue_type_script_lang = require('./dropdown-item-impl.vue2.js');
var vue = require('vue');
var _pluginVue_exportHelper = require('../../../_virtual/_plugin-vue_export-helper.js');

const _hoisted_1 = ["aria-disabled", "tabindex", "role"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = vue.resolveComponent("el-icon");
  return vue.openBlock(), vue.createElementBlock(
    vue.Fragment,
    null,
    [
      _ctx.divided ? (vue.openBlock(), vue.createElementBlock(
        "li",
        {
          key: 0,
          role: "separator",
          class: vue.normalizeClass(_ctx.ns.bem("menu", "item", "divided"))
        },
        null,
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("li", vue.mergeProps({ ref: _ctx.itemRef }, { ..._ctx.dataset, ..._ctx.$attrs }, {
        "aria-disabled": _ctx.disabled,
        class: [_ctx.ns.be("menu", "item"), _ctx.ns.is("disabled", _ctx.disabled)],
        tabindex: _ctx.tabIndex,
        role: _ctx.role,
        onClick: _cache[0] || (_cache[0] = (e) => _ctx.$emit("clickimpl", e)),
        onFocus: _cache[1] || (_cache[1] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
        onKeydown: _cache[2] || (_cache[2] = vue.withModifiers((...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args), ["self"])),
        onMousedown: _cache[3] || (_cache[3] = (...args) => _ctx.handleMousedown && _ctx.handleMousedown(...args)),
        onPointermove: _cache[4] || (_cache[4] = (e) => _ctx.$emit("pointermove", e)),
        onPointerleave: _cache[5] || (_cache[5] = (e) => _ctx.$emit("pointerleave", e))
      }), [
        _ctx.icon || _ctx.$slots.icon ? (vue.openBlock(), vue.createBlock(_component_el_icon, { key: 0 }, {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "icon", {}, () => [
              (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.icon)))
            ])
          ]),
          _: 3
          /* FORWARDED */
        })) : vue.createCommentVNode("v-if", true),
        vue.renderSlot(_ctx.$slots, "default")
      ], 16, _hoisted_1)
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
var ElDropdownItemImpl = /* @__PURE__ */ _pluginVue_exportHelper.default(dropdownItemImpl_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

exports.default = ElDropdownItemImpl;
//# sourceMappingURL=dropdown-item-impl.vue.js.map
