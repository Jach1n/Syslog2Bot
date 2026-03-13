'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var option_vue_vue_type_script_lang = require('./option.vue2.js');
var vue = require('vue');
var _pluginVue_exportHelper = require('../../../_virtual/_plugin-vue_export-helper.js');

const _hoisted_1 = ["id", "aria-disabled", "aria-selected"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("li", {
    id: _ctx.id,
    class: vue.normalizeClass(_ctx.containerKls),
    role: "option",
    "aria-disabled": _ctx.isDisabled || void 0,
    "aria-selected": _ctx.itemSelected,
    onMousemove: _cache[0] || (_cache[0] = (...args) => _ctx.hoverItem && _ctx.hoverItem(...args)),
    onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.selectOptionClick && _ctx.selectOptionClick(...args), ["stop"]))
  }, [
    vue.renderSlot(_ctx.$slots, "default", {}, () => [
      vue.createElementVNode(
        "span",
        null,
        vue.toDisplayString(_ctx.currentLabel),
        1
        /* TEXT */
      )
    ])
  ], 42, _hoisted_1)), [
    [vue.vShow, _ctx.visible]
  ]);
}
var Option = /* @__PURE__ */ _pluginVue_exportHelper.default(option_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

exports.default = Option;
//# sourceMappingURL=option.vue.js.map
