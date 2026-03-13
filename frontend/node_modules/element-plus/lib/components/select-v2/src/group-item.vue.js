'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var groupItem_vue_vue_type_script_lang = require('./group-item.vue2.js');
var vue = require('vue');
var _pluginVue_exportHelper = require('../../../_virtual/_plugin-vue_export-helper.js');

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(_ctx.ns.be("group", "title")),
      style: vue.normalizeStyle({ ..._ctx.style, lineHeight: `${_ctx.height}px` })
    },
    vue.toDisplayString(_ctx.item.label),
    7
    /* TEXT, CLASS, STYLE */
  );
}
var GroupItem = /* @__PURE__ */ _pluginVue_exportHelper.default(groupItem_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

exports.default = GroupItem;
//# sourceMappingURL=group-item.vue.js.map
