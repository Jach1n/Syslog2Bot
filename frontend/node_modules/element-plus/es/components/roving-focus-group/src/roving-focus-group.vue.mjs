import _sfc_main from './roving-focus-group.vue2.mjs';
import { resolveComponent, createBlock, openBlock, withCtx, createVNode, normalizeProps, guardReactiveProps, renderSlot } from 'vue';
import _export_sfc from '../../../_virtual/_plugin-vue_export-helper.mjs';

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_roving_focus_group_impl = resolveComponent("el-roving-focus-group-impl");
  const _component_el_focus_group_collection = resolveComponent("el-focus-group-collection");
  return openBlock(), createBlock(_component_el_focus_group_collection, null, {
    default: withCtx(() => [
      createVNode(
        _component_el_roving_focus_group_impl,
        normalizeProps(guardReactiveProps(_ctx.$attrs)),
        {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
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
var ElRovingFocusGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { ElRovingFocusGroup as default };
//# sourceMappingURL=roving-focus-group.vue.mjs.map
