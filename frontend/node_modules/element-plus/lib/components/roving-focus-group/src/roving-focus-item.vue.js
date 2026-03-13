'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rovingFocusItem_vue_vue_type_script_lang = require('./roving-focus-item.vue2.js');
var vue = require('vue');
var _pluginVue_exportHelper = require('../../../_virtual/_plugin-vue_export-helper.js');

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_roving_focus_collection_item = vue.resolveComponent("el-roving-focus-collection-item");
  return vue.openBlock(), vue.createBlock(_component_el_roving_focus_collection_item, {
    id: _ctx.id,
    focusable: _ctx.focusable,
    active: _ctx.active
  }, {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["id", "focusable", "active"]);
}
var ElRovingFocusItem = /* @__PURE__ */ _pluginVue_exportHelper.default(rovingFocusItem_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

exports.default = ElRovingFocusItem;
//# sourceMappingURL=roving-focus-item.vue.js.map
