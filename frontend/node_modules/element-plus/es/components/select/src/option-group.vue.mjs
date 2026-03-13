import _sfc_main from './option-group.vue2.mjs';
import { withDirectives, createElementBlock, openBlock, normalizeClass, createElementVNode, toDisplayString, renderSlot, vShow } from 'vue';
import _export_sfc from '../../../_virtual/_plugin-vue_export-helper.mjs';

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock(
    "ul",
    {
      ref: "groupRef",
      class: normalizeClass(_ctx.ns.be("group", "wrap"))
    },
    [
      createElementVNode(
        "li",
        {
          class: normalizeClass(_ctx.ns.be("group", "title"))
        },
        toDisplayString(_ctx.label),
        3
        /* TEXT, CLASS */
      ),
      createElementVNode("li", null, [
        createElementVNode(
          "ul",
          {
            class: normalizeClass(_ctx.ns.b("group"))
          },
          [
            renderSlot(_ctx.$slots, "default")
          ],
          2
          /* CLASS */
        )
      ])
    ],
    2
    /* CLASS */
  )), [
    [vShow, _ctx.visible]
  ]);
}
var OptionGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { OptionGroup as default };
//# sourceMappingURL=option-group.vue.mjs.map
