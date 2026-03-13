'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tree_vue_vue_type_script_lang = require('./tree.vue2.js');
var vue = require('vue');
var _pluginVue_exportHelper = require('../../../_virtual/_plugin-vue_export-helper.js');

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tree_node = vue.resolveComponent("el-tree-node");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      ref: "el$",
      class: vue.normalizeClass([
        _ctx.ns.b(),
        _ctx.ns.is("dragging", !!_ctx.dragState.draggingNode),
        _ctx.ns.is("drop-not-allow", !_ctx.dragState.allowDrop),
        _ctx.ns.is("drop-inner", _ctx.dragState.dropType === "inner"),
        { [_ctx.ns.m("highlight-current")]: _ctx.highlightCurrent }
      ]),
      role: "tree"
    },
    [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList(_ctx.root.childNodes, (child) => {
          return vue.openBlock(), vue.createBlock(_component_el_tree_node, {
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
      _ctx.isEmpty ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 0,
          class: vue.normalizeClass(_ctx.ns.e("empty-block"))
        },
        [
          vue.renderSlot(_ctx.$slots, "empty", {}, () => {
            var _a;
            return [
              vue.createElementVNode(
                "span",
                {
                  class: vue.normalizeClass(_ctx.ns.e("empty-text"))
                },
                vue.toDisplayString((_a = _ctx.emptyText) != null ? _a : _ctx.t("el.tree.emptyText")),
                3
                /* TEXT, CLASS */
              )
            ];
          })
        ],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      vue.withDirectives(vue.createElementVNode(
        "div",
        {
          ref: "dropIndicator$",
          class: vue.normalizeClass(_ctx.ns.e("drop-indicator"))
        },
        null,
        2
        /* CLASS */
      ), [
        [vue.vShow, _ctx.dragState.showDropIndicator]
      ])
    ],
    2
    /* CLASS */
  );
}
var Tree = /* @__PURE__ */ _pluginVue_exportHelper.default(tree_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

exports.default = Tree;
//# sourceMappingURL=tree.vue.js.map
