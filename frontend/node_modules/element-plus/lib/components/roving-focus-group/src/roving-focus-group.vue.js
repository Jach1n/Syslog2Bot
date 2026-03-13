'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rovingFocusGroup_vue_vue_type_script_lang = require('./roving-focus-group.vue2.js');
var vue = require('vue');
var _pluginVue_exportHelper = require('../../../_virtual/_plugin-vue_export-helper.js');

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_roving_focus_group_impl = vue.resolveComponent("el-roving-focus-group-impl");
  const _component_el_focus_group_collection = vue.resolveComponent("el-focus-group-collection");
  return vue.openBlock(), vue.createBlock(_component_el_focus_group_collection, null, {
    default: vue.withCtx(() => [
      vue.createVNode(
        _component_el_roving_focus_group_impl,
        vue.normalizeProps(vue.guardReactiveProps(_ctx.$attrs)),
        {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
          /* FORWARDED */
        },
        16
        /* FULL_PROPS */
      )
    ]),
    _: 3
    /* FORWARDED */
  });
}
var ElRovingFocusGroup = /* @__PURE__ */ _pluginVue_exportHelper.default(rovingFocusGroup_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

exports.default = ElRovingFocusGroup;
//# sourceMappingURL=roving-focus-group.vue.js.map
