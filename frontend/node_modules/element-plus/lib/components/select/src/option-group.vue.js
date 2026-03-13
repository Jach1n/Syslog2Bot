'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var optionGroup_vue_vue_type_script_lang = require('./option-group.vue2.js');
var vue = require('vue');
var _pluginVue_exportHelper = require('../../../_virtual/_plugin-vue_export-helper.js');

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock(
    "ul",
    {
      ref: "groupRef",
      class: vue.normalizeClass(_ctx.ns.be("group", "wrap"))
    },
    [
      vue.createElementVNode(
        "li",
        {
          class: vue.normalizeClass(_ctx.ns.be("group", "title"))
        },
        vue.toDisplayString(_ctx.label),
        3
        /* TEXT, CLASS */
      ),
      vue.createElementVNode("li", null, [
        vue.createElementVNode(
          "ul",
          {
            class: vue.normalizeClass(_ctx.ns.b("group"))
          },
          [
            vue.renderSlot(_ctx.$slots, "default")
          ],
          2
          /* CLASS */
        )
      ])
    ],
    2
    /* CLASS */
  )), [
    [vue.vShow, _ctx.visible]
  ]);
}
var OptionGroup = /* @__PURE__ */ _pluginVue_exportHelper.default(optionGroup_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

exports.default = OptionGroup;
//# sourceMappingURL=option-group.vue.js.map
