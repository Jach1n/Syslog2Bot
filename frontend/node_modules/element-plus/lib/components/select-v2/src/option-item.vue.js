'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var optionItem_vue_vue_type_script_lang = require('./option-item.vue2.js');
var vue = require('vue');
var _pluginVue_exportHelper = require('../../../_virtual/_plugin-vue_export-helper.js');

const _hoisted_1 = ["id", "aria-selected", "aria-disabled"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("li", {
    id: `${_ctx.contentId}-${_ctx.index}`,
    role: "option",
    "aria-selected": _ctx.selected,
    "aria-disabled": _ctx.disabled || void 0,
    style: vue.normalizeStyle(_ctx.style),
    class: vue.normalizeClass([
      _ctx.ns.be("dropdown", "item"),
      _ctx.ns.is("selected", _ctx.selected),
      _ctx.ns.is("disabled", _ctx.disabled),
      _ctx.ns.is("created", _ctx.created),
      _ctx.ns.is("hovering", _ctx.hovering)
    ]),
    onMousemove: _cache[0] || (_cache[0] = (...args) => _ctx.hoverItem && _ctx.hoverItem(...args)),
    onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.selectOptionClick && _ctx.selectOptionClick(...args), ["stop"]))
  }, [
    vue.renderSlot(_ctx.$slots, "default", {
      item: _ctx.item,
      index: _ctx.index,
      disabled: _ctx.disabled
    }, () => [
      vue.createElementVNode(
        "span",
        null,
        vue.toDisplayString(_ctx.getLabel(_ctx.item)),
        1
        /* TEXT */
      )
    ])
  ], 46, _hoisted_1);
}
var OptionItem = /* @__PURE__ */ _pluginVue_exportHelper.default(optionItem_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

exports.default = OptionItem;
//# sourceMappingURL=option-item.vue.js.map
