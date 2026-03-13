'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var virtualTree = require('./virtual-tree.js');
var vue = require('vue');
var useTree = require('./composables/useTree.js');
var treeNode_vue_vue_type_script_setup_true_lang = require('./tree-node.vue2.js');
var fixedSizeList = require('../../virtual-list/src/components/fixed-size-list.js');
var constants = require('../../form/src/constants.js');
var index = require('../../../hooks/use-locale/index.js');
var index$1 = require('../../../hooks/use-namespace/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElTreeV2"
  },
  __name: "tree",
  props: virtualTree.treeProps,
  emits: virtualTree.treeEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const slots = vue.useSlots();
    const treeNodeSize = vue.computed(() => props.itemSize);
    vue.provide(virtualTree.ROOT_TREE_INJECTION_KEY, {
      ctx: {
        emit,
        slots
      },
      props,
      instance: vue.getCurrentInstance()
    });
    vue.provide(constants.formItemContextKey, void 0);
    const { t } = index.useLocale();
    const ns = index$1.useNamespace("tree");
    const {
      flattenTree,
      isNotEmpty,
      listRef,
      toggleExpand,
      isIndeterminate,
      isChecked,
      isDisabled,
      isCurrent,
      isForceHiddenExpandIcon,
      handleNodeClick,
      handleNodeDrop,
      handleNodeCheck,
      // expose
      toggleCheckbox,
      getCurrentNode,
      getCurrentKey,
      setCurrentKey,
      getCheckedKeys,
      getCheckedNodes,
      getHalfCheckedKeys,
      getHalfCheckedNodes,
      setChecked,
      setCheckedKeys,
      filter,
      setData,
      getNode,
      expandNode,
      collapseNode,
      setExpandedKeys,
      scrollToNode,
      scrollTo
    } = useTree.useTree(props, emit);
    __expose({
      toggleCheckbox,
      getCurrentNode,
      getCurrentKey,
      setCurrentKey,
      getCheckedKeys,
      getCheckedNodes,
      getHalfCheckedKeys,
      getHalfCheckedNodes,
      setChecked,
      setCheckedKeys,
      filter,
      setData,
      getNode,
      expandNode,
      collapseNode,
      setExpandedKeys,
      scrollToNode,
      scrollTo
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass([vue.unref(ns).b(), { [vue.unref(ns).m("highlight-current")]: __props.highlightCurrent }]),
          role: "tree"
        },
        [
          vue.unref(isNotEmpty) ? (vue.openBlock(), vue.createBlock(vue.unref(fixedSizeList.default), {
            key: 0,
            ref_key: "listRef",
            ref: listRef,
            "class-name": vue.unref(ns).b("virtual-list"),
            data: vue.unref(flattenTree),
            total: vue.unref(flattenTree).length,
            height: __props.height,
            "item-size": treeNodeSize.value,
            "perf-mode": __props.perfMode,
            "scrollbar-always-on": __props.scrollbarAlwaysOn
          }, {
            default: vue.withCtx(({ data, index, style }) => [
              (vue.openBlock(), vue.createBlock(treeNode_vue_vue_type_script_setup_true_lang.default, {
                key: data[index].key,
                style: vue.normalizeStyle(style),
                node: data[index],
                expanded: data[index].expanded,
                "show-checkbox": __props.showCheckbox,
                checked: vue.unref(isChecked)(data[index]),
                indeterminate: vue.unref(isIndeterminate)(data[index]),
                "item-size": treeNodeSize.value,
                disabled: vue.unref(isDisabled)(data[index]),
                current: vue.unref(isCurrent)(data[index]),
                "hidden-expand-icon": vue.unref(isForceHiddenExpandIcon)(data[index]),
                onClick: vue.unref(handleNodeClick),
                onToggle: vue.unref(toggleExpand),
                onCheck: vue.unref(handleNodeCheck),
                onDrop: vue.unref(handleNodeDrop)
              }, null, 8, ["style", "node", "expanded", "show-checkbox", "checked", "indeterminate", "item-size", "disabled", "current", "hidden-expand-icon", "onClick", "onToggle", "onCheck", "onDrop"]))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["class-name", "data", "total", "height", "item-size", "perf-mode", "scrollbar-always-on"])) : (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 1,
              class: vue.normalizeClass(vue.unref(ns).e("empty-block"))
            },
            [
              vue.renderSlot(_ctx.$slots, "empty", {}, () => {
                var _a;
                return [
                  vue.createElementVNode(
                    "span",
                    {
                      class: vue.normalizeClass(vue.unref(ns).e("empty-text"))
                    },
                    vue.toDisplayString((_a = __props.emptyText) != null ? _a : vue.unref(t)("el.tree.emptyText")),
                    3
                    /* TEXT, CLASS */
                  )
                ];
              })
            ],
            2
            /* CLASS */
          ))
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=tree.vue2.js.map
