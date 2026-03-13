'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var treeNode_vue_vue_type_script_lang = require('./tree-node.vue2.js');
var vue = require('vue');
var _pluginVue_exportHelper = require('../../../_virtual/_plugin-vue_export-helper.js');

const _hoisted_1 = ["aria-expanded", "aria-disabled", "aria-checked", "draggable", "data-key"];
const _hoisted_2 = ["aria-expanded"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_el_checkbox = vue.resolveComponent("el-checkbox");
  const _component_loading = vue.resolveComponent("loading");
  const _component_node_content = vue.resolveComponent("node-content");
  const _component_el_tree_node = vue.resolveComponent("el-tree-node");
  const _component_el_collapse_transition = vue.resolveComponent("el-collapse-transition");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
    ref: "node$",
    class: vue.normalizeClass([
      _ctx.ns.b("node"),
      _ctx.ns.is("expanded", _ctx.expanded),
      _ctx.ns.is("current", _ctx.node.isCurrent),
      _ctx.ns.is("hidden", !_ctx.node.visible),
      _ctx.ns.is("focusable", !_ctx.node.disabled),
      _ctx.ns.is("checked", !_ctx.node.disabled && _ctx.node.checked),
      _ctx.getNodeClass(_ctx.node)
    ]),
    role: "treeitem",
    tabindex: "-1",
    "aria-expanded": _ctx.expanded,
    "aria-disabled": _ctx.node.disabled,
    "aria-checked": _ctx.node.checked,
    draggable: _ctx.tree.props.draggable,
    "data-key": _ctx.getNodeKey(_ctx.node),
    onClick: _cache[2] || (_cache[2] = vue.withModifiers((...args) => _ctx.handleClick && _ctx.handleClick(...args), ["stop"])),
    onContextmenu: _cache[3] || (_cache[3] = (...args) => _ctx.handleContextMenu && _ctx.handleContextMenu(...args)),
    onDragstart: _cache[4] || (_cache[4] = vue.withModifiers((...args) => _ctx.handleDragStart && _ctx.handleDragStart(...args), ["stop"])),
    onDragover: _cache[5] || (_cache[5] = vue.withModifiers((...args) => _ctx.handleDragOver && _ctx.handleDragOver(...args), ["stop"])),
    onDragend: _cache[6] || (_cache[6] = vue.withModifiers((...args) => _ctx.handleDragEnd && _ctx.handleDragEnd(...args), ["stop"])),
    onDrop: _cache[7] || (_cache[7] = vue.withModifiers((...args) => _ctx.handleDrop && _ctx.handleDrop(...args), ["stop"]))
  }, [
    vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(_ctx.ns.be("node", "content")),
        style: vue.normalizeStyle({ paddingLeft: (_ctx.node.level - 1) * _ctx.tree.props.indent + "px" })
      },
      [
        _ctx.tree.props.icon || _ctx.CaretRight ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
          key: 0,
          class: vue.normalizeClass([
            _ctx.ns.be("node", "expand-icon"),
            _ctx.ns.is("leaf", _ctx.node.isLeaf),
            {
              expanded: !_ctx.node.isLeaf && _ctx.expanded
            }
          ]),
          onClick: vue.withModifiers(_ctx.handleExpandIconClick, ["stop"])
        }, {
          default: vue.withCtx(() => [
            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tree.props.icon || _ctx.CaretRight)))
          ]),
          _: 1
          /* STABLE */
        }, 8, ["class", "onClick"])) : vue.createCommentVNode("v-if", true),
        _ctx.showCheckbox ? (vue.openBlock(), vue.createBlock(_component_el_checkbox, {
          key: 1,
          "model-value": _ctx.node.checked,
          indeterminate: _ctx.node.indeterminate,
          disabled: !!_ctx.node.disabled,
          onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
          }, ["stop"])),
          onChange: _ctx.handleCheckChange
        }, null, 8, ["model-value", "indeterminate", "disabled", "onChange"])) : vue.createCommentVNode("v-if", true),
        _ctx.node.loading ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
          key: 2,
          class: vue.normalizeClass([_ctx.ns.be("node", "loading-icon"), _ctx.ns.is("loading")])
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_loading)
          ]),
          _: 1
          /* STABLE */
        }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
        vue.createVNode(_component_node_content, {
          node: _ctx.node,
          "render-content": _ctx.renderContent
        }, null, 8, ["node", "render-content"])
      ],
      6
      /* CLASS, STYLE */
    ),
    vue.createVNode(_component_el_collapse_transition, null, {
      default: vue.withCtx(() => [
        !_ctx.renderAfterExpand || _ctx.childNodeRendered ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: vue.normalizeClass(_ctx.ns.be("node", "children")),
          role: "group",
          "aria-expanded": _ctx.expanded,
          onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(_ctx.node.childNodes, (child) => {
              return vue.openBlock(), vue.createBlock(_component_el_tree_node, {
                key: _ctx.getNodeKey(child),
                "render-content": _ctx.renderContent,
                "render-after-expand": _ctx.renderAfterExpand,
                "show-checkbox": _ctx.showCheckbox,
                node: child,
                accordion: _ctx.accordion,
                props: _ctx.props,
                onNodeExpand: _ctx.handleChildNodeExpand
              }, null, 8, ["render-content", "render-after-expand", "show-checkbox", "node", "accordion", "props", "onNodeExpand"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ], 10, _hoisted_2)), [
          [vue.vShow, _ctx.expanded]
        ]) : vue.createCommentVNode("v-if", true)
      ]),
      _: 1
      /* STABLE */
    })
  ], 42, _hoisted_1)), [
    [vue.vShow, _ctx.node.visible]
  ]);
}
var ElTreeNode = /* @__PURE__ */ _pluginVue_exportHelper.default(treeNode_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

exports.default = ElTreeNode;
//# sourceMappingURL=tree-node.vue.js.map
