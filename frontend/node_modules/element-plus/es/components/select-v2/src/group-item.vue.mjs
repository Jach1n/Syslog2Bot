import _sfc_main from './group-item.vue2.mjs';
import { createElementBlock, openBlock, normalizeStyle, normalizeClass, toDisplayString } from 'vue';
import _export_sfc from '../../../_virtual/_plugin-vue_export-helper.mjs';

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(_ctx.ns.be("group", "title")),
      style: normalizeStyle({ ..._ctx.style, lineHeight: `${_ctx.height}px` })
    },
    toDisplayString(_ctx.item.label),
    7
    /* TEXT, CLASS, STYLE */
  );
}
var GroupItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { GroupItem as default };
//# sourceMappingURL=group-item.vue.mjs.map
