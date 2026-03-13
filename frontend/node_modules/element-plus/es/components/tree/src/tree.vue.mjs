import _sfc_main from './tree.vue2.mjs';
import { resolveComponent, createElementBlock, openBlock, normalizeClass, createCommentVNode, withDirectives, Fragment, renderList, createBlock, renderSlot, createElementVNode, toDisplayString, vShow } from 'vue';
import _export_sfc from '../../../_virtual/_plugin-vue_export-helper.mjs';

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tree_node = resolveComponent("el-tree-node");
  return openBlock(), createElementBlock(
    "div",
    {
      ref: "el$",
      class: normalizeClass([
        _ctx.ns.b(),
        _ctx.ns.is("dragging", !!_ctx.dragState.draggingNode),
        _ctx.ns.is("drop-not-allow", !_ctx.dragState.allowDrop),
        _ctx.ns.is("drop-inner", _ctx.dragState.dropType === "inner"),
        { [_ctx.ns.m("highlight-current")]: _ctx.highlightCurrent }
      ]),
      role: "tree"
    },
    [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.root.childNodes, (child) => {
          return openBlock(), createBlock(_component_el_tree_node, {
            key: _ctx.getNodeKey(child),
            node: child,
            props: _ctx.props,
            accordion: _ctx.accordion,
            "render-after-expand": _ctx.renderAfterExpand,
            "show-checkbox": _ctx.showCheckbox,
            "render-content": _ctx.renderContent,
            onNodeExpand: _ctx.handleNodeExpand
          }, null, 8, ["node", "props", "accordion", "render-after-expand", "show-checkbox", "render-content", "onNodeExpand"]);
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      _ctx.isEmpty ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          class: normalizeClass(_ctx.ns.e("empty-block"))
        },
        [
          renderSlot(_ctx.$slots, "empty", {}, () => {
            var _a;
            return [
              createElementVNode(
                "span",
                {
                  class: normalizeClass(_ctx.ns.e("empty-text"))
                },
                toDisplayString((_a = _ctx.emptyText) != null ? _a : _ctx.t("el.tree.emptyText")),
                3
                /* TEXT, CLASS */
              )
            ];
          })
        ],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true),
      withDirectives(createElementVNode(
        "div",
        {
          ref: "dropIndicator$",
          class: normalizeClass(_ctx.ns.e("drop-indicator"))
        },
        null,
        2
        /* CLASS */
      ), [
        [vShow, _ctx.dragState.showDropIndicator]
      ])
    ],
    2
    /* CLASS */
  );
}
var Tree = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { Tree as default };
//# sourceMappingURL=tree.vue.mjs.map
