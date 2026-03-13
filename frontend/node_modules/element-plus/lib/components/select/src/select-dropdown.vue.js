'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var selectDropdown_vue_vue_type_script_lang = require('./select-dropdown.vue2.js');
var vue = require('vue');
var _pluginVue_exportHelper = require('../../../_virtual/_plugin-vue_export-helper.js');

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass([_ctx.ns.b("dropdown"), _ctx.ns.is("multiple", _ctx.isMultiple), _ctx.popperClass]),
      style: vue.normalizeStyle({ [_ctx.isFitInputWidth ? "width" : "minWidth"]: _ctx.minWidth })
    },
    [
      _ctx.$slots.header ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 0,
          class: vue.normalizeClass(_ctx.ns.be("dropdown", "header"))
        },
        [
          vue.renderSlot(_ctx.$slots, "header")
        ],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "default"),
      _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 1,
          class: vue.normalizeClass(_ctx.ns.be("dropdown", "footer"))
        },
        [
          vue.renderSlot(_ctx.$slots, "footer")
        ],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
var ElSelectMenu = /* @__PURE__ */ _pluginVue_exportHelper.default(selectDropdown_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

exports.default = ElSelectMenu;
//# sourceMappingURL=select-dropdown.vue.js.map
