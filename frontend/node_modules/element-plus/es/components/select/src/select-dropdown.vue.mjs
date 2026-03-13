import _sfc_main from './select-dropdown.vue2.mjs';
import { createElementBlock, openBlock, normalizeStyle, normalizeClass, createCommentVNode, renderSlot } from 'vue';
import _export_sfc from '../../../_virtual/_plugin-vue_export-helper.mjs';

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass([_ctx.ns.b("dropdown"), _ctx.ns.is("multiple", _ctx.isMultiple), _ctx.popperClass]),
      style: normalizeStyle({ [_ctx.isFitInputWidth ? "width" : "minWidth"]: _ctx.minWidth })
    },
    [
      _ctx.$slots.header ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          class: normalizeClass(_ctx.ns.be("dropdown", "header"))
        },
        [
          renderSlot(_ctx.$slots, "header")
        ],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true),
      renderSlot(_ctx.$slots, "default"),
      _ctx.$slots.footer ? (openBlock(), createElementBlock(
        "div",
        {
          key: 1,
          class: normalizeClass(_ctx.ns.be("dropdown", "footer"))
        },
        [
          renderSlot(_ctx.$slots, "footer")
        ],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
var ElSelectMenu = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { ElSelectMenu as default };
//# sourceMappingURL=select-dropdown.vue.mjs.map
