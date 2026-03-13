import { treeNodeEmits, treeNodeProps, ROOT_TREE_INJECTION_KEY, NODE_CONTEXTMENU } from './virtual-tree.mjs';
import { defineComponent, inject, computed, createElementBlock, openBlock, withModifiers, normalizeClass, unref, createElementVNode, normalizeStyle, createBlock, createCommentVNode, createVNode, withCtx, resolveDynamicComponent } from 'vue';
import { ElIcon } from '../../icon/index.mjs';
import { CaretRight } from '@element-plus/icons-vue';
import { ElCheckbox } from '../../checkbox/index.mjs';
import ElNodeContent from './tree-node-content.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { isFunction, isString } from '@vue/shared';

const _hoisted_1 = ["aria-expanded", "aria-disabled", "aria-checked", "data-key"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElTreeNode"
  },
  __name: "tree-node",
  props: treeNodeProps,
  emits: treeNodeEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const tree = inject(ROOT_TREE_INJECTION_KEY);
    const ns = useNamespace("tree");
    const indent = computed(() => {
      var _a;
      return (_a = tree == null ? void 0 : tree.props.indent) != null ? _a : 16;
    });
    const icon = computed(() => {
      var _a;
      return (_a = tree == null ? void 0 : tree.props.icon) != null ? _a : CaretRight;
    });
    const getNodeClass = (node) => {
      var _a;
      const nodeClassFunc = (_a = tree == null ? void 0 : tree.props.props) == null ? void 0 : _a.class;
      if (!nodeClassFunc) return {};
      let className;
      if (isFunction(nodeClassFunc)) {
        const { data } = node;
        className = nodeClassFunc(data, node);
      } else {
        className = nodeClassFunc;
      }
      return isString(className) ? { [className]: true } : className;
    };
    const handleClick = (e) => {
      emit("click", props.node, e);
    };
    const handleDrop = (e) => {
      emit("drop", props.node, e);
    };
    const handleExpandIconClick = () => {
      emit("toggle", props.node);
    };
    const handleCheckChange = (value) => {
      emit("check", props.node, value);
    };
    const handleContextMenu = (event) => {
      var _a, _b, _c, _d;
      if ((_c = (_b = (_a = tree == null ? void 0 : tree.instance) == null ? void 0 : _a.vnode) == null ? void 0 : _b.props) == null ? void 0 : _c["onNodeContextmenu"]) {
        event.stopPropagation();
        event.preventDefault();
      }
      tree == null ? void 0 : tree.ctx.emit(NODE_CONTEXTMENU, event, (_d = props.node) == null ? void 0 : _d.data, props.node);
    };
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return openBlock(), createElementBlock("div", {
        ref: "node$",
        class: normalizeClass([
          unref(ns).b("node"),
          unref(ns).is("expanded", __props.expanded),
          unref(ns).is("current", __props.current),
          unref(ns).is("focusable", !__props.disabled),
          unref(ns).is("checked", !__props.disabled && __props.checked),
          getNodeClass(__props.node)
        ]),
        role: "treeitem",
        tabindex: "-1",
        "aria-expanded": __props.expanded,
        "aria-disabled": __props.disabled,
        "aria-checked": __props.checked,
        "data-key": (_a = __props.node) == null ? void 0 : _a.key,
        onClick: withModifiers(handleClick, ["stop"]),
        onContextmenu: handleContextMenu,
        onDragover: _cache[1] || (_cache[1] = withModifiers(() => {
        }, ["prevent"])),
        onDragenter: _cache[2] || (_cache[2] = withModifiers(() => {
        }, ["prevent"])),
        onDrop: withModifiers(handleDrop, ["stop"])
      }, [
        createElementVNode(
          "div",
          {
            class: normalizeClass(unref(ns).be("node", "content")),
            style: normalizeStyle({
              paddingLeft: `${(__props.node.level - 1) * indent.value}px`,
              height: __props.itemSize + "px"
            })
          },
          [
            icon.value ? (openBlock(), createBlock(unref(ElIcon), {
              key: 0,
              class: normalizeClass([
                unref(ns).is("leaf", !!((_b = __props.node) == null ? void 0 : _b.isLeaf)),
                unref(ns).is("hidden", __props.hiddenExpandIcon),
                {
                  expanded: !((_c = __props.node) == null ? void 0 : _c.isLeaf) && __props.expanded
                },
                unref(ns).be("node", "expand-icon")
              ]),
              onClick: withModifiers(handleExpandIconClick, ["stop"])
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(icon.value)))
              ]),
              _: 1
              /* STABLE */
            }, 8, ["class"])) : createCommentVNode("v-if", true),
            __props.showCheckbox ? (openBlock(), createBlock(unref(ElCheckbox), {
              key: 1,
              "model-value": __props.checked,
              indeterminate: __props.indeterminate,
              disabled: __props.disabled,
              onChange: handleCheckChange,
              onClick: _cache[0] || (_cache[0] = withModifiers(() => {
              }, ["stop"]))
            }, null, 8, ["model-value", "indeterminate", "disabled"])) : createCommentVNode("v-if", true),
            createVNode(unref(ElNodeContent), {
              node: { ...__props.node, expanded: __props.expanded }
            }, null, 8, ["node"])
          ],
          6
          /* CLASS, STYLE */
        )
      ], 42, _hoisted_1);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=tree-node.vue2.mjs.map
