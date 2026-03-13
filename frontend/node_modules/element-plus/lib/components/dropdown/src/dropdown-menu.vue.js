'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dropdownMenu_vue_vue_type_script_lang = require('./dropdown-menu.vue2.js');
var vue = require('vue');
var _pluginVue_exportHelper = require('../../../_virtual/_plugin-vue_export-helper.js');

const _hoisted_1 = ["role", "aria-labelledby"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("ul", {
    ref: _ctx.dropdownListWrapperRef,
    class: vue.normalizeClass(_ctx.dropdownKls),
    style: vue.normalizeStyle(_ctx.rovingFocusGroupRootStyle),
    tabindex: -1,
    role: _ctx.role,
    "aria-labelledby": _ctx.triggerId,
    onFocusin: _cache[0] || (_cache[0] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
    onFocusout: _cache[1] || (_cache[1] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
    onKeydown: _cache[2] || (_cache[2] = vue.withModifiers((...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args), ["self"])),
    onMousedown: _cache[3] || (_cache[3] = vue.withModifiers((...args) => _ctx.onMousedown && _ctx.onMousedown(...args), ["self"]))
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 46, _hoisted_1);
}
var DropdownMenu = /* @__PURE__ */ _pluginVue_exportHelper.default(dropdownMenu_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

exports.default = DropdownMenu;
//# sourceMappingURL=dropdown-menu.vue.js.map
